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
var radius = 6371; //radius of earth in kilometers

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
    var dLat = this._toRadians((this.latitude - activity.latitude));
    var dLon = this._toRadians((this.longitude - activity.longitude));
    var lat1 = this._toRadians(this.latitude);
    var lat2 = this._toRadians(activity.latitude);
    
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return radius * c; //NOTE: in kilometers
};

Activity.prototype._fromJSONObject = function(properties){
    this.name = properties.name;
    this.timestamp = properties.timestamp;
    this.speed = properties.speed;
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;
    this.altitude = properties.altitude;
};

Activity.prototype._toRadians = function(degree){
    return (Math.PI/180) * degree;
}

exports.Activity = Activity;
