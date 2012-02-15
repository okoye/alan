/**
 * @author Chuka Okoye
 * Activity Data Model
 */

var log = require('lib/logger');

function Activity(name, timestamp, velocity, aggression){
    this.name = name;
    this.timestamp = timestamp;
    this.velocity = velocity;
    this.aggression = aggression;
}

