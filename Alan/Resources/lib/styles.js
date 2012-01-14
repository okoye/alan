/**
 * @author Chuka Okoye
 */

var utility = require("lib/utilities");
var log = require('lib/logger');

var platformWidth = Titanium.Platform.displayCaps.platformWidth;
var platformHeight = Titanium.Platform.displayCaps.platformHeight;

var resourceDir = Titanium.Filesystem.resourcesDirectory + Titanium.Filesystem.separator;

log.info('Platform width is '+platformWidth);
log.info('Platform height is '+platformHeight);

exports = {
	nav_window : function(properties) {
		var navproperty = {};
		
		navproperty.backButtonTitle = 'Back';
		navproperty.layout = 'vertical';
		for (property in properties)
			navproperty[property] = properties[property];	
		navproperty.backgroundColor = 'white';
		navproperty.barImage =  resourceDir + '/images/iphone/top_nav.png';
		return navproperty;
	},
	nav_bottomview : function(referenceHeight) {
		return {
			backgroundColor: 'white',
			height: 60,
			backgroundImage: resourceDir + '/images/iphone/bottom_nav_bg.png',
			layout: 'absolute',
		};
	},
	tutorial_scrollview : function(properties) {
		var scrollproperty = {};
		for (property in properties){
			scrollproperty[property] = properties[property];
		}
		scrollproperty.height = 368;
		scrollproperty.pagingControlColor = 'transparent';
		scrollproperty.pagingControlOpacity = 1;
		scrollproperty.pagingControlHeight = 43;
		scrollproperty.backgroundImage = resourceDir + '/images/iphone/center_view_bg.png';
		return scrollproperty;
	},
	tutorial_centerview : function(properties){
		var centerview = {};
		centerview.backgroundColor = 'white';
		for (property in properties){
			centerview[property] = properties[property];
		}
		centerview.height = 352;
		centerview.width = 244;
		return centerview;
	},
	continue_button : function(properties) {
		var button = {};
		button.backgroundImage = resourceDir + '/images/iphone/continue_btn.png';
		for (property in properties)
			button[property] = properties[property];
			
		button.width = 172;
		button.height = 41;
		button.borderRadius = 5;
		button.top = 6;
		return button;
	},
	nav_centerview : function(properties){
		var centerview = {};
		for (property in properties)
			centerview[property] = properties[property];
		centerview.height = 368;
		centerview.backgroundImage = resourceDir + '/images/iphone/center_view_bg.png';
		return centerview;
	},
	text_field : function(properties){
		var textfield = {};
		textfield.autocapitalization = Ti.UI.TEXT_AUTOCAPITALIZATION_NONE;
		textfield.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
		textfield.height = 35;
		textfield.width = 240;
		textfield.left = 40;
		textfield.borderRadius = 5;
		for (property in properties)
			textfield[property] = properties[property];
		return textfield;
	}
};
