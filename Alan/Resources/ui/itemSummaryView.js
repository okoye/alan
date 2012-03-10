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

exports.create = function(_args, sections, style){
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
            backgroundColor: '#dfdfdf',
        });
    };
    
    view.addEventListener('touchstart', function(e){
        view.backgroundColor = '#eeeeee'
    });
    
    view.addEventListener('touchend', function(e){
        view.backgroundColor = 'white'
    })
    
    var triplePartition = function(){        
        var left = Ti.UI.createView({
            width: Math.round(0.25*view.width) - 1,
            left: 0,
        }),
        middle = Ti.UI.createView({
            width: Math.round(0.5*view.width) - 2,
            left: left.width + 2,
        }),
        right = Ti.UI.createView({
            width: Math.round(0.25*view.width) - 1,
            right: 0,
        });
        
        var activity = Ti.UI.createLabel({
            color: style.color,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: 12,
                fontWeight: 'bold',
            },
            left: 2,
            right: 2
        });
        var distance = Ti.UI.createLabel({
            color: style.color,
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
            font: {
                fontSize: 42,
                fontWeight: 'bold',
            },
            left: 2,
            width: '68%',
        });
        var unit = Ti.UI.createLabel({
            color: style.color,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontSize: 12,
                fontWeight: 'bold'
            },
            right: 1,
            top: 20,
            width: '28%'
        });
        var moreInfo = Ti.UI.createButton({
            backgroundImage: style.buttonImage,
            height: 25,
            width: 12,
            left: Math.round(0.5*right.width)-2,
        });
        var content = function(act, dist, uni, _cb){
            dist = dist + '';
            (act) ? activity.setText(act):false;
            (dist) ? distance.setText(dist):distance.setText('');
            (uni) ? unit.setText(uni):unit.setText('');
            moreInfo.addEventListener('click', _cb||function(e){ log.info('NOOP'); });
        };
        var updateContent = function(cont){
            distance.setText(cont);
        };
        
        left.add(activity); middle.add(distance); middle.add(unit); right.add(moreInfo);
        view.add(left); view.add(divider(left.width+1)); view.add(middle); view.add(divider(middle.width+left.width+2)); view.add(right);
        container.content = content;
        container.updateContent = updateContent;
    };
    
    var doublePartition = function(){
        var left = Ti.UI.createView({
            width: Math.round(0.25*view.width) - 1,
            left: 0,
        }),
        right = Ti.UI.createView({
            width: Math.round(0.75*view.width) - 1,
            right: 0,
        });
        
        var title = Ti.UI.createLabel({
            color: style.color,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: 12,
                fontWeight: 'bold'
            },
            left: 2,
            right: 2
        });
        var summary = Ti.UI.createLabel({
            color: style.color,
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
            font: {
                fontSize: 42,
                fontWeight: 'bold'
            },
            width: Math.round(0.55*right.width),
            left: 0,
        });
        var unit = Ti.UI.createLabel({
            color: style.color,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontSize: 12,
                fontWeight: 'bold'
            },
            left: summary.width+2,
            right: 1,
            top: 20,
            width: Math.round(right.width*0.45),
        });
        
        var content = function(tit, sum, uni){
            sum = sum + '';
            (title) ? title.setText(tit):false;
            (sum) ? summary.setText(sum+''):summary.setText('');
            (uni) ? unit.setText(uni):false;
        };
        
        var updateContent = function(sum){
           summary.setText(sum); 
        };
        
        left.add(title); right.add(summary); right.add(unit);
        view.add(left); view.add(divider(left.width+1)); view.add(right);
        container.content = content;
    };
        
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