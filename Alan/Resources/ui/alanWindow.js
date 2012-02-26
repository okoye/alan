/**
 * @author Chuka Okoye
 * Creates the main Alan application window.
 */
var log = require('lib/logger');
var manager = require('lib/manager');

//views
var stripView = require('ui/stripView');
var meView = require('ui/meView');
var scoreView = require('ui/scoreView');
var pvpView = require('ui/pvpView');
var storeView = require('ui/storeView');
var settingsView = require('ui/settingsView');

//controllers
var meController = require('controller/meController');

//Constants
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;
var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var NUM_TABS = 4;

exports.createAlanWindow = function(_args){
    var win = Ti.UI.createWindow({
        tabBarHidden: true,
        barImage: 'images/top_nav.png'
    }),
    tabHeight = 50,
    footerView = Ti.UI.createView({
        bottom: 0,
        height: tabHeight,
        backgroundImage: 'images/bottom_nav_bg_alan.png',
    }),
    tabWidth = PLATFORM_WIDTH/NUM_TABS,
    tabs = [];
    var viewArray = [
        meView.create(),
        scoreView.create(),
        pvpView.create(),
        storeView.create(),
    ];
    var bodyView = stripView.create({
        views : viewArray,
        width : PLATFORM_WIDTH,
        height : 425,
    });
    var tabGroup =Ti.UI.createTabGroup();
    var dummyTab = Ti.UI.createTab({
        window: win,
    });
    var createTab = function(_icon, _cb, _on){
        var view = Ti.UI.createView({
            width: tabWidth,
            height: tabHeight,
        }),
        inactive_image = _icon+'.png',
        active_image = _icon+'_current.png',
        icon = Ti.UI.createImageView({
            image: (_on) ? active_image : inactive_image,
            left: 0,
            contentMode: 'aspectFit',
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
                    tabs[i].toggle();
                }
            }
            else if(tabs[i].on && (tabNo !== i)){
                tabs[i].toggle();
            }
        }
    };    
    var headerUpdate = function(_leftNav, _rightNav, _title){
        (_title) ? dummyTab.title = _title : dummyTab.title = "";
        
    };
    //Create main application tabs
    tabs.push(createTab('images/bottom_nav_btn_me', function(){
        changeTab(0);
        bodyView.updateStrip(0);
        headerUpdate(0);
    }, true));
    tabs.push(createTab('images/bottom_nav_btn_act_age', function(){
        changeTab(1);
        bodyView.updateStrip(1);
        headerUpdate(1);
    }));
    tabs.push(createTab('images/bottom_nav_btn_connect', function(){
        changeTab(2);
        bodyView.updateStrip(2);
        headerUpdate(2);
    }));
    tabs.push(createTab('images/bottom_nav_btn_addon', function(){
        changeTab(3);
        bodyView.updateStrip(3);
        headerUpdate(3);
    }));
    
    //Tabs to footer view
    for (var i=0; i<tabs.length; i++){
        tabs[i].left = tabWidth * i;
        footerView.add(tabs[i]);
    }
        
    win.add(bodyView);
    win.add(footerView);
    
    //Setup tabgroup
    tabGroup.addTab(dummyTab);
    
    //Start various controllers
    meController.start(viewArray[0]);
    
    //Start collection manager.
    mgt = new manager.Manager();
    
    //Initialize collection and processing systems.
    if (mgt.start())    
        tabGroup.open();
};


