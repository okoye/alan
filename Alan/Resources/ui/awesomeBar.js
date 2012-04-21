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
    width = 269, //Range: [0, 265]
    
    min = (args.min) ? args.min:0, 
    max = (args.max) ? args.max:100,
    value = (args.value) ? args.value:0
        
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
        width: fillContainer.width - 4,
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
        backgroundImage: container.style.left, //TODO: left cap image, determined by style
        height: fillParent.height,
    }),
    
    rightCap = Ti.UI.createView({
        backgroundImage: container.style.right,//TODO right cap image, determined by style
        width: 3,
        height: fillParent.height,
    }),
    
    centerStretch = Ti.UI.createView({
        backgroundImage: container.style.center, //TODO: stretchy component., determined by style
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
        color: container.style.color, //TODO: should be according to style
    });
    
    //Message Handlers
    var setMax = function(number){
        //Update max where ever necessary
        container.max = number;
    };
    var setValue = function(number){
        //Compute the percentage of value
        container.value = number;
        
        var width = (container.value/container.max) * 100;
        fillShell.width = width + '%';
        
        if (width > 9  && width < 15){
            //Add bars but no label.
            setBar(false, true);
        }
        else if(width < 9){
            //Dont add bars at all
            setBar(false, false);
        }
        else{
            //Add bars and label
            setBar(true, true);
        }
    };
    var setBar = function(label, bars){
        if (label){
            
        }
        
        if (bars){
            
        }
        
    };
    var getMax = function(){ return container.max; };
    var getValue = function(){ return container.value; };
    
    
    container.setMax = setMax;
    container.setValue = setValue;
    container.setBar = setBar;
    
    setValue(container.value);
    
    //Add components and containers together
    fillShell.add(leftCap);
    fillShell.add(centerStretch);
    fillShell.add(rightCap);
    fillParent.add(fillShell);
    fillContainer.add(fillParent);
    container.add(title);
    container.add(fillContainer);
    
    return container;
};

exports.create = barManager;