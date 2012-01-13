/**
 * @author Chuka Okoye
 * Account Management Functions
 */

var api = require('lib/api');
var log = require('lib/logger');

function Account(email, password, callback){
	var status = {};
	if (email && password)
	{
		if (this._isValidPassword(password)){
			if (this._isValidEmail(email)){
				this._email = email;
				this._password = password;
				api.createAccount(email, password, callback);
			} else{
				status.status = 'error';
				status.message = 'Your email address is invalid';
				log.debug('Invalid email address');
				callback(status);
			}
		} else{
			status.status = 'error';
			status.message = 'Your password must be at least 2 characters long';
			log.debug('Invalid password info');
			callback(status);
		}
	}
}

Account.prototype.email = function(){
	return this._email;
};

Account.prototype.password = function(){
	return this._password;
};

Account.prototype.saveCredentials = function(){
	Ti.App.Properties.setString('account_email', this._email);
	Ti.App.Properties.setString('account_password', this._password);
};

Account.prototype.loadCredentials = function(){
	var credentials = {};
	credentials.email = Ti.App.Properties.getString('account_email','null');
	credentials.password = Ti.App.Properties.getString('account_password', 'null');
	
	if (credentials.email === 'null' || credentials.password === 'null')
		return {};
	else
		return credentials;
};

Account.prototype.deleteCredentials = function(){
	Ti.App.Properties.removeProperty('account_email');
	Ti.App.Properties.removeProperty('account_password');
}

Account.prototype._isValidEmail = function(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

Account.prototype._isValidPassword = function(password){
	return (password !== "" && password.length > 1); //TODO: trim whitespaces.
};

exports.Account = Account;
