/**
 * @author Chuka Okoye
 * 
 * Responsible for managing foreground and background collection logic.
 */

var log = require('lib/logger');
var sal = require('lib/sal');

var timeouts = 0;
var SANITY_CHECK = false;
var DURATION = 900000;
//var DURATION = 3000;
var CURRENT_MODE = sal.mode.BACKGROUND;

function Manager(properties){
    log.info('Initializing manager routine');
    SANITY_CHECK = sal.initialize();
}

var _start = function(){
    log.info('Collecting data at '+(new Date).getTime());
    sal.collect(CURRENT_MODE);
    timeouts = setTimeout(_start, DURATION);
};

Manager.prototype.start = function(){
    //Register all necessary handlers for foreground and background operation
    
    var service = Ti.App.iOS.registerBackgroundService({url: 'lib/background.js'});
    
    Ti.App.addEventListener('resume', function(e){
        //do something in foreground
        CURRENT_MODE = sal.mode.FOREGROUND;
        _start();
        log.info('Initialized foreground services');
    });
    Ti.App.addEventListener('pause', function(e){
       //do something in background 
       clearTimeout(timeouts);
       CURRENT_MODE = sal.mode.BACKGROUND;
       log.info('Initialized background services');
    });
    Ti.App.addEventListener('close', function(e){
       //shutdown app components. 
       clearTimeout(timeouts);
       log.info('Shutting down all services');
    });
    Ti.App.addEventListener('alan:resume', function(e){
       //repeat of foreground code 
       clearTimeout(timeouts);
       CURRENT_MODE = sal.mode.FOREGROUND;
       _start();
       log.info('Initialized fake foreground services');
    });   
    Ti.App.fireEvent('alan:resume');
    return SANITY_CHECK;
};

exports.Manager = Manager;
