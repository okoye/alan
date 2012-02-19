/**
 * @author Chuka Okoye
 * 
 * Classifier is responsible for classifying sensor streams into
 * their appropriate activity types.
 */

var log = require('lib/logger');
var filter = require('lib/filter');
var activity = require('model/activity');

function Classifier(thresholds){
    var defaultThresholds = {
        LAZY: 1,
        WALKING: 3.18,
        RUNNING: 10,
        TRANSPORT: 1000
    };
    this.thresholds = (thresholds) ? thresholds:defaultThresholds;
    filter.purge(); //cleanse any existing values in the filter.    
    log.info('Initialized new improved classifier');
}

Classifier.prototype.classify = function(data){
    return this._classify(data);
};

Classifier.prototype._classify = function(data){
    //Classify current item incorporating gps, filter.
    var state = null;
    if (data.speed < this.thresholds.LAZY){
        state = 'LAZY';
    } else if(data.speed < this.thresholds.WALKING){
        state = 'WALKING';
    } else if(data.speed < this.thresholds.RUNNING){
        state = 'RUNNING';
    } else{
        state = 'TRANSPORT';
    }
    log.info('GPS Classification result: '+state);
    state = this._filter(state);
    log.info('Markov Model Classification result: '+JSON.stringify(state));
    return this._toActivityModel(state.element, data);
};

Classifier.prototype._toActivityModel = function(state, data){
    //convert current state to activity model object
    var a = new activity.Activity(state, data);
    return a;
};

Classifier.prototype._filter = function(state){
    //What is the next probable value returned by the filter?
    return filter.probableActivity(state);
};

exports.Classifier = Classifier;
