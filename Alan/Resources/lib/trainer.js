/**
 * @author Chuka Okoye
 * 
 * Listens for events from processor, fetches appropriate data sets and pushes to api
 * only when connected to Wifi otherwise just logs last timestamp and waits for Wifi.
 */

var api = require('lib/api');

var train_id = 'chuka'; //TODO

var current_record = function(current){
	//fetch and return current record. if not exist, create and return 0.
	if (current){
		Ti.App.Properties.setInt('current_record', current);
	}
	else{
		var temp = Ti.App.Properties.getString('current_record', 0);
		return 0;
	}
};

//TODO: listen for event from processor, then if on wifi, connect to db, retrieve result then send!

var initialize = function(){
	Ti.App.addEventListener('alan:sensorReadingsUpdate', function(evt){
		log.debug('Sensor Readings Update Fired Successfully');
		if (Ti.Network.networkType == Ti.Network.NETWORK_WIFI || Ti.Network.networkType == Ti.Network.NETWORK_LAN){
			log.info('Connected to Wifi, sending aggregated data');
			var batch = getNextBatch();
			while(batch.length > 0){
				api.train({'measurements': batch, 'train_id': train_id});
				batch = getNextBatch(rows); //batch of 300 readings.
			}
		}
		else{
			log.info('Not connected to Wifi or LAN, skipping.');
		}
	});
};

var getNextBatch = function(){
	var buffer = [];
	var db = Ti.Database.open('alan.sqlite');
	var rows = db.execute('SELECT * FROM READINGS WHERE id > '+current_record); //TODO optimize retrieval
	log.info('READINGS row count: '+rows.getRowCount());
	for (var i=0; (i < 300 && rows.isValidRow()); i++){
		buffer.push(JSON.parse(rows.fieldByName('json')));
		//TODO: update current record.
		rows.next();
	}
	rows.close();
	db.close();
	return buffer;
};

exports.start = initialize;