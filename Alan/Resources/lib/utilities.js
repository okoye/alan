/**
 * @author Chuka Okoye
 * 
 * General utility functions extending Titanium
 */

exports.percentages = function(percent, relative) {
	//relative is width or height of container. See platformWidth/Height
	var percentInt = percent.replace("%", "");
	percentInt = parseInt(percentInt);
	return Math.round(percentInt * (relative/100));
};
