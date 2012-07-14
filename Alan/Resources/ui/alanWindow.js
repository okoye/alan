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
    
    //Setup settings button
    var settingsButton = Ti.UI.createButton({
        backgroundImage: 'images/top_nav_btn_feedback.png',
    });
    var settings = Ti.UI.createView({
        width: 40,
        height: 33
    });
    settings.add(settingsButton);
    
    //Setup meView window
    var meWindow = Ti.UI.createWindow({
        barImage: 'images/top_nav.png',
        backgroundColor: 'white',
        title: 'Me',
        rightNavButton: settings,
    });
    
    //hack for meView window's rightNavButton
    meWindow.addEventListener('focus', function(e){
        var t = e.source.rightNavButton;
        e.source.rightNavButton = null;
        e.source.rightNavButton = t;
    });
    
    //Setup navigation bar
    var navigation = Ti.UI.iPhone.createNavigationGroup({
        window: meWindow,
    });
    
    win.add(navigation);
    win.open();
};


