/**
 * @author Chuka Okoye
 * 
 * Responsible for managing foreground and background collection logic.
 */

var log = require('lib/logger');
var sal = require('lib/sal');

var timeouts = 0;
var DURATION = 30000;

function Manager(properties){
    log.info('Initializing manager routine');
    if (properties.training){
        var trainer = require('lib/trainer');
        trainer.start();
    }
    sal.initialize();
}

var _start = function(mode){
    log.info('Collecting data at '+(Date).getTime());
    sal.collect(mode);
    timeouts = setTimeout(_start, DURATION, mode);
};

//foreground, background callbacks.
Manager.prototype.start = function(){
    Ti.App.addEventListener('resume', function(e){
        //do something in foreground
        clearTimeout(timeouts);
        timeouts = setTimeout(_start, DURATION, sal.mode.FOREGROUND);
        log.info('Initialized foreground services');
    });
    Ti.App.addEventListener('pause', function(e){
       //do something in background 
       clearTimeout(timeouts);
       timeouts = setTimeout(_start, DURATION, sal.mode.BACKGROUND);
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
       timeouts = setTimeout(_start, DURATION, sal.mode.FOREGROUND);
       log.info('Initialized fake foreground services');
    });   
    Ti.App.fireEvent('alan:resume');
};

exports.Manager = Manager;
