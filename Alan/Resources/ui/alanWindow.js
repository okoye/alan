/**
 * @author Chuka Okoye
 * Creates the main Alan application window.
 */

var styling = require('lib/styles');
var myAnalytics = reqiure('lib/youView');

//Constants
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;
var PLATFORM_HEIGHT = Ti.Platform.DisplayCaps.platformHeight;

exports.createAlanWindow = function(_args){
    var win = Ti.UI.createWindow({
        exitOnClose: true,
        orientationModes: [Ti.UI.PORTRAIT],
    }),
    headerView = Ti.UI.createView({
        backgroundColor: 'pink', //TODO Navigation bar customization and sub header elements
        height: PLATFORM_HEIGHT - (styling.tabHeight + styling.bodyHeight),
    }),
    footerView = Ti.UI.createView({
        bottom: 0,
        height: styling.tabHeight,
        backgroundImage: 'images/bottom_nav_bg_alan.png',
        width: PLATFORM_WIDTH
    }),
    tabs = [];
    
    var bodyView = myAnalytics.createView();
    
    var createTab = function(_icon, _cb, _on){
        //TODO
    };
    var changeTab = function(tabNo){
        //TODO
    };
    
    //Create main application tabs
    tabs.push(createTab('images/bottom_nav_btn_me', function(){
        changeTab(0);
    }, true));
    tabs.push(createTab('images/bottom_nav_btn_life_meter'), function(){
        changeTab(1);
    });
    tabs.push(createTab('images/bottom_nav_btn_rewards'), function(){
        changeTab(2);
    });
    tabs.push(createTab('images/bottom_nav_btn_settings'), function(){
        changeTab(3);
    });
    
    win.add(headerView);
};


