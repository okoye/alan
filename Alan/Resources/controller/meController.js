/**
 * @author Chuka Okoye
 * 
 * The me controller is responsible for pushing data to view
 * when data changes.
 */

var log = require('lib/logger');
var instrumentation = require('lib/instrument');

//Final settings
var LAST_FETCH = 0;
var DURATION = 9000;//900000; //Every 15 mins

//Global variables
var view = null;
var timeouts = 0;

var me = {
    getCurrentInfo: function(){
        log.debug('me.getCurrentInfo');
    },
    getSummaryInfo: function(){
        log.debug('me.getSummaryInfo');
    },
};

var _start = function(){
    clearTimeout(timeouts);
    log.info('fetching new meView data @ '+(new Date).toUTCString());
    var info = me.getCurrentInfo();
    //TODO update various view components
    timeouts = setTimeout(_start, DURATION);
    instrumentation.checkpoint('meController');
};

function Controller(ui){
    log.info('initializing meController');
    view = ui;
}


Controller.prototype.start = function(){
    timeouts = setTimeout(_start, DURATION);
    log.info('Started fetch cycles');
};

exports.Controller = Controller;
