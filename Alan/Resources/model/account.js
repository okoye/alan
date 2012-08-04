/**
 * @author Chuka Okoye
 * 
 * Account is a model representation of user account information.
 */

//Libs
var log = require('lib/logger');
var instrumentation = require('lib/instrument');
var cache = require('lib/cache');

//Global Vars
var _account = null;

var isValidEmail = function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var _validators = {
    username: function(arg){
        log.debug('validating username');
        if(!isValidEmail(arg))
            throw "Username must be an email";
    },
    password: function(arg){
        log.debug('validating password');
        if (arg.length < 6){
            throw "Password should be 6 or more characters";
        }
    },
    firstname: function(arg){
        log.debug('validating firstname');
        if (arg.length == 0){
            throw "Firstname is required";
        }
    },
    lastname: function(arg){
        log.debug('validating lastname');
        if (arg.length == 0){
            throw "Lastname is required";
        }
    },
    nickname: function(arg){
        log.debug('validating nickname');
    },
    avatar_url: function(arg){
        log.debug('validating avatar url')
    }
};

//Initialization function, pass in required object
exports.create = function(properties){
    _account = {};
    _account.username = properties.username;
    _account.password = properties.password;
    _account.firstname = properties.firstname;
    _account.lastname = properties.lastname;
    _account.nickname = (properties.nickname) ? properties.nickname:"";
    _account.avatar_url = (properties.avatar_url) ? properties.avatar_url:"";
    
    log.debug('instantiated a new account object');
    instrumentation.checkpoint('account');
    return _account;
};

//Responsible for retrieving all properties
exports.get = function(element){
    return _account[element];
};

//Responsible for setting all properties
exports.set = function(key, value){
    _account[key] = value;
};

//Performs validation on specific arg or whole object
exports.validate = function(element){
    if(element){
        log.debug('validating '+element+' in account model');
        _validators[element](_account[element]);
    }
    else{
        for (validator in _validators){
            log.debug('validating '+validator+' in profile mnodel');
            _validators[validator](_account[validator]);
        }
    }
    return true;
};

//Returns a string representation of the object
exports.toString = function(){
    return JSON.stringify(_account);
};

//Loads _account with cached data
var initialize = function(){
	var _temp = null;
	if (_account == null){
		temp = cache.get('account', '_account');
		if (temp != null){
			_account = temp;
		}
	}
};
