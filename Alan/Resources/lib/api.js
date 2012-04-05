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
            if (status === success){
                log.debug('Successful HTTP code from API')
                data = this.responseText;
                data = (data) ? data:"";
                callback({status: 'success', data: JSON.parse(data)});
            }
            else{
                log.debug('Bad HTTP code from API')
                callback({
                    status: 'error',
                    message: 'Cannot not connect to Alan network at this time.'
                });
            }
        },
        onerror: function(e){
            log.debug('An error occured when contacting API '+JSON.stringify(e));
            callback({
                status: 'error',
                message: 'Could not connect to Alan. Try again later.'
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

exports.CreateAccount = function(email, password, callback){
	log.info('Sending email & password to api');
	var conn = connector(callback, 204);
	conn.open('POST', base+'/1/accounts/basic/create');
	conn.send(JSON.stringify({
	    email: email,
	    password: password
	}));
	testflight.checkpoint('api.createaccount');
};

exports.UpdateSensor = function(account, readings, callback){
    log.info('Updating sensors on api '+JSON.stringify(readings));
    var conn = connector(callback, 204, account.username(), account.password());
    conn.open('POST', base+'/1/sensors/update');
    conn.send(JSON.stringify(readings));
    testflight.checkpoint('api.updatesensor');
};

exports.Analytics = function(account, callback){
    log.info('Retrieving Analytics data');
    var conn = connector(callback, 200, account.username(), account.password());
    conn.open('GET', base+'/1/analytics');
    conn.send();
    testflight.checkpoint('api.analytics');
};

