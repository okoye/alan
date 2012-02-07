/**
 * @author Chuka Okoye
 * Creates the main Alan application window.
 */

var styling = require('lib/styles');
var myAnalytics = require('ui/analyticsView');
var log = require('lib/logger');
var imageView = require('com.obscure.imageview_ex');

//Constants
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;
var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var NUM_TABS = 4;

exports.createAlanWindow = function(_args){
    var win = Ti.UI.createWindow({
        exitOnClose: true,
        orientationModes: [Ti.UI.PORTRAIT],
    }),
    headerHeight = 45,
    headerView = Ti.UI.createView(),
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
        headerView.backgroundImage = 'images/top_nav.png';
        headerView.height = headerHeight;
        headerView.top = 0;
        headerView.width = PLATFORM_WIDTH;
        headerView.titles = {
            0: 'Alan',
            1: 'Death Clock',
            2: 'Comparison',
            3: 'Settings'
        };
        
        var titleLabel = Ti.UI.createLabel({
            text: headerView.titles[0],
            color: '#fff',
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            height: 'auto',
            width: 'auto',
            font: {fontFamily: 'Arial', fontSize: 18},
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
    
    //Tabs to footer view
    for (var i=0; i<tabs.length; i++){
        tabs[i].left = tabWidth * i;
        footerView.add(tabs[i]);
    }
    
   
    win.add(updateHeader());
    win.add(bodyView);
    win.add(footerView);
    win.open();
};


