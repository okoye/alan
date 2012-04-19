/**
 * @author Chuka Okoye
 * 
 * Our implementation of a progress bar
 */

var applyProperties = function(obj, properties){
    for(prop in properties)
        obj[prop] = properties[prop];
    return obj;
}

var barManager = function(args){
    var height = 30,
    
    min = (args.min) ? args.min:0, 
    max = (args.max) ? args.max:100,
    value = (args.value) ? args.value:0
        
    //Setup Containers
    var container = Ti.UI.createView();
    container.height = height,   
    container = applyProperties(container, args);
    
    var fillContainer = Ti.UI.createView({
        left: 0,
        width: '100%',
        height: '60%',
        bottom: 0,
        backgroundImage: '',//Should hold background static pattern
    }),
    
    fillParent = Ti.UI.createView({ //Holds, the fillColor and Pattern
        left: 4,
        right: 4,
        height: '100%',
        width: '98%',
        borderWidth: 1,
    }),
    
    fillColor = Ti.UI.createView({
        width: '0%',
        backgroundColor: 'brown', //TODO should be according to style
        height: '100%',
        left: 0,
        opacity: 0.1
    }),
    
    fillPattern = Ti.UI.createView({ //Container for strechy pattern and caps
        width: '0%',
        height: '100%',
        backgroundColor: 'yellow',
        left: 0,
        layout: 'horizontal',
    }),
    
    leftCap = Ti.UI.createView({
        backgroundColor: 'grey',
        width: 2,
        backgroundImage: '', //TODO: left cap image
        height: '100%'
    }),
    
    rightCap = Ti.UI.createView({
        backgroundColor: 'red',
        backgroundImage: '',//TODO right cap image
        width: 2,
        height: '100%',
    }),
    
    centerStretch = Ti.UI.createView({
        backgroundColor: 'blue',
        backgroundImage: '', //TODO: stretchy component.
        width: 2,
        height: '100%',
        backgroundRepeat: true,
    });
    
    
    //Setup Components
    //add title label here.
    var title = Ti.UI.createLabel({
        text: 'Title goes here',
        height: 20,
        top: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 15,
            fontWeight: 'bold',
        },
        color: 'blue', //TODO: should be according to style
    });
    
    //Message Handlers
    var setMax = function(number){
        //Update max where ever necessary
        container.max = number;
    };
    var setValue = function(number){
        //Compute the percentage of value
        container.value = number;
    };
    var setBar = function(number){
        //If no is supplied use it otherwise, update using new state vars.
        if (number){
            container.value = number;
        }
        
        var width = (container.value/container.max) * 100;
        
        if (width > 4 && width < 10){
           fillPattern.width = width+'%';
           fillColor.width = width+'%';
        }
        else if (width < 4){
            //Do nothing
        }
        else{ //Very wide
            fillPattern.width = width+'%';
            fillColor.width = width+'%';
        }
    };
    var getMax = function(){ return container.max; };
    var getValue = function(){ return container.value; };
    
    
    container.setMax = setMax;
    container.setValue = setValue;
    container.setBar = setBar;
    
    setBar(container.value);
    
    //Add components and containers together
    fillPattern.add(leftCap);
    fillPattern.add(centerStretch);
    fillPattern.add(rightCap);
    fillParent.add(fillPattern);
    fillParent.add(fillColor);
    fillContainer.add(fillParent);
    container.add(title);
    container.add(fillContainer);
    
    return container;
};

exports.create = barManager;