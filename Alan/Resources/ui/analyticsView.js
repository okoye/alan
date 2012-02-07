/**
 * @author Chuka Okoye
 * 
 * The You analytics view
 */

var log = require('lib/logger');

var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;

exports.createView = function(_args){
    //root view control
    var view = Ti.UI.createView({
        backgroundImage: 'images/center_view_bg.png',
        height: (_args.height) ? _args.height:(PLATFORM_HEIGHT - 90),
        top: (_args.top) ? _args.top:45,
    });
    log.info('Height of bodyView '+(PLATFORM_HEIGHT - 90));
    
    return view;
};
