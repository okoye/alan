/**
 * @author Chuka Okoye
 * 
 * Sensor Abstraction Layer is responsible for periodic sampling of various sensors.
 * Sensors sampled currently include: accelerometer, wifi, gps, battery, memory, phonecall
 */

var log = require('lib/logger');
var utility = require('lib/utilities');
var processor = require('lib/processor');

var readings = {};
var ready = false;
var processing = {};

//Constants
var ACCELEROMETER_PERIOD = 60000;
var GPS_DISTANCE_FILTER = 20; //every 20 meters
var GPS_CALLBACK_SET = false;
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
    var result = {};
    if (!SANITY_CHECK_SUCCESSFUL)
        return {};
        
    if (mode == exports.mode.BACKGROUND){
        //result.battery = sampleBattery();
        //result.memory = sampleMemory();
        result.gps = sampleGPS();
        //result.wifi = sampleWifi();
    }
    else if(mode == exports.mode.FOREGROUND){
        //result.battery = sampleBattery();
        //result.memory = sampleMemory();
        result.gps = sampleGPS();
        //result.wifi = sampleWifi();
    }
    
    processing.process(result);
    return result;
};

//modes
exports.mode = {
    BACKGROUND: 1,
    FOREGROUND: 2
};

//knows how to read accelerometer results
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

//knows how to read battery results
var sampleBattery = function(){
    readings.batteryLevel = Ti.Platform.getBatteryLevel();
    log.info('sampleBattery finished; length: 1');
    return readings.batteryLevel;
};

//knows how to read memory results
var sampleMemory = function(){
    readings.memoryLevel = Ti.Platform.getAvailableMemory();
    log.info('sampleMemory finished; length: 1')
    return readings.memoryLevel;
};

//knows how to read gps results
var sampleGPS = function(){
    var buffer = [];
    if (!GPS_CALLBACK_SET){ //first time through function, will set constant later.
        readings.gps = [{
            longitude: 9999,
            latitude: 9999,
            heading: 9999,
            accuracy: 9999,
            speed: 0,
            timestamp: 0,
            altitude_accuracy: 9999
        }];
    }
    buffer = readings.gps.slice(); //copy into buffer.
    readings.gps = buffer.slice(-1);
    var callback = function(e){
        if (!e.success || e.error){
            log.info('GPS Callback could not retrieve information '+JSON.stringify(e.error));
            return;
        }
        var _gps = {};
        _gps.longitude = e.coords.longitude;
        _gps.latitude = e.coords.latitude;
        _gps.altitude = e.coords.altitude;
        _gps.heading = e.coords.heading;
        _gps.accuracy = e.coords.accuracy;
        _gps.speed = e.coords.speed;
        _gps.timestamp = (new Date).getTime();
        _gps.altitude_accuracy = e.coords.altitude_accuracy;
        readings.gps.push(_gps);
    };
    // if (!GPS_CALLBACK_SET){
        // Ti.Geolocation.addEventListener('location', callback);
        // GPS_CALLBACK_SET = true;
    // }
    log.info('sampleGPS finished; length: '+buffer.length);
    return buffer;
};

//knows how to read Wifi
var sampleWifi = function(){
    if (Ti.Network.networkType == Ti.Network.NETWORK_LAN || Ti.Network.networkType == Ti.Network.NETWORK_WIFI){
        readings.wifi = true;
    }
    else{
        readings.wifi = false;
    }
    return readings.wifi;    
};

//knows how to read Compass
var sampleCompass = function(){
    
};


