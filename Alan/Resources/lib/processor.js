/**
 * @author Chuka Okoye
 * 
 * Processor is responsible for initial rudimentary processing
 * of sensing data. Given raw sensing data, it constructs a JSON
 * representation, logs to db, buffers, and fires appropriate application
 * event.
 */

//TODO: Add support for success (to send to api/trainer hook-in).

var log = require("lib/logger");

function Processor(properties){
	this.activity_buffer = [];
	this.location_buffer = [];
	this.classifier = properties.success;
	
	//database initialization routines
	var create_you_table = "CREATE TABLE IF NOT EXISTS you (id INTEGER PRIMARY KEY, timestamp INTEGER NOT NULL, json TEXT NOT NULL)";
	var db = Ti.Database.open("alan.sqlite");
	
	db.execute(create_you_table);
	db.close();
}

Processor.prototype.process = function(data){
	var activity = this.classifier(data);
	var timestamp = this.getTimestamp();
	if (activity){
		this.activity_buffer.push({activity: activity, timestamp: timestamp, precision:'seconds', processed: true});
	} else{
		this.activity_buffer.push({activity: data, timestamp: timestamp, precision:'seconds', processed: false});
	}
	
	this.location_buffer.push({wifi: data.wifi, gps: data.gps, time:timestamp});
	
	if (this.activity_buffer.length >= 100 || this.location_buffer >= 100){
		this.updateDB();
		Ti.App.fireEvent('alan:sensorReadingsUpdate', {length: this.activity_buffer.length + this.location_buffer.length});
		this.activity_buffer = [];
		this.location_buffer = [];
	}
};

Processor.prototype.updateDB = function(){
	var db = Ti.Database.open("alan.sqlite");
	var insert_you_statement = "INSERT INTO you (timestamp, json) VALUES (?,?)";
	for (var i=0; i<this.activity_buffer.length; i++){
		db.execute(insert_you_statement, this.activity_buffer[i].timestamp, this.activity_buffer[i]);
	}
	for (var i=0; i<this.location_buffer.length; i++){
		db.execute(insert_you_statement, this.location_buffer[i].timestamp, this.location_buffer[i]);
	}
	db.close();
};

Processor.prototype.shutdown = function(){
	this.updateDB();
	return true;
};

Processor.prototype.getTimestamp = function(){
	return (new Date).getTime(); //seconds since epoch.
};

exports.Processor = Processor;