/**
 * @author Chuka Okoye
 * 
 * Summary view containing 24 chart
 */

var log = require('lib/logger');

exports.create = function(_args){
    var view = Ti.UI.createWebView({
        dataCache : [],
        height: (_args.height) ? _args.height:170,
        width: (_args.width) ? _args.width:170,
        left: (_args.left) ? _args.left: 20,
        top: (_args.top) ? _args.top: 10,
        backgroundColor: 'white',
        keepScreenOn: false,
        scalePageToFit: true,
        borderRadius: 1,
    });
    
    var _onData = function(e){
        //TODO add logic for if view is active, animate new data.
        log.debug('On Data view called');
    };
    
    var _onFocus = function(e){
        //TODO add logic for when view gains focus after being hidden
        log.debug('On Focus view called');  
    };
    
    view.addEventListener('alan:newActivityReport', _onData);
    Ti.App.addEventListener('alan:changeBody', _onFocus); //FIXME: switch to me specific event.
    return view;
};
