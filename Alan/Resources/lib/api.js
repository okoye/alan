/**
 * @author Chuka Okoye
 * API abstraction.
 * 
 * live: api.alanapp.com
 * debug: api.thepuppetprojects.com
 */

var log = require('lib/logger');


var base = 'http://api.alanapp.com';

if (Ti.App.deployType === 'development')
    base = 'http://api.thepuppetprojects.com';

exports.CreateAccount = function(email, password, callback){
	log.info('Sending email & password to api');
	
	var conn = Ti.Network.createHTTPClient({
		onload: function(e){
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
                    message: 'Cannot update gps information at this time.',
                    data: [readings]
                });
            }
        },
        onerror: function(e){
            log.debug('An error occured when updating sensor');
            log.debug(JSON.stringify(e));
            callback({
                status: 'error',
                message: 'Experiencing network connection issues.',
                data: [readings]
            });
        }
    });
    conn.open('POST', base+'/1/sensors/update');
    conn.setRequestHeader('Content-Type', 'application/json');
    conn.send(JSON.stringify(readings));
    return conn;
};

exports.Analytics = function(account, callback){
    log.info('Retrieving Analytics data');
    
    var conn = Ti.Network.createHTTPClient({
        onload: function(e){
            var status = this.status;
            if (status === 200){
                callback({status: 'success', data: JSON.stringify(this.responseText)});
            }
            else{
                callback({
                    status: 'error',
                    message: 'Experiencing issues connecting to Alan at this time.',
                    data: {}
                });
            }
        },
        onerror: function(e){
            log.debug('An error occured when fetching analytics data');
            log.debug(JSON.stringify(e));
            callback({
                status: 'error',
                message: 'Experiencing network connection issues.',
                data: {}
            });
        }
    });
    conn.open('GET', base+'/1/analytics');
    conn.setRequestHeader('Content-Type', 'application/json');
    conn.send();
    return conn;
}

