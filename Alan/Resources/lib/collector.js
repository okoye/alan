/**
 * @author Chuka Okoye
 * 
 * Collector module is reponsible for periodic sampling of various sensors.
 * Sensors sampled include: accelerometer, wifi, gps, proximity
 * Each collector for fires at different rates but marches to the tune of 
 * the accelerometer sampling collector.
 */

var log = require('lib/logger');
var utility = require('lib/utilities');

//Global state variables
var gps = {};
var wifi = false;
var proximity = "";
var ready = false;
var movement_callback = {};

function Collector(properties){
	this.context_period = (properties.context_period) ? properties.context_period:360000;
	this.movement_period = (properties.movement_period) ? properties.movement_period:3000;
	this.proximity_period = (properties.proximity_period) ? properties.proximity_period:60000;
	this.last_gps_update = 0;
	this.last_wifi_update = 0;
	this.last_movement_update = 0;
	
	
	//setup some iphone specific settings.
	Ti.Geolocation.preferredProvider = "gps";
	
	if (utility.isOS3_2_Plus())
		Ti.Geolocation.purpose = 'Daily Activity Analysis';
	
	if (Ti.Geolocation.locationServicesEnabled === false){
		Ti.UI.createAlertDialog({title:'Activity Profiler', message: 'Your device has geolocation turned off. You can enable it in your settings.'}).show();
	} else{
		if (Ti.Platform.name != 'android'){
			var authorization = Ti.Geolocation.locationServicesAuthorization;
			log.debug('Geolocation authorization '+authorization);
			if ((authorization == Ti.Geolocation.AUTHORIZATION_DENIED) || (authorization == Ti.Geolocation.AUTHORIZATION_RESTRICTED)){
				Ti.UI.createAlertDialog({title: 'Activity Profiler', message: 'Your device has disallowed Alan from running geolocation services'}).show();
			} else {
				Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
				Ti.Geolocation.distanceFilter = 30; //in meters.
				ready = true;
			}
		}
	}
	this.start();
}

Collector.prototype.start = function(){
	if (ready){
		//start periodic calling functions.
		setInterval(this.sampleWifi, this.context_period);
		setInterval(this.sampleProximity, this.proximity_period);
		setInterval(this.sampleGPS, this.context_period);
	}
	return ready;
};

Collector.prototype.gpsCallback = function(e){
	//Called when distanceFilter meters is moved.
	if (!e.success || e.error){
		log.info('GPSCallback could not retrieve information '+JSON.stringify(e.error));
		return;
	}
	this._gpsHandler(e);
}

Collector.prototype.sampleWifi = function(){
	//Check wifi access point.
	if (Ti.Network.networkType == Ti.Network.NETWORK_LAN || Ti.Network.networkType == Ti.Network.NETWORK_WIFI){
		wifi = true;
	}
	this.last_wifi_update = (new Date).getTime();
};

Collector.prototype.sampleGPS = function(){
	//if GPS update was triggered before context period was over,
	//then update parameters.
	var timestamp = (new Date).getTime();
	if ((timestamp - this.last_gps_update) < (this.context_period - 1000)){
		//we took a gps reading very recently, dont take another.
	} else{
		//read gps position again.
		Ti.Geolocation.getCurrentPosition( function(e){
			if (!e.success || e.error){
				log.info('Could not retreive location '+JSON.stringify(e.error));
				return;
			}
			this._gpsHandler(e);
		});
	}
};

Collector.prototype.sampleProximity = function(){
	//Check proximity sensor reading.
};

Collector.prototype.getReadings = function(callback){
	//get accelerometer data.
	var accelerometer = [];
	var reference = Ti.Accelerometer.addEventListener('update', function(e){
		log.debug('Accelerometer fired '+JSON.stringify(e));
		accelerometer.push(e);
	});
	setTimeout(function(){
		Ti.Accelerometer.removeEventListener('update', reference);
		callback({
			movement: accelerometer,
			gps: gps,
			wifi: wifi,
			proximity: proximity
		});
	}, 500);
	
};

Collector.prototype._gpsHandler = function(e){
	
	log.debug('_gpsHandler called.');
	gps.longitude = e.coords.longitude;
	gps.latitude = e.coords.latitude;
	gps.altitude = e.coords.altitude;
	gps.heading = e.coords.heading;
	gps.accuracy = e.coords.accuracy;
	gps.speed = e.coords.speed;
	gps.timestamp = e.coords.timestamp;
	gps.altitude_accuracy = e.coords.altitude_accuracy;
	
	log.info('Sampled GPS '+JSON.stringify(gps));
	this.last_gps_update = (new Date).getTime();
}
