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

exports.create = function(_args, sections, style, _cb){
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
    
    var divider = function(_left){
        return Ti.UI.createImageView({
            height: view.height - 4,
            width: 1,
            top: 2,
            left: _left,
            backgroundColor: '#b1b1b1',
        });
    }
    
    var triplePartition = function(){        
        var left = Ti.UI.createView({
            width: Math.round(0.25*view.width) - 1,
            left: 0,
            opacity: 0.5,
        }),
        middle = Ti.UI.createView({
            width: Math.round(0.5*view.width) - 2,
            left: left.width + 2,
        }),
        right = Ti.UI.createView({
            width: Math.round(0.25*view.width) - 1,
            right: 0,
            opacity: 0.5,
        });
        
        var activity = Ti.UI.createLabel({
            color: style.color,
            font: {
                fontSize: 20,
                fontWeight: 'bold',
            }
        });
        var distance = Ti.UI.createLabel({
            color: style.color,
            font: {
                fontSize: 20,
                fontWeight: 'bold',
            }
        });
        var moreInfo = Ti.UI.createButton({
            backgroundImage: style.buttonImage,
            height: right.height,
            width: right.width,
        });
        
        left.add(activity); middle.add(distance); right.add(moreInfo);
        view.add(left); view.add(divider(left.width+1)); view.add(middle); view.add(divider(middle.width+left.width+2)); view.add(right);
    };
    
    var doublePartition = function(){
        var title = Ti.UI.createLabel({
            color: style.color,
            font: {
                fontSize: 20,
                fontWeight: 'bold'
            }
        });
        var summary = Ti.UI.createLabel({
            color: style.color,
            font: {
                fontSize: 20,
                fontWeight: 'bold'
            }
        });
    };
    
    //TODO: add function to set content
    
    if (sections === 2){
        doublePartition();
    }
    else if(sections === 3){
        triplePartition();
    }
    
    container.add(viewShadow);
    container.add(view);
    return container;
};