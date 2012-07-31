/**
 * @author Chuka Okoye
 * API abstraction.
 * 
 * live: api.alanapp.com
 * debug: api.thepuppetprojects.com
 */

var log = require('lib/logger');
var testflight = require('ti.testflight');


var base = 'http://api.alanapp.com';

if (Ti.App.deployType === 'development' || Ti.App.deployType === 'test')
    base = 'http://api.thepuppetprojects.com';

var connector = function(callback, success, username, password){
    //accepts callback function, and expected success http code.
    var conn = Ti.Network.createHTTPClient({
        onload: function(e){
            var status = this.status;
            if (status == success){
                log.debug('Successful HTTP code from API')
                data = this.responseText;
                data = (data) ? data:"{}";
                callback({status: 'success', data: JSON.parse(data)});
            }
            else{
                log.debug('Bad HTTP code from API')
                callback({
                    status: 'error',
                    code: this.status,
                });
            }
        },
        onerror: function(e){
            log.debug('An error occured when contacting API '+JSON.stringify(e));
            callback({
                status: 'error',
                code: this.status,
            });
        },
        timeout: 5000,
        enableKeepAlive: false
    });
    
    if (username && password){
        var authstr = 'Basic '+Ti.Utils.base64encode(username + ':' + password);
        conn.setRequestHeader('Authorization', authstr);
        conn.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    }
    
    return conn;
    
}

exports.CreateAccount = function(account, profile, callback){
	log.info('Sending email & password to api');
	var evaluate = function(response){
		if (response.status === 'error'){
			if (response.code == 409){
				response.message = 'An account with same username already exists';
			}
			else{
				response.message = 'Hmmm...you may be having network issues. Cannot connect to Alan.';
			}
			callback(reponse);
		}
	};
	var conn = connector(evaluate, 204);
	conn.open('POST', base+'/1/accounts/basic');
	var packet = {};
	for (prop in account){
	    packet[prop] = account[prop];
	}
	for (prop in profile){
	    packet[prop] = profile[prop];
	}
	conn.send(JSON.stringify(packet));
	testflight.checkpoint('api.createaccount');
};

exports.UpdateSensor = function(account, readings, callback){
    log.info('Updating sensors on api '+JSON.stringify(readings));
    var evaluate = function(response){
    	if (response.status === 'error'){
    		if (response.code == 401){
    			response.message = 'Cannot login to your Alan account.';
    		}
    		else if(response.status == 500){
    			response.message = 'Oops, looks like Alan network is still being upgraded.';
    		}
    		else{
    			response.message = 'Your wireless network connection is somewhat spotty.';
    		}
    		callback(response);
    	}
    };
    var conn = connector(evaluate, 204, account.get('username'), account.get('password'));
    conn.open('POST', base+'/1/sensors/update');
    conn.send(JSON.stringify(readings));
    testflight.checkpoint('api.updatesensor');
};

exports.Analytics = function(account, callback){
    log.info('Retrieving Analytics data');
    var evaluate = function(response){
    	if (response.status === 'error'){
    		if (response.code == 401){
    			response.message = 'Cannot login to your Alan account.';
    		}
    		else if(response.status == 500){
    			response.message = 'Alan network is currently experiencing issues.';
    		}
    		else{
    			response.message = 'Looks like you have poor internet connectivity at this time.'
    		}
    		callback(response);
    	}
    }
    var conn = connector(evaluate, 200, account.get('username'), account.get('password'));
    conn.open('GET', base+'/1/analytics');
    conn.send();
    testflight.checkpoint('api.analytics');
};

