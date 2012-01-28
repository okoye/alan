/**
 * @author Chuka Okoye
 * 
 * Listens for events from processor, fetches appropriate data sets and pushes to api
 * only when connected to Wifi otherwise just logs last timestamp and waits for Wifi.
 */

var api = require('lib/api');
var log = require('lib/logger');
var db = require('lib/db');

var train_id = Ti.Platform.getId();

var currentRecord = function(current){
	//fetch and return current record. if not exist, create and return 0.
	if (current){
		Ti.App.Properties.setInt('current_record', current);
	}
	else{
		var temp = Ti.App.Properties.getString('current_record', 0);
		return 0;
	}
};

exports.start = function(){
	Ti.App.addEventListener('alan:sensorReadingsUpdate', function(evt){
		log.debug('Sensor Readings Update Fired Successfully');
		if (Ti.Network.networkType == Ti.Network.NETWORK_WIFI || Ti.Network.networkType == Ti.Network.NETWORK_LAN){
			log.info('Connected to Wifi, sending aggregated data');
			var batch = db.fetchValuesGreater('READINGS', currentRecord());
			var processed_batch = [];
			var json;
			for(var i=0; i<batch.length; i++){
			    json = JSON.parse(batch[i].json).readings;
			    processed_batch.push({
			       accelerometer: json.accelerometer,
			       wifi: json.wifi,
			       gps: json.gps,
			       battery: json.batteryLevel,
			       memory: json.memoryLevel,
			    });
			}
			var current_id = batch.pop().id;
			log.debug(JSON.stringify(processed_batch));
			//TODO: send in batches of 200
			api.train({'measurements': processed_batch, 'train_id': train_id}, function(msg){
			    if (msg.status != 'error'){
			        currentRecord(current_id);
			    }
			});
		}
		else{
			log.info('Not connected to Wifi or LAN, skipping.');
		}
	});
};