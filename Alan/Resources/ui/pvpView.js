/**
 * @author Chuka Okoye
 * 
 * Social comparison against your friends and the world.
 */

var log = require('lib/logger');

var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;

exports.create = function(_args){
    var view = Ti.UI.createView({
        backgroundImage: 'images/center_view_bg.png',
        backgroundColor: 'white',
        width: PLATFORM_WIDTH,
    });
    log.info('Instantiated logger module.');
    return view;
};
