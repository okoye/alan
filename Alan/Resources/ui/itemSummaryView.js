/**
 * @author Chuka Okoye
 * 
 * Item summary view containing detailed breakdown
 */

var log = require('lib/logger');

var WIDTH = 170,
LEFT = 20,
HEIGHT = 60,
TOP = 10;

exports.create = function(_args, _cb, sections){
    var container = Ti.UI.createView({
        height: (_args.height) ? _args.height:HEIGHT,
        width: (_args.width) ? _args.width:WIDTH,
        left: (_args.left) ? _args.left:LEFT,
        top: (_args.top) ? _args.top:TOP,
    });
    
    var view = Ti.UI.createView({
        height: container.height,
        width: container.width,
        left: 0,
        top: 0,
        layout: 'horizontal',
        backgroundColor: 'white',
        borderRadius: 3,
    });
    
    var viewShadow = Ti.UI.createView({
        height: container.height,
        width: container.width,
        right: 0,
        bottom: -1,
        borderRadius: 3,
        backgroundColor: '#b1b1b1'
    });
    
    //Now, add section dividers
    var divider = function(_left){
        return Ti.UI.createImageView({
            image: 'images/line_sep.png',
            left: _left,
            width: 1,
        });
    };
    if (sections === 3){
        view.add(divider(Math.round(0.25*view.width)));
        view.add(divider(Math.round(0.75*view.width)));
    }
    
    // view.add(left);
    // view.add(center);
    // view.add(right);
    
    container.add(viewShadow);
    container.add(view);
    return container;
};