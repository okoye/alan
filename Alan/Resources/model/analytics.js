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

exports.load = function(){
    //reinstantiate if not already initialized.
    if (!_analytics){        
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
};

var sync = function(){
    api.Analytics(account, function(res){
        if (res.status === 'success'){
            _analytics.timestamp = (new Date).getTime();
            _analytics.steps = res['data']['steps'];
            _analytics.calories = res['data']['calories'];
            _analytics.age = res['data']['age'];
            _analytics.distance = res['data']['distance'];
        }
        else{
            setTimeout(sync, 30000);
        }
    });
};

