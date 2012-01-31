/**
 * @author Chuka Okoye
 * 
 * Sensor Abstraction Layer is responsible for periodic sampling of various sensors.
 * Sensors sampled currently include: accelerometer, wifi, gps, battery, memory, phonecall
 */

var log = require('lib/logger');
var utility = require('lib/utility');

var readings = {};
var ready = false;

//Constants
var ACCELEROMETER_PERIOD = 60000;
var GPS_PERIOD = 3600000;
var GPS_DISTANCE_FILTER = 20; //every 20 meters
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
                Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
                Ti.Geolocation.distanceFilter = GPS_DISTANCE_FILTER;
                SANITY_CHECK_SUCCESSFUL = true;
            }
        }
        else{
            //TODO: android specific code.
        }
    }
    
    log.info('SAL (re)initialization complete');
};

//start collection in the necessary mode.
exports.start = function(mode){
    
};

//knows how to read accelerometer results
var sampleAccelerometer = function(){
    if (! readings.accelerometer)
        readings.accelerometer = [];
    var ref = Ti.Accelerometer.addEventListener('update', function(e){
       if (readings.accelerometer.length <= ACCELEROMETER_READ_SIZE){
        readings.accelerometer.push({
           x: e.x,
           y: e.y,
           z: e.z 
        });
      }
      else{
          Ti.App.fireEvent('alan:finishedAccelerometerSampling')
      }
     
    });
};

//knows how to read battery results
var sampleBattery = function(){
    
};

//knows how to read memory results
var sampleMemory = function(){
    
};

//knows how to read gps results
var sampleGPS = function(){
    
};

//knows how to read Wifi
var sampleWifi = function(){
    
};


