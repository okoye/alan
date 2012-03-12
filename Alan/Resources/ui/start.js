/*
 * @author Chuka Okoye
 * 
 * Main start point for a brand new installation.
 */

var log = require('lib/logger');
var account = require('model/account');
var alan = require('ui/alanWindow');

exports.gettingStarted = function(){
    log.info('...Getting Started');
    
    var base_win = Ti.UI.createWindow({
        backgroundColor: 'white',
    });
    var nav_root_win = Ti.UI.createWindow({
        backButtonTitle: 'Back',
        layout: 'vertical',
        backgroundImage: 'images/top_nav.png',
        title: 'Getting Started'
    });
    var nav = Ti.UI.iPhone.createNavigationGroup({
        window: nav_root_win
    });
    
    base_win.add(nav);
    var center_view_height = 244, center_view_width = 352;
    
    var center_view0 = Ti.UI.createImageView({
        image: 'images/step1.png',
        backgroundColor: 'white',
        height: center_view_height,
        width: center_view_width,
    });
    var center_view1 = Ti.UI.createImageView({
        image: 'images/step2.png',
        backgroundColor: 'white',
        height: center_view_height,
        width: center_view_width,
    });
    var center_view2 = Ti.UI.createImageView({
        image: 'images/step3.png',
        backgroundColor: 'white',
        height: center_view_height,
        width: center_view_width,
    });
    var bottom_view = Ti.UI.createView({
        backgroundColor: 'white',
        height: 50,
        backgroundImage: 'images/bottom_nav_bg.png',
        layout: 'absolute',
    });
    var center_scrollview = Ti.UI.createScrollableView({
        views: [center_view0, center_view1, center_view2],
        showPagingControl: true,
        height: 244, //check for errs
        pagingControlColor: 'transparent',
        pagingControlOpacity: 1,
        pagingControlHeight: 43,
        backgroundImage: 'images/center_view_bg.png',
    });
    var continue_button = Ti.UI.createButton({
        width: 172,
        height: 41,
        borderRadius: 5,
        top: 4.5,
        backgroundImage: 'images/continue_btn.png',
    });
    nav_root_win.add(center_scrollview);
    nav_root_win.add(bottom_view);
    bottom_view.add(continue_button);
    
    continue_button.addEventListener("click", function(evt){
        var choice_dialog = Ti.UI.createOptionDialog({
            options: ['Create Account', 'Existing Account', 'Cancel'],
            cancel: 2,
        });
        
        choice_dialog.addEventListener('click', function(evt){
            switch(evt.index){
                case 0:
                    log.info('Creating new account');
                    createAccount();
                    break;
                case 1:
                    log.info('Logging in existing user');
                    logIn();
                    break;
                case 2:
                    log.info('NO-OP login or create account');
                    break;
            }
        });
        choice_dialog.show();
    });
    base_win.open();
};

exports.alan = function(){
    alan.createAlanWindow();
};

var createAccount = function(){
    //TODO It should go through the process of gathering account information,
    //health information and other data and store in account model.
};

var logIn = function(){
    
};
