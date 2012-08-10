/**
 * @author Chuka Okoye
 * 
 * Sensor Abstraction Layer is responsible for periodic sampling of various sensors.
 * Sensors sampled currently include: accelerometer, wifi, gps, battery, memory, phonecall
 */

var log = require('lib/logger');
var utility = require('lib/utilities');
var processor = require('lib/processor');

var readings = {}; //deprecated
var ready = false;
var processing = {};

//Constants
var ACCELEROMETER_PERIOD = 60000;
var GPS_DISTANCE_FILTER = 20; //every 20 meters
var GPS_CALLBACK_SET = false;
var GPS_FILTER_SET = false;
var SANITY_CHECK_SUCCESSFUL = false;
var ACCELEROMETER_READ_SIZE = 5000;

//initialize the various components and collect authorization
exports.initialize = function(){
    Ti.Geolocation.preferredProvider = "gps";
    
    if(utility.isOS3_2_Plus())
        Ti.Geolocation.purpose = "For Alan's activity and behavior analysis";
    
    if(Ti.Geolocation.locationServicesEnabled === false){
        Ti.UI.createAlertDialog({'title': 'Alan Warning', message: 'Your device has geolocation turned off. You can enable it in your settings.'}).show();
    }
    else{
        if (Ti.Platform.name != 'android'){
            var authorization = Ti.Geolocation.locationServicesAuthorization;
            log.debug('Geolocation authorization '+authorization);
            if ((authorization == Ti.Geolocation.AUTHORIZATION_DENIED) || (authorization == Ti.Geolocation.AUTHORIZATION_RESTRICTED)){
                Ti.UI.createAlertDialog({'title': 'Alan Warning', message: 'You have disallowed Alan from running location services'}).show();
            }
            else{
                Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
                //Ti.Geolocation.distanceFilter = GPS_DISTANCE_FILTER;
                SANITY_CHECK_SUCCESSFUL = true;
            }
        }
        else{
            //TODO: android specific code.
        }
    }
    
    processing = new processor.Processor();
    
    log.info('SAL (re)initialization complete');
    return SANITY_CHECK_SUCCESSFUL;
};

//start collection in the necessary mode.
exports.collect = function(mode){   
	if (!SANITY_CHECK_SUCCESSFUL)
		return {};
	sampleGPS(mode);
};

//modes
exports.mode = {
    BACKGROUND: 1,
    FOREGROUND: 2
};

/*****************************************************************
 * Various samplers for accelerometer, battery, memory, gps, wifi
 ****************************************************************/
var sampleAccelerometer = function(){
    var buffer = [];
    buffer = readings.accelerometer;
    readings.accelerometer = [];
    var callback = function(e){
        if (readings.accelerometer.length <= ACCELEROMETER_READ_SIZE){
        readings.accelerometer.push({
           x: e.x,
           y: e.y,
           z: e.z, 
           timestamp: (new Date).getTime(),
        });
      }
      else{
          Ti.App.fireEvent('alan:finishedAccelerometerSampling', {time: (new Date).getTime()});
      }
    };
    var ref = Ti.Accelerometer.addEventListener('update', callback);
    
    Ti.App.addEventListener('alan:finishedAccelerometerSampling', function(e){
        Ti.Accelerometer.removeEventListener('update', callback);
    });
    log.info('sampleAccelerometer finished; length: '+buffer.length);
    return buffer;
};

var sampleBattery = function(){
    readings.batteryLevel = Ti.Platform.getBatteryLevel();
    log.info('sampleBattery finished; length: 1');
    return readings.batteryLevel;
};

var sampleMemory = function(){
    readings.memoryLevel = Ti.Platform.getAvailableMemory();
    log.info('sampleMemory finished; length: 1')
    return readings.memoryLevel;
};

var sampleGPS = function(mode){
	if (mode == exports.mode.BACKGROUND && !GPS_FILTER_SET){
		Ti.Geolocation.addEventListener('location', gpsCallback);
		Ti.Geolocation.distanceFilter = 10;
		GPS_FILTER_SET = true;
	}
	else{
		Ti.Geolocation.getCurrentPosition(gpsCallback);
    }
};

var sampleWifi = function(){
    if (Ti.Network.networkType == Ti.Network.NETWORK_LAN || Ti.Network.networkType == Ti.Network.NETWORK_WIFI){
        readings.wifi = true;
    }
    else{
        readings.wifi = false;
    }
    return readings.wifi;    
};


/***************************************
 * Various processing callback handlers
 * @param {Object} e
 ***************************************/
var gpsCallback = function(e) {
	if (!e.success || e.error) {
		log.info('GPS Callback could not retrieve information ' + JSON.stringify(e.error));
		return;
	}
	var _gps = {};
	_gps.coordinates = new Array(e.coords.latitude, e.coords.longitude);
	_gps.altitude = e.coords.altitude;
	_gps.heading = e.coords.heading;
	_gps.accuracy = e.coords.accuracy;
	_gps.speed = e.coords.speed;
	_gps.timestamp = (new Date).toISOString();
	_gps.altitude_accuracy = e.coords.altitude_accuracy;
	processing.process(_gps);
	log.debug('gpsCallback completed successfully '+JSON.stringify(_gps));
}; 

