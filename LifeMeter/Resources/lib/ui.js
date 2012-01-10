/**
 * @author Chuka Okoye
 */

//Requires
var styling = require("lib/styles");
var log = require("lib/logger");

//Module state variables
var current_window;


//Window definitions


//Internal functions
exports.AppWindow = function(args) {
	log.info("Creating getting started window");
	
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
	//var continue_button = Ti.UI.createButton(styling.tutorial_continuebutton);
	nav_root_win.add(center_scrollview);
	nav_root_win.add(bottom_view);
	
	current_window = base_win;
	return base_win;
};
