/**
 * @author Chuka Okoye
 * 
 * Processor is responsible for initial rudimentary processing
 * of sensing data. Given raw sensing data, it constructs a JSON
 * representation, logs to db, buffers, and fires appropriate application
 * event.
 */

//TODO: Add support for success (to send to api/trainer hook-in).

var log = require('lib/logger');
var classifier = require('lib/classifier');

//TODO: remove buffering.

function Processor(properties){
	this.activity_buffer = [];
	this.success = properties.success; //on successful activity classification; feedback loop
	this.failure = properties.failure; //on failed activity classification; feedback loop
	
	//database initialization routines
	var create_you_table = "CREATE TABLE IF NOT EXISTS READINGS (id INTEGER PRIMARY KEY, timestamp INTEGER NOT NULL, json TEXT NOT NULL)";
	var db = Ti.Database.open("alan.sqlite");
	
	db.execute(create_you_table);
	db.close();
}

Processor.prototype.process = function(data){
	var activity = classifier.classify(data);
	var timestamp = this.getTimestamp();
	if (activity){
		this.activity_buffer.push({readings: activity, timestamp: timestamp, precision: 'seconds', processed: true});
		
	} else{
		this.activity_buffer.push({readings: data, timestamp: timestamp, precision: 'seconds', processed: false});
	}
		
	if (this.activity_buffer.length >= 10){
		log.debug('Calling updateDB');
		this.updateDB();
		Ti.App.fireEvent('alan:sensorReadingsUpdate', {length: this.activity_buffer.length});
		this.activity_buffer = [];
	}
};

Processor.prototype.updateDB = function(){
	var db = Ti.Database.open("alan.sqlite");
	var insert_you_statement = "INSERT INTO READINGS (timestamp, json) VALUES (?,?)";
	for (var i=0; i<this.activity_buffer.length; i++){
		db.execute(insert_you_statement, this.activity_buffer[i].timestamp, JSON.stringify(this.activity_buffer[i]));
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