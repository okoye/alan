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

function Activity(name, timestamp, velocity, aggression, cTime, distance){
    if (this._isValidActivityName(name)){
        this.name = name;
        this.timestamp = timestamp;
        this.velocity = velocity;
        this.aggression = aggression;
        this.cumulativeTime = cTime;        //Cumulative time spent in this activity mode today.
        this.cumulativeDistance = distance; //Cumulative distance travelled by this activity for today.
    }
    else{
        throw "Invalid Activity Recorded";
    }
}

Activity.prototype._isValidActivityName = function(name){
    return (activities.name);
}

