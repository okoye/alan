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
var db = require('lib/db');

//State variables
var meView = null;
var viewActivityState = {}; //tracks what kind of 
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
    var processActivities = function(activities){
        //TODO: compute overall distance change for each activity type and update viewActivityState
        log.info('Running all necessary computations on activites');
        if (activities.length > 0){
            if (!lastActivity)
                lastActivity = activities[0];
            
            //Now, start proper processing.
            
        }
    };
    var onProcessed = function(activityInfo){
        // if (isNewDay()){
            // viewActivityState = {};
            // meView.clearActivities();
            // lastActivity = null;
        // }
        // var activities = db.
            // if (activities[activity.name]){
                // updateView(activity);
            // }
            // else{
                // //TODO: add new itemSummaryView (activity) to meView.
                // log.debug('Styling value: '+JSON.stringify(activity));
                // isv = itemSummary.create({
                    // height: 60,
                    // width: 280,
                    // top: 5,
                // }, 3, styling[activity.name]);
                // meView.newActivity(isv);
                // updateView(activity);
//     
            // }
        if (isNewDay()){
            meView.clearActivities();
            viewActivityState = {};
            lastActivity = null;
        }
        if (lastActivity){
            var activities = db.fetchActivitySince(lastActivity.timestamp);
            processActivities(activities); //extract distances, updateView activity state, compute total calories
        }
        else{
            var activities = db.fetchActivitySince((new Date).getTime()-2000);
            processActivities(activities);
        }
    };
    
    Ti.App.addEventListener('alan:sensorReadingsUpdate', onProcessed);

};
