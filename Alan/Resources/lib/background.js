/**
 * @author Chuka Okoye
 * 
 * Responsible for periodic polling of sensors.
 */

var log = require('lib/logger');
var sal = require('lib/sal');
var testflight = require('ti.testflight');

var timeouts = 0;
//var DURATION = 900000;
var DURATION = 300000; //5 mins intervals
var CURRENT_MODE = sal.mode.BACKGROUND;

log.info('Konnichiwa, from background process.');

var _start = function(){
    log.info('collecting data at '+(new Date).toISOString());
    sal.collect(CURRENT_MODE);
    timeouts = setTimeout(_start, DURATION);
    log.info('collected data routine finished executing.');
};

Ti.App.currentService.addEventListener('stop', function(){
    log.info('cleaning up background process data');
    clearTimeout(timeouts);
});

_start();
