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
    setCurrentInfo: function(response){
        log.debug('me.getCurrentInfo');
        if (response.status === 'success'){
          log.debug('successful call, now update view');
        }
        instrumentation.customInfo('meController.setCurrentInfo', (new Date).getTime());
    },
    setSummaryInfo: function(response){
        log.debug('me.getSummaryInfo');
        if (response.status === 'success'){
          log.debug('successful call, now update view');
        }
        instrumentation.customInfo('meController.setSummaryInfo', (new Date).getTime());
    },
};

var _start = function(timeout){
    //Remove pre-existing timeouts
    (timeout) ? clearTimeout(timeouts[timeout]): false;
    
    log.info('fetching new meView data @ '+(new Date).getTime());
    
    //Fetch and update view
    if (timeout == 15)
      api.Analytics(account, me.setCurrentInfo);
    
    //Reset timeout to future date
    timeouts[timeout] = setTimeout(function(){_start(timeout)}, DURATION);
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
