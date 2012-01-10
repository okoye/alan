/**
 * @author Chuka Okoye
 */

var utility = require("lib/utilities");
var log = require('lib/logger');

var platformWidth = Titanium.Platform.displayCaps.platformWidth;
var platformHeight = Titanium.Platform.displayCaps.platformHeight;

log.info('Platform width is '+platformWidth);
log.info('Platform height is '+platformHeight);

exports = {
	tutorial_window : {
		backgroundColor: 'purple',
		layout: 'vertical',
		barImage: 'images/iphone/top_nav.png',
		title: 'Getting Started'
	},
	tutorial_bottomview : function(referenceHeight) {
		return {
			backgroundColor: 'blue',
			height: 98,
			backgroundImage: 'images/iphone/bottom_nav_bg.png',
		};
	},
	tutorial_scrollview : function(properties) {
		var scrollproperty = {};
		//scrollproperty.pagingControlHeight = 10;
		for (property in properties){
			scrollproperty[property] = properties[property];
		}
		scrollproperty.height = 368;
		scrollproperty.pagingControlColor = 'transparent';
		scrollproperty.pagingControlOpacity = 1;
		scrollproperty.pagingControlHeight = 43;
		scrollproperty.backgroundImage = 'images/iphone/center_view_bg.png';
		return scrollproperty;
	},
	tutorial_centerview : function(properties){
		var centerview = {};
		//properties that can be overwritten
		centerview.backgroundColor = 'pink';
		for (property in properties){
			centerview[property] = properties[property];
		}
		//properties that should not be overwritten
		centerview.height = 350;
		centerview.width = 250;
		return centerview;
	},
	tutorial_continuebutton : {
		backgroundColor: '#64c1e6',
		width: 100,
		height: 45,
		title: 'Start',
		borderRadius: 10,
	}
};
