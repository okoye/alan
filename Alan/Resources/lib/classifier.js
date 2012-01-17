/**
 * @author Chuka Okoye
 * 
 * Classifier is responsible for classifying sensor streams into
 * their appropriate activity types.
 */

var log = require('lib/logger');

exports.classify = function(data){
	log.debug("A classification task "+JSON.stringify(data));
};
