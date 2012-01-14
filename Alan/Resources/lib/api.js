/**
 * @author Chuka Okoye
 * API management
 */

var log = require('lib/logger');

var base = 'http://api.rstallion.com';

exports.createAccount = function(email, password, callback){
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
			//TODO: write to persistent log
			log.debug('An error occured when creating account');
			log.debug(JSON.stringify(e));
			callback({status: 'error', message:'Cannot connect to the Alan network at this time.', data: JSON.stringify(e)});
		}
	});
	conn.open('POST', base+'/accounts');
	conn.setRequestHeader('Content-Type', 'application/json');
	conn.send(JSON.stringify({
		email: email,
		password: password 
	}));
};
