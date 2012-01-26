/**
 * @author Chuka Okoye
 * 
 * Background Service Polling Implementation
 */

var log = require('lib/logger');
var collections = require('lib/collector');
var processing = require('lib/processor');

var collector = new collections.Collector({
		context_period: 1800000, //30 mins
		movement_period: 60000, //60 secs
		proximity_period: 3600000, //1 hr
});

var processor = new processing.Processor({
		success: function(data){
			log.info('Sucessful classification'); //TODO: store feedback
		},
		failure: function(data){
			log.info('Failed classification');
		},
});

var run = function(){
	var id = setInterval(function(){
		data = collector.getReadings();
		processor.process(data);
	}, 30000);
	
	Ti.App.currentService.addEventListener('stop', function(){
		clearTimeout(id);
	});
};

run();
