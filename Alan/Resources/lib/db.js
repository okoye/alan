/**
 * @author Chuka Okoye
 * 
 * Abstraction of database providing common functionality such as creation and deletion of exisiting db
 */

var log = require('lib/logger');

var local = {};
var DATABASE_NAME  = 'Alan.db';
var HARD_LIMIT = 100000;

exports.createTable = function(name, structure){
	log.info('Creating a new table, if none exists');
	if (!structure)
	   var structure = '(id INTEGER PRIMARY KEY, timestamp INTEGER NOT NULL, json TEXT NOT NULL)';
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('CREATE TABLE IF NOT EXISTS '+name+' '+structure);
	db.close();
	return true;
};
exports.deleteTable = function(name){
	log.info('Dropping table from Alan database');
	var db = Ti.Database.open(DATABASE_NAME);
	try{
	    db.execute('DROP TABLE '+name);
	}catch (ex){
	    log.info('Encountered an error when dropping database. '+ex);
	}
	db.close();
	return true;
};
exports.insert = function(timestamp, json, table){ //Treated like a key, value store. for standard tables only.
	log.info('Inserting new data into table '+table);
	var db = Ti.Database.open(DATABASE_NAME);
	var statement = "INSERT INTO "+table+" (timestamp, json) VALUES (?, ?);";
	db.execute(statement, timestamp, JSON.stringify(json));
	db.close();
	return true;
};
exports.insertActivity = function(activity, table){
    if(!table)
        var table = 'ACTIVITIES';
    var db = Ti.Database.open(DATABASE_NAME);
    var statement = "INSERT INTO "+table+" (name, timestamp, speed, latitude, longitude, altitude) VALUES (?, ?, ?, ?, ?, ?);";
    db.execute(statement, activity.name, activity.timestamp, activity.speed, activity.latitude, activity.longitude, activity.altitude);
    db.close();
    return true;
};
exports.fetchAll = function(table){
    log.info('Fetching all data in table '+table);
    var db = Ti.Database.open(DATABASE_NAME);
    var statement = "SELECT * FROM "+table;
    var rows = db.execute(statement);
    var result = [];
    var counter = 0;
    while (rows.isValidRow() && counter < HARD_LIMIT){ //TODO: refactor
        result.push({
            id: rows.fieldByName('id'),
            timestamp: rows.fieldByName('timestamp'),
            json: rows.fieldByName('json')
        });
        counter += 1;
        rows.next();
    }
    rows.close();
    db.close();
    return result;
};
exports.fetchAllActivity = function(table){
    log.info('Fetching all data in table '+table);
    var db = Ti.Database.open(DATABASE_NAME);
    var statement = "SELECT * FROM "+table;
    var rows = db.execute(statement);
    var result = [];
    var counter = 0;
    while (rows.isValidRow() && counter < HARD_LIMIT){ //TODO: refactor
        result.push({
            id: rows.fieldByName('id'),
            name: rows.fieldByName('name'),
            timestamp: rows.fieldByName('timestamp'),
            speed: rows.fieldByName('speed'),
            latitude: rows.fieldByName('latitude'),
            longitude: rows.fieldByName('longitude'),
            altitude: rows.fieldByName('altitude')
        });
        counter += 1;
        rows.next();
    }
    rows.close();
    db.close();
    return result;
};
exports.fetchActivitySince = function(time, table){
    log.info('Fetching all activity since '+time);
    if (!table)
        var table = 'ACTIVITIES';
    var db = Ti.Database.open(DATABASE_NAME);
    var statement = "SELECT * FROM "+table+" WHERE timestamp>?";
    var rows = db.execute(statement, time+'');
    var counter = 0;
    var result = [];
    while (rows.isValidRow() && counter < HARD_LIMIT){ //TODO: refactor
        result.push({
            id: rows.fieldByName('id'),
            name: rows.fieldByName('name'),
            timestamp: rows.fieldByName('timestamp'),
            speed: rows.fieldByName('speed'),
            latitude: rows.fieldByName('latitude'),
            longitude: rows.fieldByName('longitude'),
            altitude: rows.fieldByName('altitude')
        });
        counter += 1;
        rows.next();
    }
    rows.close();
    db.close();
    return result;
};
exports.fetchId = function(table, id){
    //Returns ideally 1 result, that is this specific id
  log.info('Fetching datum by specific ID in table '+table);
  var db = Ti.Database.open(DATABASE_NAME);
  var statement = "SELECT * FROM "+table+" WHERE id=?";
  var rows = db.execute(statement, id);
  var counter = 0;
  var result = [];
  while (rows.isValidRow() && counter < HARD_LIMIT){ //TODO: refactor
      result.push({
          id: rows.fieldByName('id'),
          timestamp: rows.fieldByName('timestamp'),
          json: rows.fieldByName('json')
      });
      counter += 1;
      rows.next();
  }
  rows.close();
  db.close();
  return result;
};
exports.fetchValuesGreater = function(table, id){
  log.info('Fetching all data greater than '+id+' in '+table);
  var db = Ti.Database.open(DATABASE_NAME);
  statement = "SELECT * FROM "+table+" WHERE id>?";
  var rows = db.execute(statement, id);
  var counter = 0;
  var result = [];
  while (rows.isValidRow() && counter < HARD_LIMIT){ //TODO: refactor
      result.push({
          id: rows.fieldByName('id'),
          timestamp: rows.fieldByName('timestamp'),
          json: rows.fieldByName('json')
      });
      counter += 1;
      rows.next();
  } 
  rows.close();
  db.close();
  return result;
};
