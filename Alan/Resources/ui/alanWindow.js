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
        barImage: 'images/top_nav.png',
    }),
    tabHeight = 50,
    footerView = Ti.UI.createView({
        bottom: 0,
        height: tabHeight,
        backgroundImage: 'images/bottom_nav_bg_alan.png',
    }),
    tabWidth = PLATFORM_WIDTH/NUM_TABS,
    tabs = [];
    var settingsButton = Ti.UI.createButton({
        backgroundImage: 'images/top_nav_btn_settings.png'
    });
    var settingsContainer = Ti.UI.createView({
        width: 40,
        height: 33
    });
    settingsContainer.add(settingsButton);
    var viewArray = [
        meView.create(),
        scoreView.create(),
        pvpView.create(),
        storeView.create(),
        settingsView.create(),
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
    var headerUpdate = function(_title){
        (_title) ? dummyTab.title = _title : dummyTab.title = "";        
    };
    
    //Create main application tabs
    tabs.push(createTab('images/bottom_nav_btn_me', function(){
        changeTab(0);
        bodyView.updateStrip(0);
        headerUpdate('Me');
    }, true));
    tabs.push(createTab('images/bottom_nav_btn_act_age', function(){
        changeTab(1);
        bodyView.updateStrip(1);
        headerUpdate('Activity Age');
    }));
    tabs.push(createTab('images/bottom_nav_btn_connect', function(){
        changeTab(2);
        bodyView.updateStrip(2);
        headerUpdate('Connect');
    }));
    tabs.push(createTab('images/bottom_nav_btn_addon', function(){
        changeTab(3);
        bodyView.updateStrip(3);
        headerUpdate('Add-ons');
    }));
    
    //Tabs to footer view
    for (var i=0; i<tabs.length; i++){
        tabs[i].left = tabWidth * i;
        footerView.add(tabs[i]);
    }
        
    win.add(bodyView);
    win.add(footerView);
    win.rightNavButton = settingsContainer;
    
    //Setup tabgroup
    tabGroup.addTab(dummyTab);
    tabGroup.setActiveTab(0);
    
    //Start various controllers
    meController.start(viewArray[0]);
    
    //HACK to fire and update first tab info.
    tabs[0].fireEvent('click', {source: 'synthesized event'});
    
    //pull up settings window when clicked
    settingsContainer.addEventListener('touchstart', function(evt){
        settingsButton.backgroundImage = 'images/top_nav_btn_settings_current.png';
        headerUpdate('Settings');
        changeTab(-1);
        bodyView.updateStrip(4);
    });
    settingsContainer.addEventListener('touchend', function(evt){
        settingsButton.backgroundImage = 'images/top_nav_btn_settings.png';
    });
    
    //Start collection manager.
    mgt = new manager.Manager();
    
    //Initialize collection and processing systems.
    if (mgt.start())    
        tabGroup.open();
};


