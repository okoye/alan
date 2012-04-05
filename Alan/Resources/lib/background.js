/**
 * @author Chuka Okoye
 * 
 * Responsible for periodic polling of sensors.
 */

var log = require('lib/logger');
var sal = require('lib/sal');
var testflight = require('ti.testflight');

var timeouts = 0;
var DURATION = 900000;
//var DURATION = 3000;
var CURRENT_MODE = sal.mode.BACKGROUND;

log.info('Konnichiwa, from background process.');

var _start = function(){
    log.info('Collecting data at '+(new Date).getTime());
    sal.collect(CURRENT_MODE);
    timeouts = setTimeout(_start, DURATION);
    testflight.checkpoint('background.js '+(new Date).getTime());
};

Ti.App.currentService.addEventListener('stop', function(){
    log.info('Cleaning up background process data');
    clearTimeout(timeouts);
});

_start();
