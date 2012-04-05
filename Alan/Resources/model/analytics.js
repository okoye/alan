/**
 * @author Chuka Okoye
 * 
 * Analytics model is responsible for storing calorie, step, age and other
 * analytics data for display to user.
 */

//libs
var api = require('lib/api');
var log = require('lib/logger');
var account = require('model/account');

//global variables
var _analytics = null;
var _timeout = 0;

exports.load = function(){
    //reinstantiate if not already initialized.
    if (!_analytics){
        account.load();        
        _analytics = {};
        _analytics.age = 0;
        _analytics.steps = 0;
        _analytics.calories = 0;
        _analytics.distance = 0;
        _analytics.timestamp = 0;
        
        var today = (new Date).getDate();
        var last = new Date();
        last.setTime(_analytics.timestamp);
        
        if (last.getDate() != today){
            sync();
        }
    }
};

exports.steps = function(){
    return _analytics['steps'];
};

exports.distance = function(){
    return _analytics['distance'];
};

exports.calories = function(){
    return _analytics['calories'];
};

exports.timestamp = function(){
    return _analytics['timestamp'];
};

exports.sync = function(){
    sync();
    log.debug('previous analytics data is '+JSON.stringify(_analytics));

};

var sync = function(){
    if (_timeout){
        log.info('Clearing existing analytics timeout');
        clearTimeout(_timeout);
    }
        
    api.Analytics(account, function(res){
        if (res.status === 'success'){
            _analytics.timestamp = (new Date).getTime();
            _analytics.steps = (res['data']['steps']) ? res['data']['steps']:0;
            _analytics.calories = (res['data']['calories']) ? res['data']['calories']:0;
            _analytics.age = (res['data']['age']) ? res['data']['age']:0;
            _analytics.distance = (res['data']['distance']) ? res['data']['distance']:0;
                        
        }
        else{
            _timeout = setTimeout(sync, 300000); //attempt to resync in 5 mins
        }
    });
};

var computeActivityLevels = function(){
   //TODO: 
};

