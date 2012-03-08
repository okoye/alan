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
	this.account = new account.Account();
}

Processor.prototype.process = function(data){
    //format data for sending into a list structure.
    api.UpdateSensor(this.account, data.gps);
};

Processor.prototype.shutdown = function(){
	this.account.save();
	return true;
};

exports.Processor = Processor;