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