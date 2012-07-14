/**
 * @author Chuka Okoye
 * 
 * Log Management
 */

var testflight = require('ti.testflight');

exports.info = function(str){
	Titanium.API.info(new Date()+': '+str);
};

exports.debug = function(str){
	Titanium.API.debug(new Date()+': '+str);
};

exports.feedback = function(str){
   
};

