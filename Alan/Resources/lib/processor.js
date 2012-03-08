/**
 * @author Chuka Okoye
 * 
 * Processor is responsible for initial rudimentary processing
 * of sensing data. Given raw sensing data, it constructs a JSON
 * representation, logs to db, buffers, and fires appropriate application
 * event.
 */

//TODO: Add support for filter.

var log = require('lib/logger');
var classifier = require('lib/classifier');
var db = require('lib/db');
var activityModel = require('model/activity');

var BATCH_UPDATE = 2;

function Processor(properties){
	this.activity_buffer = [];
	this.success = properties.success; //on successful activity classification; feedback loop
	this.failure = properties.failure; //on failed activity classification; feedback loop
	this.TABLE_NAME = 'ACTIVITIES';
	this.TABLE_STRUCTURE = '(id INTEGER PRIMARY KEY, name TEXT NOT NULL, timestamp TEXT NOT NULL, speed REAL NOT NULL, latitude REAL, longitude REAL, altitude REAL)';
	db.createTable(this.TABLE_NAME, this.TABLE_STRUCTURE);
	
	this.discriminator = new classifier.Classifier(null, true);
}

Processor.prototype.process = function(data){
    
};

Processor.prototype.shutdown = function(){
	this.updateDB();
	return true;
};

Processor.prototype.getTimestamp = function(){
	return (new Date).getTime(); //seconds since epoch.
};

exports.Processor = Processor;