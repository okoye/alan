/**
 * @author Chuka Okoye
 * Creates the main Alan application window.
 */
var log = require('lib/logger');
var manager = require('lib/manager');
var instrumentation = require('lib/instrument');
var meController = require('controller/meController');
var account = require('model/account');
var profile = require('model/profile');
var api = require('lib/api');
var error = require('lib/errors');
var meView = require('ui/meView');
var meController = require('controller/meController');

exports.createAccountWindow = function(callback){
	//create account information on alan network
	log.info('creating a new account');
    account.create({
    	username: Ti.Platform.macaddress.substring(0,6)+'@alanapptest.com',
    	password: Ti.Platform.macaddress.substring(0, 12),
    	firstname: 'Kaiya',
    	lastname: 'Rudenko',
    	nickname: '',
    	avatar: ''
    });
    profile.create({
    	height: 170,
    	weight: 180,
    	birthday: '1988-06-20',
    	sex: 'female',
    	hours_sitting: 10,
    	days_workout: 1
    });
    api.CreateAccount(JSON.parse(account.toString()), JSON.parse(profile.toString()), function(msg){
    	if(msg.status != 'success'){
    		if (msg.message == error.codes.DuplicateAccount){
    			alert('account with same username already exists');
    			callback(true);
    		}
    		else{
    			alert('an error occured when contacting api, try again later.');
    		}
    	}
    	else{
    		callback(true);
    	}
    });
};

exports.createInitializeWindow = function(callback){
	//create about screen and tutorial
	log.info('creating initialize info pane');
	callback(true);
};

exports.createAlanWindow = function(_args){
    //start alan quantification display window
    log.info('creating alan quantification pane');
    var clicks = 0;
    var win = Ti.UI.createWindow({
        backgroundColor: 'white',
    });
    
    //Setup settings button
    var settingsButton = Ti.UI.createButton({
        backgroundImage: 'images/top_nav_btn_settings.png',
        width: 40,
        height: 33
    });
    var settings = Ti.UI.createView({
        width: settingsButton.width,
        height: settingsButton.height,
    });
    settings.add(settingsButton);
    
    var settingsWindow = Ti.UI.createWindow({
        title: 'SETTINGS',
        barImage: 'images/top_nav.png',
        backgroundColor: 'white',
        backgroundImage: 'images/center_view_bg.png',
    });
    
    //Setup meView content
    var content = meView.create({
        height: 435,
    });
    
    //Setup meView window
    var meWindow = Ti.UI.createWindow({
        barImage: 'images/top_nav.png',
        backgroundColor: 'white',
        title: 'ME',
        rightNavButton: settings,
    });
    meWindow.add(content);
    
    //Setup navigation bar
    var navigation = Ti.UI.iPhone.createNavigationGroup({
        window: meWindow,
    });
    settingsButton.addEventListener('click', function(e){
        navigation.open(settingsWindow);
        clicks += 1;
        alert('You clicked '+clicks+' times');
    });
    
    //Setup controllers
    var meControl = new meController.Controller(content);
    meControl.start();
    
    //Setup sensing manager
    var sensingManager = new manager.Manager()
    if (sensingManager.start() == false){
    	//show some error then quit.
    }
    
    
    win.add(navigation);
    win.open();
    instrumentation.checkpoint('window');
};


