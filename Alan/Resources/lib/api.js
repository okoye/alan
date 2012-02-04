/**
 * @author Chuka Okoye
 * API abstraction.
 * 
 * live: api.alanapp.com
 * debug: api.thepuppetprojects.com
 */

var log = require('lib/logger');


var base = 'http://api.thepuppetprojects.com'; //FIXME
var local = {};
var headers = {};

local.createAccount = function(email, password, callback){
	log.info('Sending email & password to api');
	
	var conn = Ti.Network.createHTTPClient({
		onload: function(e){
			log.debug('Successfully created a new account');
			callback({status: 'success', data: this.responseText});
			var response = Ti.JSON.parse(this.responseText);
			if (response.token){
				callback({status: 'success', data: JSON.parse(this.responseText)});
			} else{
				callback({status:'error', message: 'Alan experienced an error while creating your account', data: JSON.stringify(this.responseText)});
			}
		},
		onerror: function(e){
			log.debug('An error occured when creating account: '+this.status);
			log.debug(JSON.stringify(e));
			callback({status: 'error', message:'Cannot connect to the Alan network at this time.', data: JSON.stringify(this.responseText)});
		}
	});
	conn.open('POST', base+'/accounts');
	conn.setRequestHeader('Content-Type', 'application/json');
	conn.send(JSON.stringify({
		email: email,
		password: password 
	}));
	return conn;
};
local.train = function(body, callback){
	log.info('Sending training data to api');
	
	var conn = Ti.Network.createHTTPClient({
		onload: function(e){
			if (this.status === 204)
				callback({status: 'success', data: JSON.parse(this.responseText)});
			else
				callback({status: 'error', message: 'Experiencing issues contacting Alan network'});
		},
		onerror: function(e){
			log.debug('An error occured when sending training data');
			log.debug(JSON.stringify(e));
			if (callback)
			 callback({status: 'error', message: 'Cannot send training data at this time', data: JSON.stringify(e)});
		}
	});
	conn.open('POST', base+'/train');
	conn.send(JSON.stringify(body));
	return conn;
};
exports.createAccount = local.createAccount;
exports.login = local.createAccount;
exports.train = local.train;
