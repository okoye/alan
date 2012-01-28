/**
 * @author Chuka Okoye
 * 
 * Listens for events from processor, fetches appropriate data sets and pushes to api
 * only when connected to Wifi otherwise just logs last timestamp and waits for Wifi.
 */

var api = require('lib/api');
var log = require('lib/logger');
var db = require('lib/db');

var train_id = '';

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

var initialize = function(){
    if (Ti.App.Properties.getString('train_id', 'null') == 'null'){
        //TODO Fetch from API and store in App.Properties and train_id
        train_id = 'chuka';
    }
    else{
        train_id = Ti.App.Properties.getString('train_id');
    }
	Ti.App.addEventListener('alan:sensorReadingsUpdate', function(evt){
		log.debug('Sensor Readings Update Fired Successfully');
		if (Ti.Network.networkType == Ti.Network.NETWORK_WIFI || Ti.Network.networkType == Ti.Network.NETWORK_LAN){
			log.info('Connected to Wifi, sending aggregated data');
			var batch = db.fetchValuesGreater('READINGS', currentRecord());
			var processed_batch = [];
			for(data in batch){
			    processed_batch.push(JSON.parse(data.json));
			}
			api.train({'measurements': processed_batch, 'train_id': train_id});
		}
		else{
			log.info('Not connected to Wifi or LAN, skipping.');
		}
	});
};
exports.start = initialize;