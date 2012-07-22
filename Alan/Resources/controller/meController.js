/**
 * @author Chuka Okoye
 * 
 * The me controller is responsible for pushing data to view
 * when data changes.
 */

var log = require('lib/logger');
var instrumentation = require('lib/instrument');
var api = require('lib/api');
var account = require('model/account');

//Final settings
var LAST_FETCH = 0;
var DURATION = 900000; //9000;//900000; //Every 15 mins

//Global variables
var view = null;
var timeouts ={
    15: 0,
    2: 0,
};
var me = {
    setCurrentInfo: function(data){
        log.debug('me.getCurrentInfo');
        instrumentation.customInfo('meController.getCurrentInfo', (new Date).getTime());
    },
    setSummaryInfo: function(data){
        log.debug('me.getSummaryInfo');
        instrumentation.customInfo('meController.getSummaryInfo', (new Date).getTime());
    },
};

var _start = function(timeout){
    //Remove pre-existing timeouts
    (timeout) ? clearTimeout(timeouts[timeout]): false;
    
    log.info('fetching new meView data @ '+(new Date).getTime());
    
    //Fetch and update view
    api.Analytics(account, me.setCurrentInfo);
    
    //Reset timeout to future date
    timeouts.15 = setTimeout(_start, DURATION);
    instrumentation.checkpoint('meController');
};

function Controller(ui){
    log.info('initializing meController');
    view = ui;
}


Controller.prototype.start = function(){
    timeouts.15 = setTimeout(function(){_start(15);}, DURATION);
    log.info('Started fetch cycles');
};

exports.Controller = Controller;
