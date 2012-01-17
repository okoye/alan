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

exports.isOS4_Plus = function(){
	if (Ti.Platform.name == 'iPhone OS'){
		var version = Titanium.Platform.version.split('.');
		var major = parseInt(version[0], 10);
		if (major >= 4)
			return true;
	}
	return false;
};

exports.isOS3_2_Plus = function(){
	if (Ti.Platform.name == 'iPhone OS'){
		var version = Ti.Platform.version.split('.');
		var major = parseInt(version[0],10);
		var minor = parseInt(version[1],10);
		
		if (major > 3 || (major == 3 && minor > 1))
			return true;
	}
	return false;
};
