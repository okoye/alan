/**
 * @author Chuka Okoye
 * 
 * Classifier is responsible for classifying sensor streams into
 * their appropriate activity types.
 */

var log = require('lib/logger');
var filter = require('lib/filter');

function Classifer(thresholds){
    var defaultThresholds = {
        STATIONARY: 1,
        WALKING: 3.18,
        RUNNING: 10,
        TRANSPORT: 1000
    };
    this.thresholds = (thresholds) ? thresholds:defaultThresholds;
    filter.purge(); //cleanse any existing values in the filter.    
    log.info('Initialized new improved classifier');
}

Classifier.prototype.classify = function(data){
    
};

Classifier.prototype._classify = function(data){
    //Classify current item incorporating gps, filter.
};

Classifier.prototype._filter = function(){
    //What is the next probable value returned by the filter?
};

Classifier.prototype.posture = function(){
    //Compute posture information when available.
    return null;
};
