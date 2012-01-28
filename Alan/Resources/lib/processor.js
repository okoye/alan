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
var db = require('lib/db');

function Processor(properties){
	this.activity_buffer = [];
	this.success = properties.success; //on successful activity classification; feedback loop
	this.failure = properties.failure; //on failed activity classification; feedback loop
	this.TABLE_NAME = 'READINGS';
	
	db.createTable(this.TABLE_NAME);
}

Processor.prototype.process = function(data){
	var activity = classifier.classify(data);
	var timestamp = this.getTimestamp();
	if (activity){
		this.activity_buffer.push({readings: activity, timestamp: timestamp, precision: 'seconds', processed: true});
		
	} else{
		this.activity_buffer.push({readings: data, timestamp: timestamp, precision: 'seconds', processed: false});
	}
		
	if (this.activity_buffer.length >= 0){
		log.debug('Calling updateDB');
		this.updateDB();
		Ti.App.fireEvent('alan:sensorReadingsUpdate', {length: this.activity_buffer.length});
		this.activity_buffer = [];
	}
};

Processor.prototype.updateDB = function(){
	for (var i=0; i<this.activity_buffer.length; i++){
		db.insert(this.activity_buffer[i].timestamp, this.activity_buffer[i], this.TABLE_NAME);
	}
};

Processor.prototype.shutdown = function(){
	this.updateDB();
	return true;
};

Processor.prototype.getTimestamp = function(){
	return (new Date).getTime(); //seconds since epoch.
};

exports.Processor = Processor;