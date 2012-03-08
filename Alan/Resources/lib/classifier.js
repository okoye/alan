/**
 * @author Chuka Okoye
 * 
 * Classifier is responsible for classifying sensor streams into
 * their appropriate activity types.
 */

var log = require('lib/logger');
var filter = require('lib/filter');

function Classifier(thresholds, filtering){
    var defaultThresholds = {
        Inactive: 1,
        Walking: 3.18,
        Running: 10,
        Transport: 1000
    };
    this.thresholds = (thresholds) ? thresholds:defaultThresholds;
    this.filtering = (filtering) ? true:false;
    filter.purge(); //cleanse any existing values in the filter.    
    log.info('Initialized new improved classifier');
}

Classifier.prototype.classify = function(data){
    return this._classify(data);
};

Classifier.prototype._classify = function(data){
    //Classify current item incorporating gps, filter.
    var state = null;
    if (data.speed < this.thresholds.Inactive){
        state = 'Inactive';
    } else if(data.speed < this.thresholds.Walking){
        state = 'Walking';
    } else if(data.speed < this.thresholds.Running){
        state = 'Running';
    } else{
        state = 'Transport';
    }
    log.info('GPS Classification result: '+state);
    state = this._filter(state);
    log.info('Markov Model Classification result: '+JSON.stringify(state));
    return this._toActivityModel(state, data);
};

Classifier.prototype._toActivityModel = function(state, data){
    //convert current state to activity model object
    // var a = new activity.Activity(state, data);
    return a;
};

Classifier.prototype._filter = function(state){
    //What is the next probable value returned by the filter?
    if (this.filtering){
        var result = filter.probableActivity(state);
        try{
            return result.element.split('<=>')[1]; //off by one error probably
        }
        catch (err){
            log.debug('ERROR occured during filtering '+err);
            return state;
        }
    }
    else
        return state;
};

exports.Classifier = Classifier;
