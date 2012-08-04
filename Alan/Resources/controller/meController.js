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
var profile = require('model/profile');

//Final settings
var LAST_FETCH = 0;
var DURATION = 900000; //9000Every 15 mins


//Global variables
var view = null;
var timeouts ={
    fifteen: 0,
};
var me = {
    setCurrentInfo: function(response){
        log.debug('me.getCurrentInfo');
        if (response.status === 'success'){
          log.debug('successful call, now update view');
          view.updateSteps(response.data.steps);
          view.updateDistance(response.data.distance);
          view.updateCalories(response.data.calories);
        }
        instrumentation.customInfo('meController.setCurrentInfo', (new Date).getTime());
    },
    setSummaryInfo: function(response){
        //FIXME: detail 24hr summary.
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
    if (timeout == 'fifteen')
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
    timeouts.fifteen = setTimeout(function(){_start('fifteen');}, DURATION);
    log.info('Started fetch cycles');
};

exports.Controller = Controller;
