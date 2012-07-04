/**
 * @author Chuka Okoye
 * 
 * Profile Model
 * June 30, 2012.
 */

//Libraries
var log = require('lib/logger');

//Globals
var _profile = null;

var _isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

var _validators = {
    height: function(arg){
        log.debug('validating height');
        if (!_isNumber(arg))
            throw "Invalid height declaration";
    },
    weight: function(arg){
        log.debug('validating weight');
        if (!_isNumber(arg))
            throw "Invalid weight declaration"
    },
    birthday: function(arg){
        log.debug('validating birthday');
        var parts = arg.split("-");
        if (parts.length != 3){
            throw "Invalid birthday specified";
        }
    },
    sex: function(arg){
        log.debug('validating sex');
        if (!(arg == 'male' || arg == 'female')){
            throw "Invalid sex specified";
        }
    },
    hours_sitting: function(arg){
        log.debug('validating hours_sitting');
        if (arg > 23 || arg < 0){
            throw "Hours should be between 0 and 23";
        }
        if (!_isNumber(arg))
            throw "Hours sitting must be a valid number";
    },
    days_workout: function(arg){
        log.debug('validating days_workout');
        if (!_isNumber(arg))
            throw "Invalid number of days worked out";
    }
};

//Initialization function, pass in required object.
exports.create  = function(properties){
    _profile = {};
    _profile.height = properties.height;
    _profile.weight = properties.weight;
    _profile.birthday = properties.birthday;
    _profile.sex = properties.sex;
    _profile.hours_sitting = properties.hours_sitting;
    _profile.days_workout = properties.days_workout;

    log.debug('instantiated a new profile object');
    return _profile;
};

//Responsible for retrieving all properties
exports.get = function(element){
    return _profile[element];
};

//Responsible for setting all properties
exports.set = function(key, value){
    _profile[key] = value;
};

//Performs validation on specific arg or whole object
exports.validate = function(element){
    if (element){
        log.debug('validating '+element+' in profile model');
        _validators[element](_profile[element]); 
    }
    else{
        for (validator in _validators){
            log.debug('validating '+validator+' in profile model');
            _validators[validator](_profile[validator]);
        }
    }
    return true;
};

//Returns JSON representation of object
exports.toString = function(){
    return JSON.parse(_profile);
};
