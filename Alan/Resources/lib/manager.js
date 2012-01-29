/**
 * @author Chuka Okoye
 * 
 * Responsible for managing foreground and background collection logic.
 */

var collections = require("lib/collector");
var processing = require("lib/processor");
var trainer = require("lib/trainer");
var log = require('lib/logger');
var utility = require("lib/utilities");

var collector = {};
var processor = {};
var debug = {};
var foregroundId;

exports.initialize = function(training){
	log.debug('Initializing collector routine');
	collector = new collections.Collector({ //TODO: refactor for background.js
		context_period: 3600000, // 1 hr
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
	foregroundId = foreground();
	background();
	
	if (training)
		trainer.start();
	
	return collector.status();
};

var foreground = function(){
	log.debug('Firing foreground service.');
	var data = {};
	
	var id = setInterval(function(){
		data = collector.getReadings();
		processor.process(data);
	}, 30000);
	return id;
};

var background = function(){
	Ti.App.addEventListener('resume', function(e){
		log.debug('Running foreground services');
		foregroundId = foreground();
	});
	
	Ti.App.addEventListener('pause', function(e){
		log.debug('Running background services');
		if (foregroundId)
			clearTimeout(foregroundId);
			
		if (utility.isOS4_Plus()){
			log.debug('Yup, now registering background service');
			var service = Ti.App.iOS.registerBackgroundService({url: 'lib/background.js'});
		}
	});
	
	Ti.App.addEventListener('close', function(e){
		log.debug('Closing application');
	});
	
};


