/**
 * @author Chuka Okoye
 * 
 * The me controller is responsible for pushing data to view
 * when data changes.
 */

//Dependencies
var log = require('lib/logger');
var itemSummary = require('ui/itemSummaryView');
var styling = require('lib/styles');

//State variables
var meView = null;
var activities = {};
var lastActivity = null;

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
    var updateView = function(activity){
        //TODO: update activities, and base calorie.
        log.info('Now updating view with new activity '+JSON.stringify(activity));
    };
    var onProcessed = function(activity){
        if (isNewDay()){
            activities = {};
            lastActivity = activity;
            meView.clearActivities();
        }
        
        if (activities[activity.name]){
            updateView(activity);
        }
        else{
            //TODO: add new itemSummaryView (activity) to meView.
            isv = itemSummary.create({
                height: 60,
                width: 280,
                top: 5,
            }, 3, styling[activity.name]);
            meView.newActivity(isv);
            updateView(activity);

        }
    };
    
    Ti.App.addEventListener('alan:sensorReadingsUpdate', onProcessed);

};
