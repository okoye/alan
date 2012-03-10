/**
 * @author Chuka Okoye
 * 
 * The me controller is responsible for pushing data to view
 * when data changes.
 */

var log = require('lib/logger');
var analytics = require('model/analytics');

var timeouts = 0;
var LAST_FETCH = 0;
var DURATION = 900000; //Every 15 mins

function Controller(view){
    log.info('initializing meController');
    this.view = view;
    analytics.load();
}

var _start = function(){
    log.info('Fetching new analytics data');
    if(LAST_FETCH != analytics.timestamp()){
        this.view.updateSteps(analytics.steps());
        this.view.updateDistance(analytics.distance());
        this.view.updateCalories(analytics.calories());
    }
    analytics.sync();
    timeouts = setTimeout(_start, DURATION);
};

Controller.prototype.start = function(){
    clearTimeout(timeouts);
    LAST_FETCH = analytics.timestamp();
    log.debug('LAST_FETCH '+LAST_FETCH);
    
    timeouts = setTimeout(_start, DURATION);
    log.info('Started fetch cycles');
};

exports.Controller = Controller;
