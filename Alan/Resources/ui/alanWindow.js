/**
 * @author Chuka Okoye
 * Creates the main Alan application window.
 */
var log = require('lib/logger');
var imageView = require('com.obscure.imageview_ex');
var stripView = require('ui/stripView');
var meView = require('ui/meView');
var scoreView = require('ui/scoreView');
var pvpView = require('ui/pvpView');
var storeView = require('ui/storeView');
var settingsView = require('ui/settingsView');

//Constants
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;
var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var NUM_TABS = 5;

exports.createAlanWindow = function(_args){
    var win = Ti.UI.createWindow({
        exitOnClose: true,
        orientationModes: [Ti.UI.PORTRAIT],
    }),
    headerView = Ti.UI.createView({
        backgroundImage : 'images/top_nav.png',
        height : 45,
        top : 0,
        width: PLATFORM_WIDTH,
    }),
    footerView = Ti.UI.createView({
        bottom: 0,
        height: 45,
        backgroundImage: 'images/bottom_nav_bg_alan.png',
    }),
    tabWidth = PLATFORM_WIDTH/NUM_TABS,
    tabHeight = 45,
    tabs = [];
    
    var bodyView = stripView.create({
        views : [
            meView.create({
                height: PLATFORM_HEIGHT - (footerView.height + headerView.height)
            }),
            scoreView.create(),
            pvpView.create(),
            storeView.create(),
            settingsView.create()
        ],
        width : PLATFORM_WIDTH,
        height : PLATFORM_HEIGHT - 90,
    });
    
    var createTab = function(_icon, _cb, _on){
        var view = Ti.UI.createView({
            width: tabWidth,
            height: tabHeight,
        }),
        inactive_image = _icon+'.png',
        active_image = _icon+'_current.png',
        icon = imageView.createImageView({
            image: (_on) ? active_image : inactive_image,
            left: 0,
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
                    bodyView.fireEvent('alan:changeBody', {no: i});
                    headerView.fireEvent('alan:changeTitle', {no: i});
                    tabs[i].toggle();
                }
            }
            else if(tabs[i].on && (tabNo !== i)){
                tabs[i].toggle();
            }
        }
    };
    
    //Add callbacks, text and other elements to headerview.
    var updateHeader = function(){
        headerView.titles = {
            0: 'Alan',
            1: 'Health Scoring',
            2: 'Me vs Others',
            3: 'Store',
            4: 'Settings'
        };
        
        var titleLabel = Ti.UI.createLabel({
            text: headerView.titles[0],
            color: '#fff',
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            height: 'auto',
            width: 'auto',
            font: {fontFamily: 'Arial', fontSize: 20, fontWeight: 'bold'},
            shadowColor: '#4e869c',
            shadowOffset: {x:-1, y:-1}
        });
        
        headerView.add(titleLabel);
        
        headerView.addEventListener('alan:changeTitle', function(e){
            titleLabel.text = headerView.titles[e.no];
        });
        return headerView;
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
    tabs.push(createTab('images/bottom_nav_btn_settings', function(){
        changeTab(4);
    }));
    
    //Tabs to footer view
    for (var i=0; i<tabs.length; i++){
        tabs[i].left = tabWidth * i;
        footerView.add(tabs[i]);
    }
    
    //Set header view will necessary callbacks
    updateHeader();
    
    win.add(headerView);
    win.add(bodyView);
    win.add(footerView)
;    win.open();
};


