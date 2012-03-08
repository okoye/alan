/**
 * @author Chuka Okoye
 * 
 * The me controller is responsible for pushing data to view
 * when data changes.
 */

//Dependencies
var log = require('lib/logger');

var currentDay = (new Date).getDay(); //TODO persist across app restarts.

exports.start = function(){
    
    Ti.App.addEventListener('alan:sensorReadingsUpdate', onProcessed);
};
