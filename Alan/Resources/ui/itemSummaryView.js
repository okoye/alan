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
exports.create = function(_args){
    var view = Ti.UI.createView({
        height: (_args.height) ? _args.height:HEIGHT,
        width: (_args.width) ? _args.width:WIDTH,
        left: (_args.left) ? _args.left:LEFT,
        top: (_args.top) ? _args.top:TOP,
        layout: 'horizontal',
        backgroundColor: 'white'
    });
    
    var width = (_args.width) ? _args.width:WIDTH,
    left = Ti.UI.createView({
        width: Math.round(0.25*width),
        height: view.height,
        backgroundColor: 'red',
    }),
    center = Ti.UI.createView({
        width: Math.round(0.5*width),
        height: view.height,
        backgroundColor: 'pink',
    }),
    right = Ti.UI.createView({
        width: Math.round(0.25*width),
        height: view.height,
        backgroundColor: 'red'
    });
    view.add(left);
    view.add(center);
    view.add(right);
    return view;
};
