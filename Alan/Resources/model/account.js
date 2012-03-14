/**
 * @author Chuka Okoye
 * 
 * Account is a model representation of user account information.
 */

//Libs
var api = require('lib/api');
var log = require('lib/logger');

//Global Vars
var _account = null;
var _errors = [];
var _errorListenerRegistered = false;

exports.load = function(email, password){
    if (email && password){
        _account = {};
        if (isValidEmail(email)){
            _account.email = email;
            _account.password = password;
        }
        else{
            throw "Invalid Email";
        }
    }
    else{
        //instantiate from cache.
        _account = Ti.App.Properties.getString('model/account', null);
        if (!_account){
            if (Ti.App.deployType === 'development'){
                _account.email = Ti.Platform.macaddress+'@alanapptest.com';
                _account.password = Ti.Platform.username+':alanapptest';
            }
            else{
                throw "No account information saved";
            }
        }
        else
            _account = JSON.parse(_account);
    }
    
    Ti.App.addEventListener('alan:accountResync', function(err){
        log.debug('Resending data to API');
        update();
    });
}

exports.username = function(){
    //retrieve username
    return _account.email;
};

exports.password = function(){
    //retrieve password
    return _account.password
};

exports.create = function(){
    //saves data to app cache and to api
    create();
};

exports.purge = function(){
    Ti.App.Properties.removeProperty('model/account');
};

var create = function(){
    //local equivalent of save function
    Ti.App.Properties.setString('model/account', JSON.stringify(_account));
    api.CreateAccount(_account.email, _account.password, function(res){
        if (res.status === 'error'){
            log.debug('Failed to send account info to api');
        }
    });
};

var update = function(){
    //TODO: update user account info.
}

var isValidEmail = function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
