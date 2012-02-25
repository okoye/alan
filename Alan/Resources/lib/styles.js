/**
 * @author Chuka Okoye
 */

var utility = require("lib/utilities");
var log = require('lib/logger');

var platformWidth = Titanium.Platform.displayCaps.platformWidth;
var platformHeight = Titanium.Platform.displayCaps.platformHeight;

log.info('Platform width is '+platformWidth);
log.info('Platform height is '+platformHeight);

//TODO: refactor

exports = {
	nav_window : function(properties) {
		var navproperty = {};
		
		navproperty.backButtonTitle = 'Back';
		navproperty.layout = 'vertical';
		for (property in properties)
			navproperty[property] = properties[property];	
		navproperty.backgroundColor = 'white';
		navproperty.barImage =  'images/top_nav.png';
		return navproperty;
	},
	nav_bottomview : function(properties) {
		var bottomview = {};
		bottomview.backgroundColor = 'white';
		bottomview.height = 50;
		bottomview.backgroundImage = 'images/bottom_nav_bg.png';
		bottomview.layout = 'absolute';
		for (property in properties)
			bottomview[property] = properties[property];
		return bottomview;
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
		scrollproperty.backgroundImage = 'images/center_view_bg.png';
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
		button.backgroundImage = 'images/continue_btn.png';
		for (property in properties)
			button[property] = properties[property];
			
		button.width = 172;
		button.height = 41;
		button.borderRadius = 5;
		button.top = 4.5;
		return button;
	},
	nav_centerview : function(properties){
		var centerview = {};
		for (property in properties)
			centerview[property] = properties[property];
		centerview.height = 368;
		centerview.backgroundImage = 'images/center_view_bg.png';
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
	},
	Running : {
	    buttonImage: 'images/arw_btn_blue.png',
	    color: '#62c1e6'
	},
	Walking : {
	    buttonImage: 'images/arw_btn_green.png',
	    color: '#add267'
	},
	Inactive : {
	    buttonImage: 'images/arw_btn_red.png',
	    color: '#de7474'
	},
	Transport : {
	    buttonImage: 'images/arw_btn_yellow.png',
	    color: '#eae493'
	},
	Unkown : {
	    buttonImage: 'images/arw_btn_grey.png',
	    color: '#e0e0e0'
	},
	Info : {
	    color: '#748dde',//PURPLE
	},
};
