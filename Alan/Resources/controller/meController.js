/**
 * @author Chuka Okoye
 * 
 * The me controller is responsible for pushing data to view
 * when data changes.
 */

//Dependencies
var log = require('lib/logger');

//State variables
var meView = null;
var activities = {},
distances = {},
times = {};

var currentDay = (new Date).getDay();

exports.start = function(meV){
    //listen for relevant data model changes. when they occur, 
    //cache changes locally, and then push to view when appropriate.
    //or push immediately.
    meView = meV;
    
    var isNewDay = function(){
        if ((new Date).getDay() === currentDay){
            return false;
        }
        else{
            currentDay = (new Date).getDay();
            return true;
        }
    };
    var updateStateVars = function(activity){
        distances[activity.name] = activity.cumulativeDistance;
        times[activity.name] = activity.cumulativeTime;
    };
    var updateView = function(activity){
        //TODO: update activities, and meView
    };
    var onProcessed = function(activity){
        if (isNewDay()){
            activities = {};
            distances = {};
            times = {};
            meView.clearActivities();
        }
        
        if (activities[activity.name]){
            updateStateVars(activity);
            updateView(activity);
        }
        else{
            //TODO: add new itemSummaryView (activity) to meView.
            updateStateVars(activity);
            updateView(activity);

        }
    };
    
    Ti.App.addEventListener('alan:sensorReadingsUpdate', onProcessed);

};
