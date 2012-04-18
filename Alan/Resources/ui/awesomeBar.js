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
        backgroundColor: 'red',
        height: '60%',
        bottom: 0,
    }),
    
    fillParent = Ti.UI.createView({
        left: 4,
        right: 4,
        height: '100%',
        width: '98%',
        backgroundColor: 'pink'
    }),
    
    fillColor = Ti.UI.createView({
        width: '10%',
        backgroundColor: 'brown', //TODO should be according to style
        height: '100%',
        left: 0,
    }),
    
    fillPattern = Ti.UI.createView({
        width: '10%',
        opacity: 0.2,
        height: '100%',
        backgroundColor: 'yellow',
        left: 0,
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
    
    
    
    //Add components and containers together
    fillParent.add(fillColor);
    fillParent.add(fillPattern);
    fillContainer.add(fillParent);
    container.add(title);
    container.add(fillContainer);
    
    return container;
};

exports.create = barManager;