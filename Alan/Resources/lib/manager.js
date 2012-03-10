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
var CURRENT_MODE = sal.mode.BACKGROUND;

function Manager(properties){
    log.info('Initializing manager routine');
    if (properties && properties.training){
        var trainer = require('lib/trainer');
        trainer.start();
    }
    SANITY_CHECK = sal.initialize();
}

var _start = function(){
    log.info('Collecting data at '+(new Date).getTime());
    sal.collect(CURRENT_MODE);
    timeouts = setTimeout(_start, DURATION);
};

//foreground, background callbacks.
Manager.prototype.start = function(){
    Ti.App.addEventListener('resume', function(e){
        //do something in foreground
        clearTimeout(timeouts);
        CURRENT_MODE = sal.mode.FOREGROUND;
        timeouts = setTimeout(_start, DURATION);
        log.info('Initialized foreground services');
    });
    Ti.App.addEventListener('pause', function(e){
       //do something in background 
       clearTimeout(timeouts);
       CURRENT_MODE = sal.mode.BACKGROUND;
       timeouts = setTimeout(_start, DURATION);
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
       timeouts = setTimeout(_start, DURATION);
       log.info('Initialized fake foreground services');
    });   
    Ti.App.fireEvent('alan:resume');
    return SANITY_CHECK;
};

exports.Manager = Manager;
