/**
 * @author Chuka Okoye
 * 
 * Responsible for managing data collection and processing elements.
 */

var collections = require("lib/collector.js");
var processing = require("lib/processor.js");
var classifier = require("lib/classifier.js");
var log = require('lib/logger');

exports.initialize = function(){
	//poll collector movement every n-seconds, then send data to processor.
	var collector = collector.Collector({
		context_period: 360000,
		movement_period: 6000,
		proximity_period: 60000,
	});
	var processor = processing.Processor({
		success: function(data){
			log.info('Sucessful classification'); //TODO: store feedback
		},
		failure: function(data){
			log.info('Failed classification'); //TODO: store feedback
		},
	});
	//setInterval(collector.getMovement)
	collector.getReadings(function(data){
		log.debug('Returned sensor data: '+JSON.stringify(data));
	});
}


