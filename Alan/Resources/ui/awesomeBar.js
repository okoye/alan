/**
 * @author Chuka Okoye
 * 
 * Our implementation of a progress bar
 */

var log = require('lib/logger');

var applyProperties = function(obj, properties){
    for(prop in properties)
        obj[prop] = properties[prop];
    return obj;
}

var barManager = function(args){
    var height = 30,
    width = 269, //Range: [0, 265]
    widthDelta = 4;
        
    //Setup Containers
    var container = Ti.UI.createView();
    container.height = height,
    container.width = width,
    container = applyProperties(container, args);
    
    var fillContainer = Ti.UI.createView({
        left: 0,
        width: container.width,
        height: 30,
        bottom: 0,
        backgroundImage: 'images/container.png',//Should hold background static pattern
    }),
    
    fillParent = Ti.UI.createView({ //Holds, the fillColor and Pattern
        left: 2,
        height: 27,
        top: 2,
        width: fillContainer.width - widthDelta,
        borderRadius: 1,
    }),
    
    fillShell = Ti.UI.createView({
        left: 0,
        height: fillParent.height,
        top: 0,
        width: 0,
    }),
    
    leftCap = Ti.UI.createView({
        width: 3,
        left: 0,
        backgroundImage: container.style.left,
        height: fillParent.height,
    }),
    
    rightCap = Ti.UI.createView({
        backgroundImage: container.style.right,
        width: 3,
        height: fillParent.height,
    }),
    
    centerStretch = Ti.UI.createView({
        backgroundImage: container.style.center,
        width: 20,
        height: fillParent.height,
        backgroundRepeat: true,
        left:3,
    });
    
    
    //Setup Components
    //add title label here.
    var title = Ti.UI.createLabel({
        text: (args.title) ? args.title:'',
        height: 13,
        top: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        color: container.style.color,
    }),
    
    valueLabel = Ti.UI.createLabel({
        text: '10000',
        height: 15,
        width: 45,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        color: 'white',
        opacity: (args.valueLabelEnabled) ? 1:0,
        right: 2,
        font: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        bottom: 2,
    }),
    
    maxLabel = Ti.UI.createLabel({
        text: '',
        height: 15,
        width: 45,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        color: '#b2b2b2',
        right: 2,
        font: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        opacity: (args.maxLabelEnabled) ? 1:0,
        bottom: 2,
    });
    
    //Message Handlers
    var _setMax = function(number){
        //Update max where ever necessary
        container.max = number;
        maxLabel.text = ''+number;
    };
    var _setValue = function(number, display){
        //Compute the percentage of value
        
        if (number > container.max)
            number = container.max;
        
        container.value = number;
        
        var width = (container.value/container.max) * fillParent.width;
        fillShell.width = width;
        
        if (width > 9  && width < 47){
            //Add bars but no label.
            _setBar(false, true);
        }
        else if(width < 9){
            //Dont add bars at all
            _setBar(false, false);
        }
        else{
            //Add bars and label
            _setBar(true, true);
        }
    };
    var _setBar = function(label, bars){
        if (label && args.valueLabelEnabled){
            valueLabel.opacity = 1;
        }
        else{
            valueLabel.opacity = 0;
        }
        
        if (bars){
            fillShell.show = true;
            centerStretch.width = Math.ceil(fillShell.width - 6);
            rightCap.left = centerStretch.width + leftCap.width;
        }
        else{
            fillShell.show = false;
        }
        
    };
    var _getMax = function(){ return container.max; };
    var _getValue = function(){ return container.value; };
    
    
    container.myMax = _setMax;
    container.myValue = _setValue;
    container.getMax = _getMax;
    container.getValue = _getValue;
    
    _setValue(container.value);
    _setMax(container.max);
    
    //Add components and containers together
    fillShell.add(leftCap);
    fillShell.add(centerStretch);
    fillShell.add(rightCap);
    fillShell.add(valueLabel);
    fillParent.add(maxLabel);
    fillParent.add(fillShell);
    fillContainer.add(fillParent);
    container.add(title);
    container.add(fillContainer);
    
    return container;
};

exports.create = barManager;