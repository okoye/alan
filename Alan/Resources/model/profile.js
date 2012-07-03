/**
 * @author Chuka Okoye
 * 
 * Profile Model
 * June 30, 2012.
 */

//Libraries
var log = require('lib/logger');

//Globals
var _profile = {};

var _validators = {
    height: function(arg){
        log.debug('validating height');
    },
    weight: function(arg){
        log.debug('validating weight');
    },
    birthday: function(arg){
        log.debug('validating birthday');
    },
    sex: function(arg){
        log.debug('validating sex');
    },
    hours_sitting: function(arg){
        log.debug('validating hours_sitting');
    },
    days_workout: function(arg){
        log.debug('validating days_workout');
    }
};

//Initialization function, pass in required object.
exports.create  = function(properties){
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
        log.debug('validating '+validator+' in profile model');
        _validators[element](_profile[element]); //TODO wrap in try->catch then alert using alert dialog.
    }
    else{
        for (validator in _validators){
            log.debug('validating '+validator+' in profile model');
            _validators[validator](_profile[validator]);
        }
    }
};

//Returns JSON representation of object
exports.toString = function(){
    return JSON.parse(_profile);
};
