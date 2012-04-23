/**
 * @author Chuka Okoye
 * 
 * Item summary view containing detailed breakdown
 */

var log = require('lib/logger');
var aBar = require('ui/awesomeBar');

var WIDTH = 289,
LEFT = 20,
HEIGHT = 65,
TOP = 10;

var meteredSummary = function(properties, style){
    
    //Setup containers.
    var container = Ti.UI.createView({
        height: (properties.height) ? properties.height:HEIGHT,
        width: (properties.width) ? properties.width:WIDTH,
        left: (properties.left) ? properties.left:LEFT,
        top: (properties.top) ? properties.top:TOP,
    }),
    
    shadow = Ti.UI.createView({
        height: container.height,
        width: container.width,
        right: 0,
        bottom: -1,
        borderRadius: 1,
        backgroundColor: '#b1b1b1'
    }),
    
    background = Ti.UI.createView({
        height: container.height,
        width: container.width,
        left: 0,
        top: 0,
        backgroundColor: 'white',
        borderRadius: 1,
    }),
    
    view = Ti.UI.createView({
        height: container.height - 20,
        width: container.width - 20,
        left: 10,
        bottom: 10,
    });
   
    bar = aBar.create({
        bottom: 0,
        width: view.width,
        height: view.height,
        max: 200,
        value: 0,
        style: style,
        title: (properties.title) ? properties.title:'',
        maxLabelEnabled: (properties.maxLabelOn) ? true:false,
        valueLabelEnabled: (properties.valueLabelOn) ? true:false,
    });
    
    bar.myValue(70);
    //Data Handlers
    //TODO: wire up data handlers passed as an array.
    var _setMax = function(max){
        bar.myMax(max);
    };
    
    var _setValue = function(num, label){
        bar.myValue(num, label);
    };
    
    container.myMax = _setMax;
    container.myValue = _setValue;
    
    //Join containers and components
    view.add(bar);
    container.add(shadow);
    container.add(background);
    container.add(view);
    return container;
};

var messageSummary = function(properties, style){
    
    //Setup containers
    var container = Ti.UI.createView({
        height: (properties.height) ? properties.height:HEIGHT,
        width: (properties.width) ? properties.width:WIDTH,
        left: (properties.left) ? properties.left:LEFT,
        top: (properties.top) ? properties.top:TOP,
    }),
    
    shadow = Ti.UI.createView({
        height: container.height,
        width: container.width,
        right: 0,
        bottom: -1,
        borderRadius: 1,
        backgroundColor: '#b1b1b1'
    }),
    
    background = Ti.UI.createView({
        height: container.height,
        width: container.width,
        left: 0,
        top: 0,
        backgroundColor: 'white',
        borderRadius: 1,
    }),
    
    view = Ti.UI.createView({
        height: container.height - 20,
        width: container.width - 20,
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
    }),
    
    left = Ti.UI.createView({
        width: Math.round(0.25*view.width) - 1,
        left: 0
    }),
    
    right = Ti.UI.createView({
        width: Math.round(0.75*view.wdith) - 1,
        right: 0
    });
    
    //Setup components
    var icon = Ti.UI.createImageView({
        image: '',
        width: 50,
        height: 50,
        right: 0,
    }),
    
    text = Ti.UI.createLabel({
        color: style.color,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 25,
            fontWeight: 'bold',
        },
    });
    
    //Data handlers
    var _content = function(image, info, astyle){
        if (image){
            icon.image = image;
            icon.width = 50;
            icon.height = 50;
        }
        text.color = astyle.color;
        text.text = info;
    };
    
    //Join containers and components
    container.content = _content;
    left.add(icon);
    right.add(text);
    view.add(left);
    view.add(right);
    container.add(shadow);
    container.add(background);
    container.add(view);
    return container;
}

exports.create = function(_args, type, style){
    if (type === 'messageSummary')
        return messageSummary(_args, style);
    else if (type === 'meteredSummary')
        return meteredSummary(_args, style);
};