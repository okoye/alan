/**
 * @author Chuka Okoye
 */

//Requires
var styling = require("lib/styles");
var log = require("lib/logger");
var account = require("lib/account");
var manager = require("lib/manager");
var alan = require('ui/alanWindow');

//Module state variables
var local = {};
local.nav_control = {};

//TODO: cleanup and refactor with app.js

//Internal functions
local.GettingStarted = function(args) {
	log.info('Creating getting started window');
	
	var base_win = Ti.UI.createWindow({backgroundColor: 'white'});
	var nav_root_win = Ti.UI.createWindow(styling.nav_window({title:'Getting Started'}));
	var nav = Ti.UI.iPhone.createNavigationGroup({window: nav_root_win});
	
	base_win.add(nav);
		
	var center_height = Ti.Platform.displayCaps.platformHeight - nav.getHeight();
	var center_view0 = Ti.UI.createImageView(styling.tutorial_centerview({image: 'images/step1.png'}));
	var center_view1 = Ti.UI.createImageView(styling.tutorial_centerview({image: 'images/step2.png'}));
	var center_view2 = Ti.UI.createImageView(styling.tutorial_centerview({image: 'images/step3.png'}));
	var bottom_view = Ti.UI.createView(styling.nav_bottomview());
	var center_scrollview = Ti.UI.createScrollableView(styling.tutorial_scrollview({
		views: [center_view0, center_view1, center_view2],
		showPagingControl: true,
		height: center_height,
	}));
	var continue_button = Ti.UI.createButton(styling.continue_button({backgroundImage: 'images/continue_btn.png'}));
	nav_root_win.add(center_scrollview);
	nav_root_win.add(bottom_view);
	bottom_view.add(continue_button);
	
	continue_button.addEventListener("click", function(evt){
		log.info("Creating 'new account/login' dialog");
		var choice_dialog = Ti.UI.createOptionDialog({
			options: ['Create Account', 'Existing Account', 'Cancel'],
			cancel: 2,
		});
		
		choice_dialog.addEventListener('click', function(evt){
			switch(evt.index){
				case 0:
					log.info('Choice dialog is executing CreateAccount action')
					local.CreateAccount();
					break;
				case 1:
					log.info('Choice dialog is executing Login action')
					local.Login();
					break;
				default:
					log.info('Choice dialog is executing default action (cancel)');
					break;
			}
		});
		choice_dialog.show();
	});
	local.nav_control = nav;
	return base_win;
};

local.Alan = function(args) {
	log.info('Now executing Alan');
	alan.createAlanWindow();
};

local.CreateAccount = function(args) {
	log.info('Creating create account window');
	var create_account_window = Ti.UI.createWindow(styling.nav_window({
		title: 'Create Account',
		layout: 'vertical'
	}));
	var center_view = Ti.UI.createView(styling.nav_centerview({layout: 'vertical'}));
	var footer_view = Ti.UI.createView(styling.nav_bottomview());
	var continue_button = Ti.UI.createButton(styling.continue_button());
	var logo = Ti.UI.createImageView({
	    image: 'images/logo.png',
	    top: 45,
	    height: 45,
	    width: 92
	});
	var email = Ti.UI.createTextField(styling.text_field({
		top: 10,
		hintText: 'Email',
		backgroundColor: 'grey',
		borderRadius: 1,
	}));
	var password = Ti.UI.createTextField(styling.text_field({
		top: 10,
		passwordMask: true,
		hintText: 'Password',
		borderRadius: 1,
	}));
	center_view.add(logo);
	center_view.add(email);
	center_view.add(password);
	footer_view.add(continue_button);
	create_account_window.add(center_view);
	create_account_window.add(footer_view);
	local.nav_control.open(create_account_window, {animated:true});
	
	continue_button.addEventListener('click', function(evt){
		log.info('Submitting account credentials for new account');
		 var acc = new account.Account(email.value, password.value, function(response){
			if (response.status == "success"){
				acc.saveCredentials();
				Ti.App.Properties.setBool('instantiated', true);
				local.Alan();
			}else{
				log.debug(JSON.stringify(response));
				alert(response.message);
			}
		});
	});
};

local.Login = function(args) {
	log.info('Creating login window');
};

exports.AppWindow = function(args){
	var win;
	if (!Ti.App.Properties.getBool('instantiated', false)){
		win = local.GettingStarted(args);
		win.open();
	} else{
		local.Alan(args);
	}
};

exports.TrainWindow = function(args){
	log.info('Creating train window');
	var mgt = new manager.Manager({
            training: true
    });
	var done = "Close the application and go about normal. It will work in the background learning what walking, running, sitting, etc...is";
	var thanks = "Thank you again\n -Alan";
	var train_window = Ti.UI.createWindow({
		backgroundColor: 'white',
		backgroundImage: 'images/center_view_bg.png',
		layout: 'vertical'
	});
	
	var logo = Ti.UI.createImageView({
		image: 'images/logo.png',
		top: 45,
		height: 45,
		width: 92
	});
	
	var text0 = Ti.UI.createLabel({
		font: {fontSize: 14, fontFamily: 'DroidSans'},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	
	var text1 = Ti.UI.createLabel({
		//opacity: 0,
		text: 'Thank you for coming this far. We are glad you can take part in the development process of an amazing app, Alan.',
		top: 19,
		height: 55,
		width: 275,
		font: {fontSize: 14, fontFamily: 'Arial'},
		color: '#777',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	
	var text2 = Ti.UI.createLabel({
		text: 'This test App is to train our learning algorithms to be more accurate. Smarter the algorithm, better the App.',
		top: 10,
		height: 55,
		width: 275,
		font: {fontSize: 14, fontFamily: 'Arial'},
		color: '#777',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	
	var bottom_container = Ti.UI.createView(styling.nav_bottomview());
	var body_container = Ti.UI.createView({
		backgroundImage: 'images/center_view_bg.png',
		height: 410,
		layout: 'vertical',
	})
	var start_button = Ti.UI.createButton(styling.continue_button({backgroundImage: 'images/start_btn.png'}));
	var close_button = Ti.UI.createButton(styling.continue_button({backgroundImage: 'images/close_btn.png'}));
	bottom_container.add(start_button);
	body_container.add(logo);
	body_container.add(text0);
	body_container.add(text1);
	body_container.add(text2);
	train_window.add(body_container);
	train_window.add(bottom_container);
	
	//Event handler routines.
	start_button.addEventListener('click', function(evt){
		if(mgt.start())
		{
			text0.top = 19;
			text0.height = 10;
			text0.width = 92;
			text0.color = '#777';
			text0.text = "DONE!";
			text1.text = done;
			text2.text = thanks;
			bottom_container.remove(start_button);
			bottom_container.add(close_button);
		}
	});
	close_button.addEventListener('click', function(evt){
		Ti.Platform.openURL('http://www.alanapp.com');
	});
	
	train_window.open();
	
};
