/**
 * @author Chuka Okoye
 * API abstraction.
 * 
 * live: api.alanapp.com
 * debug: api.thepuppetprojects.com
 */

var log = require('lib/logger');


var base = 'http://api.thepuppetprojects.com'; //FIXME

exports.CreateAccount = function(email, password, callback){
	log.info('Sending email & password to api');
	
	var conn = Ti.Network.createHTTPClient({
		onload: function(e){
			var response = Ti.JSON.parse(this.responseText);
			var status = this.status;
			if (status === 204){
				callback({status: 'success', data: {}});
			} 
			else{
				callback({
				    status:'error', 
				    message: 'Alan experienced an error while creating your account', 
				    data: [email, password]
				});
			}
		},
		onerror: function(e){
			log.debug('An error occured when creating account');
			log.debug(JSON.stringify(e));
			callback({status: 'error', 
			 message:'Cannot connect to the Alan network at this time.', 
			 data: [email, password]
			});
		}
	});
	conn.open('POST', base+'/1/accounts/basic/create');
	conn.setRequestHeader('Content-Type', 'application/json');
	conn.send(JSON.stringify({
		email: email,
		password: password 
	}));
	return conn;
};

exports.UpdateSensor = function(account, readings, callback){
    log.info('Updating sensors on api');
    
    var conn = Ti.Network.createHTTPClient({
        onload: function(e){
            var status = this.status;
            if (status === 204){
                callback({status: 'success', data: {}});
            }
            else{
                callback({
                    status: 'error',
                    message: 'Cannot update gps information.',
                    data: [readings]
                });
            }
        },
        onerror: function(e){
            log.debug('An error occured when updating sensor');
            log.debug(JSON.stringify(e));
            callback({
                status: 'error',
                message: 'Cannot connect to Alan network at this time.',
                data: [readings]
            });
        }
    });
    conn.open('POST', base+'/1/sensors/update');
    conn.setRequestHeader('Content-Type', 'application/json');
    conn.send(JSON.stringify(readings));
    return conn;
};

