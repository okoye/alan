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

function Activity(name, reading, properties){
    if (this._isValidActivityName(name)){
        reading.name = name;
        this._fromJSONObject(reading);
    }
    else if(properties){
        this._fromJSONObject(properties);
    }
    else{
        throw "Invalid Activity State "+name;
    }
}

Activity.prototype._isValidActivityName = function(name){
    return (name && activities[name]);
}

Activity.prototype.computeDistance = function(activity){
    //return the distance between this activity and supplied activity
    
};

Activity.prototype._fromJSONObject = function(properties){
    this.name = properties.name;
    this.timestamp = properties.timestamp;
    this.speed = properties.speed;
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;
    this.altitude = properties.altitude;
};

exports.Activity = Activity;
