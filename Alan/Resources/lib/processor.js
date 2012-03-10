/**
 * @author Chuka Okoye
 * 
 * Processor is responsible for initial rudimentary processing
 * of sensing data. Given raw sensing data, it constructs a JSON
 * representation, logs to db, buffers, and fires appropriate application
 * event.
 */

var log = require('lib/logger');
var account = require('model/account');
var api = require('lib/api');

function Processor(properties){
}

Processor.prototype.process = function(data){
    //format data for sending into a list structure.
    api.UpdateSensor(account, data.gps);
};

Processor.prototype.shutdown = function(){
	account.save();
	return true;
};

exports.Processor = Processor;