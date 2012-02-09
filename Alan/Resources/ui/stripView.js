/**
 * @author Chuka Okoye
 * StripView implements the film strip view for all Alan tabs
 */

var log = require('lib/logger');

var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;

exports.create = function(_args){
    var root = Ti.UI.createView({
        left: _args.left,
        width: _args.width,
        height: _args.height
    }),
    views = args.views,
    container = Ti.UI.createView({
        top: 0,
        left: 0,
        bottom: 0,
        width: PLATFORM_WIDTH * _args.views.length,
    });
    
    for (var i=0; i<views.length; i++){
        var newView = Ti.UI.createView({
            top: 0,
            bottom: 0,
            left: PLATFORM_WIDTH * i,
            width: PLATFORM_WIDTH
        });
        newView.add(views[i]);
        container.add(newView);
    }
    root.add(container);
    root.addEventListener('alan:changeBody', function(e){
        var left = PLATFORM_WIDTH * e.no;
        container.animate({
            duration: 3,
            left: left
        });
    });
    return root;
}
