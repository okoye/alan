/**
 * @author Chuka Okoye
 * Creates the main Alan application window.
 */

var styling = require('lib/styles');
var myAnalytics = reqiure('lib/youView');
var platformWidth = Ti.Platform.displayCaps.platformWidth;

exports.createAlanWindow = function(_args){
    var win = Ti.UI.createWindow({
        exitOnClose: true,
        orientationModes: [Ti.UI.PORTRAIT],
    }),
    headerView = Ti.UI.createView({
        backgroundColor: 'pink',
    }),
    bodyView = myAnalytics.createView(),
    tabHeight = styling.tabHeight,
    footerView = Ti.UI.createView({
        bottom: 0,
        height: tabHeight,
        backgroundImage: 'images/bottom_nav_bg_alan.png',
        width: platformWidth
    }),
    tabs = [];
    
};

