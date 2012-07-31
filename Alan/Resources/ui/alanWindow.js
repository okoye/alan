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
var cache = require('lib/cache');
var api = require('lib/api');
var error = require('lib/errors');

//views
var meView = require('ui/meView');

//controllers
var meController = require('controller/meController');

//Constants
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;
var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var CACHE_NAME = 'alanWindowMetaData';

exports.createInitializeWindow = function(success, err){
    //start account setup and initialization window. it is indempotent
    
    //create cache
    cache.initialize();
    cache.create(CACHE_NAME);
    //state variables
    var errors = 0;
    //helper functions
    var create_alannetwork_account = function(key, duplicates){
        if (!cache.get(CACHE_NAME, key)){
            api.CreateAccount(JSON.parse(account.toString()), JSON.parse(profile.toString()), function(msg){
                if (msg.status != 'success'){
                    if (msg.message == error.codes.DuplicateAccount && duplicates)
                    {
                    	cache.set(CACHE_NAME, key, 'yes');
                    }
                    else{
                    	errors += 1;
                    }
                }
                else{
                    cache.set(CACHE_NAME, key, 'yes');
                }
            });
        }
    };
    var create_newaccount_info = function(key){
        //TODO create account shenanigans and update key in cache.
    };
    
    if (Ti.App.deployType === 'development' || Ti.App.deployType === 'test'){
        log.debug('in debug mode');
        account.create({
            username: Ti.Platform.macaddress+'@alanapptest.com',
            password: Ti.Platform.macaddress,
            firstname: 'Kaiya',
            lastname: 'Rudenko',
            nickname: '',
            avatar_url: ''
        });
        profile.create({
            height: 170,
            weight: 180,
            birthday: '1988-06-20',
            sex: 'female',
            hours_sitting: 10,
            days_workout: 1
        });
        create_alannetwork_account('created-alannetwork-debug-account', 'yes');
    }
    else{
        log.debug('in live mode');
        if (!cache.get(CACHE_NAME, 'collected-initialization-data')){
            create_newaccount_info('collected-initialization-data');
        }
        create_alannetwork_account('created-alannetwork-account');
    }
    
    //Timeout info
    setTimeout(function(){
        if (errors > 0){
            err();
        }
        else{
            success();
        }
    }, 7000);
};

exports.createAlanWindow = function(_args){
    //start alan quantification display window
    var win = Ti.UI.createWindow({
        backgroundColor: 'white',
    });
    
    log.info('PLATFORM WIDTH '+PLATFORM_WIDTH);
    log.info('PLATFORM HEIGHT '+PLATFORM_HEIGHT);
    
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
    
    //Setup meView content
    var content = meView.create({
        height: 435,
    });
    
    //Setup meView window
    var meWindow = Ti.UI.createWindow({
        barImage: 'images/top_nav.png',
        backgroundColor: 'white',
        title: 'Me',
        rightNavButton: settings,
    });
    meWindow.add(content);
    
    //Setup navigation bar
    var navigation = Ti.UI.iPhone.createNavigationGroup({
        window: meWindow,
    });
    
    //Setup controllers
    var meControl = new meController.Controller(content);
    meControl.start();
    
    
    win.add(navigation);
    win.open();
    instrumentation.checkpoint('alanWindow');
};


