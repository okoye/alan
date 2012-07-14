/**
 * @author Chuka Okoye
 * Creates the main Alan application window.
 */
var log = require('lib/logger');
var manager = require('lib/manager');

//views
var meView = require('ui/meView');

//controllers
var meController = require('controller/meController');

//Constants
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;
var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;

exports.createAlanWindow = function(_args){
    //Setup root window
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
    var meControl = meController.Controller(content);
    meControl.start();
    
    
    win.add(navigation);
    win.open();
};


