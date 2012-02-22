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
var activityModel = require('model/activity');

//State variables
var meView = null;
var viewActivityState = {}; //tracks what kind of 
var lastActivity = null;
var cumulativeDistance = {};

var currentDay = (new Date).getDay(); //TODO persist across app restarts.

exports.start = function(meV){
    //listen for relevant data model changes. when they occur, 
    //cache changes locally, and then push to view when appropriate.
    //or push immediately.
    meView = meV;
    log.debug('meV is now '+JSON.stringify(meV));
    
    var isNewDay = function(){
        if ((new Date).getDay() === currentDay){
            return false;
        }
        else{
            currentDay = (new Date).getDay();
            return true;
        }
    };
    var syncView = function(activity){
        //TODO: update activities, and base calorie.
        log.info('Now updating view with new activity '+JSON.stringify(activity));
    };
    var processActivities = function(activities){
        log.info('Running all necessary computations on activities '+activities.length);
        log.debug('meView is now '+JSON.stringify(meView));
        if (activities.length > 0){
            if (!lastActivity)
                lastActivity = new activityModel.Activity(null, null, activities[0]);
            
            //Now, start proper processing.
            for (var i=0; i<activities.length; i++){
                var activity = new activityModel.Activity(null, null, activities[i]);
                if (!viewActivityState[activity.name]){
                    //create itemSummaryView and push to viewActivityState
                    var isv = itemSummary.create({
                        height: 60,
                        width: 280,
                        top: 5,
                    }, 3, styling[activity.name]);
                    viewActivityState[activity.name] = isv;
                    log.debug('meView is '+JSON.stringify(meView));
                    meView.newActivity(isv);
                    cumulativeDistance[activity.name] = 0;
                }
                //compute distances
                var dist = activity.computeDistance(lastActivity);
                cumulativeDistance[activity.name] += dist;
                lastActivity = activity;
            }
            log.debug('Cumulative distance: '+JSON.stringify(cumulativeDistance));
        }
    };
    var onProcessed = function(activityInfo){
        if (isNewDay()){
            meView.clearActivities();
            viewActivityState = {};
            lastActivity = null;
            cumulativeDistance = {};
        }
        if (lastActivity){
            log.debug('Last Activity Timestamp '+lastActivity.timestamp);
            var activities = db.fetchActivitySince(lastActivity.timestamp);
            processActivities(activities); //extract distances, updateView activity state, compute total calories
        }
        else{
            var time = (new Date).getTime() - 60000;
            log.debug('No last activity timestamp '+time);
            var activities = db.fetchActivitySince(time);
            processActivities(activities);
        }
    };
    
    Ti.App.addEventListener('alan:sensorReadingsUpdate', onProcessed);

};
