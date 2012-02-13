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

exports.create = function(_args, _cb){
    var view = Ti.UI.createView({
        height: (_args.height) ? _args.height:HEIGHT,
        width: (_args.width) ? _args.width:WIDTH,
        left: (_args.left) ? _args.left:LEFT,
        top: (_args.top) ? _args.top:TOP,
        layout: 'horizontal',
        backgroundColor: 'white',
        borderRadius: 3
    });
    
    shadows.Shadow(view, {
        shadowRadius: 10,
        shadowOpacity: 0.9,
        shadowOffset: {x: 10, y:10}
    });
    
    //Now, create containers for the three subsections
    var width = (_args.width) ? _args.width:WIDTH,
    left = Ti.UI.createView({
        width: Math.round(0.25*width),
        height: view.height,
        opacity: 0.5,
    }),
    center = Ti.UI.createView({
        width: Math.round(0.5*width),
        height: view.height,
        opacity: 0.5,
    }),
    right = Ti.UI.createView({
        width: Math.round(0.25*width),
        height: view.height,
        opacity: 0.5,
    });
    
    //Title of this container, retrieved from _args.conf.title
    var title = (_args.conf) ? _args.conf.title:'UNKNOWN',
    //Content of this container, retrieved from _args.conf.content
    content = (_args.conf) ? _args.conf.content:'0';
    
    var label = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: (_args.style) ? _args.style.color:'black',
        text: title,
        font: {
            fontSize: 10,
            fontWeight: 'bold'
        },
    });
    left.add(label);
    var body = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: (_args.style) ? _args.style.color:'black',
        text: content,
        font: {
            fontSize: 10,
            fontWeight: 'bold'
        },
    });
    center.add(body);
    
    var more = Ti.UI.createButton({
        backgroundImage: '',//TODO
        height: right.height - 2,
        width: right.width - 4,
    });
    more.addEventListener('click', _cb||function(e){log.info('NOOP')});
    right.add(more);
    
    view.add(left);
    view.add(center);
    view.add(right);
    return view;
};
exports.STYLES = {
    GREEN: {
        color: 'green',
        image: ''//TODO
    },
    BLUE: {
        color: 'blue',
        image: ''//TODO
    },
    RED: {
        color: 'red',
        image: ''//TODO
    },
    PURPLE: {
        color: 'purple',
        image: ''//TODO
    },
};
