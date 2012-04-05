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
var DURATION = 9000;//900000; //Every 15 mins
var view = null;

function Controller(ui){
    log.info('initializing meController');
    view = ui;
    analytics.load();
}

var _start = function(){
    log.info('Fetching new analytics data');
    if(LAST_FETCH != analytics.timestamp()){
        view.updateSteps(analytics.steps());
        view.updateDistance(analytics.distance());
        view.updateCalories(analytics.calories());
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
