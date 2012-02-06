/**
 * @author Chuka Okoye
 * Creates the main Alan application window.
 */

var styling = require('lib/styles');
var myAnalytics = require('ui/youView');
var log = require('lib/logger');

//Constants
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;
var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var NUM_TABS = 4;

exports.createAlanWindow = function(_args){
    var win = Ti.UI.createWindow({
        exitOnClose: true,
        orientationModes: [Ti.UI.PORTRAIT],
    }),
    headerView = Ti.UI.iOS.createToolbar({  //TODO: Autochanging top label
         backgroundImage: 'images/top_nav.png',
         width: PLATFORM_WIDTH, 
    });
    footerView = Ti.UI.createView({
        bottom: 0,
        height: styling.tabHeight,
        backgroundImage: 'images/bottom_nav_bg_alan.png',
    }),
    tabWidth = PLATFORM_WIDTH/NUM_TABS,
    tabHeight = styling.tabHeight,
    tabs = [];
    log.debug('tabWidth is '+tabWidth);
    var bodyView = myAnalytics.createView();
    
    var createTab = function(_icon, _cb, _on){
        var view = Ti.UI.createView({
            width: 80,
            height: 45,
            borderRadius: 0,
            backgroundColor: 'white'
        }),
        inactive_image = _icon+'.png',
        active_image = _icon+'_current.png',
        icon = Ti.UI.createImageView({
            image: (_on) ? active_image : inactive_image,
        });
        view.on = _on||false;
        view.add(icon);
        view.addEventListener('click', _cb);
        view.toggle = function(){
            view.on = !view.on;
            icon.image = (view.on) ? active_image : inactive_image;
        };
        return view;
    };
    var changeTab = function(tabNo){
        for (var i=0, l = tabs.length; i < l; i++){
            if (tabNo === i){
                if(!tabs[i].on){
                    bodyView.fireEvent('alan:changeIndex', {index: i});
                    tabs[i].toggle();
                }
            }
            else if(tabs[i].on && (tabNo !== i)){
                tabs[i].toggle();
            }
        }
    };
    
    //Create main application tabs
    tabs.push(createTab('images/bottom_nav_btn_me', function(){
        changeTab(0);
    }, true));
    tabs.push(createTab('images/bottom_nav_btn_life_meter', function(){
        changeTab(1);
    }));
    tabs.push(createTab('images/bottom_nav_btn_rewards', function(){
        changeTab(2);
    }));
    tabs.push(createTab('images/bottom_nav_btn_settings', function(){
        changeTab(3);
    }));
    
    //Tabs to footer view
    for (var i=0; i<tabs.length; i++){
        tabs[i].left = tabWidth * i;
        footerView.add(tabs[i]);
        log.debug('Tab index added at: '+tabs[i].left);
    }
    
    //Generic method to change tab from whatever current view
    Ti.App.addEventListener('alan:changeTabs', function(e){
        changeTab(e.no);
    });
    win.add(headerView);
    win.add(bodyView);
    win.add(footerView);
    win.open();
};


