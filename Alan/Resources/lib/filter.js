/**
 * @author Chuka Okoye
 * Filter implementation, using markov models
 */

var cache = require('lib/cache');
var log = require('lib/logger');

var key = 'activities';
var divider = '<=>';

exports.purge = function(){
    //clear out any state vars/cache
    cache.remove(key);
};

exports.create = function(){
    cache.create(key);
};

exports.probableActivity = function(activity){
    //use markov models.
    log.info('extracting fetchlastN elements');
    var tenN = cache.fetchLastN(key, 10);
    var fiveN = cache.fetchLastN(key, 5);
    
    log.info('now computing unique sets '+tenN.length);
    //now, compute the unique set for ten and five N
    var uniqueT = set(tenN);
    var uniqueF = set(fiveN);
    
    log.info('taking cross product of vector '+JSON.stringify(uniqueT));
    //now take the cross product of the returned vector.
    var matrixT = cross(uniqueT);
    var matrixF = cross(uniqueF);
    
    log.info('computing transition probabilities '+JSON.stringify(matrixT));
    //finally compute transition probabilities
    var temp = uniqueT.slice();
    while(temp.length > 0){
        var current = temp.pop();
        for(property in matrixT){
            matrixT[property] = probabilities(property, tenN);
        }
    }
    temp = uniqueF.slice();
    while(temp.length > 0){
        var current = temp.pop();
        for(property in matrixF){
            matrixF[property] = probabilities(property, fiveN);
        }
    }
    
    log.info('computing scores of potential activity transitions '+JSON.stringify(matrixT));
    //using the formula:
    //c1.X1 + c2.X2
    //score the transition probabilities, where c is a constant and X are probabilities.
    var scores = {};
    for (property in matrixT){
        scores[property] =(0.5 *matrixT[property]) + (2 * ((matrixF[property]) ? matrixF[property]:0)); //TODO: use log for matrixT ? since it is slower.
    }
    for (property in matrixF){
        if (!scores[property]){
            scores[property] = 2 * matrixF[property];
        }
    }
    
    log.info('computing max score of all scores '+JSON.stringify(scores));
    var maxProbability = max(scores);
    
    cache.add(key, activity); //one of the last things to do.
    temp = {
        element: fiveN[fiveN.length-1]+divider+activity,
        score: scores[fiveN[fiveN.length-1]+divider+activity]
    };
    log.info('now testing final sufficiently Greater condition '+JSON.stringify(temp));
    return sufficientlyGreater(maxProbability, temp);
};

var probabilities = function(element, values){
    //count and return transition probabilities.
    var last = values[0];
    var count = 0;
    for(var i=0; i<values.length; i++){
        if (last+divider+values[i] === element)
            count++;
        last = values[i];
    }
    var prob = count/values.length;
    log.info('Computed probability for element '+element+' is: '+prob);
    return prob;
};

var max = function(scores){
    //return the max probability from a set of properties
    var currentMax = 0;
    var currentElement = {};
    for(property in scores){
        if (scores[property] > currentMax){
            currentMax = scores[property];
            currentElement.element = property;
        }
    }
    currentElement.score = currentMax;
    return currentElement;
};

var sufficientlyGreater = function(value1, value2){
    //score1 must be at least 2x score2 for it to be returned.
    log.info('Value 1 '+JSON.stringify(value1));
    if (value2 && value2.element && value2.score){
        if (value1.score > (value2.score * 4))
            return value1;
        else
            return value2;
    }
    else{
        return value1;
    }
};

var set = function(value){
    //returns a set of unique elements from supplied value array
    var unique = {};
    for (var i=0; i<value.length; i++){
        (unique[value[i]]) ? true:unique[value[i]] = true;
    }
    var uniqueArray = [];
    for(property in unique){
        uniqueArray.push(property);
    }
    return uniqueArray;
};

var cross = function(vector){
    //computes the cross product of supplied vector
    var vector2 = vector.slice(); //clone or copy the vector.
    var result = {};
    while(vector2.length > 0){
        var current = vector2.pop();
        for (var i=0; i<vector.length; i++){
            result[vector[i]+divider+current] = 0.0;
        }
    }
    return result;
}
