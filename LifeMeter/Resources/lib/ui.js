/**
 * @author Chuka Okoye
 */

//Requires
var styling = require("lib/styles");
var log = require("lib/logger");

//Module state variables
var current_window;
var local = {};


//Window definitions


//Internal functions
local.GettingStarted = function(args) {
	log.info('Creating getting started window');
	
	var base_win = Ti.UI.createWindow({backgroundColor: 'white'});
	var nav_root_win = Titanium.UI.createWindow(styling.tutorial_window);
	var nav = Titanium.UI.iPhone.createNavigationGroup({window: nav_root_win});
	
	base_win.add(nav);
		
	var center_height = Titanium.Platform.displayCaps.platformHeight - nav.getHeight();
	var center_view0 = Ti.UI.createView(styling.tutorial_centerview());
	var center_view1 = Ti.UI.createView(styling.tutorial_centerview());
	var center_view2 = Ti.UI.createView(styling.tutorial_centerview());
	var bottom_view = Ti.UI.createView(styling.tutorial_bottomview(center_height));
	var center_scrollview = Ti.UI.createScrollableView(styling.tutorial_scrollview({
		views: [center_view0, center_view1, center_view2],
		showPagingControl: true,
		height: center_height,
	}));
	var continue_button = Ti.UI.createButton(styling.tutorial_continuebutton);
	nav_root_win.add(center_scrollview);
	nav_root_win.add(bottom_view);
	bottom_view.add(continue_button);
	current_window = base_win;
	
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
	
	return base_win;
};

local.You = function(args) {
	log.info('Creating you window');
	
	return Ti.UI.createWindow({backgroundColor: 'white'});
};

local.CreateAccount = function(args) {
	log.info('Creating create account window');
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
