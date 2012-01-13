/**
 * @author Chuka Okoye
 */

//Requires
var styling = require("lib/styles");
var log = require("lib/logger");
var account = require("lib/account");

//Module state variables
var local = {};
local.nav_control = {};


//Internal functions
local.GettingStarted = function(args) {
	log.info('Creating getting started window');
	
	//TODO: Refactor Navigation window code to avoid repetitions.
	var base_win = Ti.UI.createWindow({backgroundColor: 'white'});
	var nav_root_win = Ti.UI.createWindow(styling.nav_window({title:'Getting Started'}));
	var nav = Ti.UI.iPhone.createNavigationGroup({window: nav_root_win});
	
	base_win.add(nav);
		
	var center_height = Ti.Platform.displayCaps.platformHeight - nav.getHeight();
	var center_view0 = Ti.UI.createImageView(styling.tutorial_centerview({image:'images/iphone/step1.png'}));
	var center_view1 = Ti.UI.createImageView(styling.tutorial_centerview({image:'images/iphone/step2.png'}));
	var center_view2 = Ti.UI.createImageView(styling.tutorial_centerview({image:'images/iphone/step3.png'}));
	var bottom_view = Ti.UI.createView(styling.nav_bottomview());
	var center_scrollview = Ti.UI.createScrollableView(styling.tutorial_scrollview({
		views: [center_view0, center_view1, center_view2],
		showPagingControl: true,
		height: center_height,
	}));
	var continue_button = Ti.UI.createButton(styling.continue_button({backgroundImage: 'images/iphone/continue_btn.png'}));
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
			log.info('Event details '+evt.button+' || '+evt.index);
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

local.You = function(args) {
	log.info('Creating you window');
	return Ti.UI.createWindow({backgroundColor: 'white'});
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
	var email = Ti.UI.createTextField(styling.text_field({
		top: 60,
		hintText: 'Email',
		backgroundColor: 'grey'
	}));
	var password = Ti.UI.createTextField(styling.text_field({
		top: 70,
		passwordMask: true,
		hintText: 'Password',
	}));
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
				local.You();
			}else{
				log.debug(JSON.stringify(response));
				alert(response.message);
			}
		});
	});
};

local.Login = function(args) {
	log.info('Creating login window');
}

exports.AppWindow = function(args){
	//Have we been instantiated in the past before?
	if (!Ti.App.Properties.getBool('instantiated', false)){
		return local.GettingStarted(args);
	} else{
		return local.You(args);
	}
}
