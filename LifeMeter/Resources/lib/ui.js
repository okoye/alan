/**
 * @author Chuka Okoye
 */

//Requires
var styling = require("lib/styles");
var log = require("lib/logger");

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
	var center_view0 = Ti.UI.createView(styling.tutorial_centerview());
	var center_view1 = Ti.UI.createView(styling.tutorial_centerview());
	var center_view2 = Ti.UI.createView(styling.tutorial_centerview());
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
		})
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
	var tf = Titanium.UI.createTextField(styling.text_field({
		top: 67,
		left: 67,
		borderRadius: 3,
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	}));
	center_view.add(tf);
	footer_view.add(continue_button);
	create_account_window.add(center_view);
	create_account_window.add(footer_view);
	local.nav_control.open(create_account_window, {animated:true});
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
