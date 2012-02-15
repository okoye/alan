/**
 * @author Chuka Okoye
 * 
 * The me controller is responsible for pushing data to view
 * when data changes.
 */

//Dependencies
var activity = require('model/activity');

//State variables
var meView = null;
var activities = {};
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
    var onProcessed = function(evt, data){
        if (isNewDay()){
            activities = {};
            meView.clearActivities();
        }
        
        //create activity model then render in view.
        
    };
};
