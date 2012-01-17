/**
 * @author Chuka Okoye
 * 
 * Responsible for managing data collection and processing elements.
 */

var collections = require("lib/collector");
var processing = require("lib/processor");
var trainer = require("lib/trainer");
var log = require('lib/logger');

var collector = {};
var processor = {};
var debug = {};

exports.initialize = function(){
	log.debug('Initializing collector routine');
	collector = new collections.Collector({
		context_period: 1800000, //30 mins
		movement_period: 60000, //60 secs
		proximity_period: 3600000, //1 hr
	});
	log.debug('Collector status: '+collector.status());
	log.debug('Initalizing processor routine');
	processor = new processing.Processor({
		success: function(data){
			log.info('Sucessful classification'); //TODO: store feedback
		},
		failure: function(data){
			log.info('Failed classification'); //TODO: store feedback
		},
	});
	foreground();
	//TODO: start trainer.
	setInterval(foreground, 30000); //TODO: Support background and foreground services.
	return collector.status();
};

var foreground = function(){
	log.debug('Firing foreground service.');
	var data = collector.getReadings();
	log.debug('Collected data '+JSON.stringify(data));
	processor.process(data);
};


