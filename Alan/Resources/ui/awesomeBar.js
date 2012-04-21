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
        layout: 'horizontal',
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
        backgroundColor: 'yellow'
    });
    
    
    //Setup Components
    //add title label here.
    var title = Ti.UI.createLabel({
        text: 'Title goes here',
        height: 18,
        top: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        color: container.style.color,
    }),
    
    valueLabel = Ti.UI.createLabel({
        text: '',
        height: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: container.style.color,
        opacity: (args.valueLabelEnabled) ? 1:0
    }),
    
    maxLabel = Ti.UI.createLabel({
        text: 'max label',
        height: 15,
        width: 45,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        color: '#b2b2b2',
        right: 0,
        font: {
            fontSize: 15,
            fontWeight: 'bold',
        },
        opacity: (args.maxLabelEnabled) ? 1:0,
    });
    
    //Message Handlers
    var _setMax = function(number){
        //Update max where ever necessary
        container.max = number;
        maxLabel.text = ''+number;
    };
    var _setValue = function(number, display){
        //Compute the percentage of value
        container.value = number;
        
        var width = (container.value/container.max) * fillParent.width;
        fillShell.width = width;
        
        if (width > 9  && width < 15){
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
        if (label){
            
        }
        else{
            valueLabel.show = false;
        }
        
        if (bars){
            fillShell.show = true;
            centerStretch.width = Math.ceil(fillShell.width - 6);
        }
        else{
            fillShell.show = false;
        }
        
    };
    var getMax = function(){ return container.max; };
    var getValue = function(){ return container.value; };
    
    
    container.myMax = _setMax;
    container.myValue = _setValue;
    
    _setValue(container.value);
    _setMax(container.max);
    //Add components and containers together
    fillShell.add(leftCap);
    fillShell.add(centerStretch);
    fillShell.add(rightCap);
    fillParent.add(maxLabel);
    fillParent.add(fillShell);
    fillContainer.add(fillParent);
    container.add(title);
    container.add(fillContainer);
    
    return container;
};

exports.create = barManager;