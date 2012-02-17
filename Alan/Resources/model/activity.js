/**
 * @author Chuka Okoye
 * Activity Data Model
 */

var log = require('lib/logger');

var activities = {
        RUNNING: 1,
        WALKING: 2,
        LAZY: 3,
        TRANSPORT: 4,
        UNKNOWN: 5
};

function Activity(name, reading){
    if (this._isValidActivityName(name)){
        this.name = name;
        this.timestamp = reading.timestamp;
        this.speed = reading.speed;
        this.latitude = reading.latitude;
        this.longitude = reading.longitude;
        this.altitude = reading.altitude;
    }
    else{
        throw "Invalid Activity State";
    }
}

Activity.prototype._isValidActivityName = function(name){
    return (activities.name);
}

Activity.prototype.computeDistance = function(activity){
    //return the distance between this activity and supplied activity
    
};

