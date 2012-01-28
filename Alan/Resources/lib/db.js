/**
 * @author Chuka Okoye
 * 
 * Abstraction of database providing common functionality such as creation and deletion of exisiting db
 */

var log = require('lib/logger');

var local = {};
var DATABASE_NAME  = 'Alan.db';
var HARD_LIMIT = 100000;

exports.createTable = function(name){
	log.info('Creating a new table, if none exists');
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('CREATE TABLE IF NOT EXISTS '+name+' (id INTEGER PRIMARY KEY, timestamp INTEGER NOT NULL, json TEXT NOT NULL)');
	db.close();
	return true;
};
exports.deleteTable = function(name){
	log.info('Dropping table from Alan database');
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('DROP TABLE '+name);
	db.close();
	return true;
};
exports.insert = function(timestamp, json, table){ //Treated like a key, value store.
	log.info('Inserting new data into table '+table);
	var db = Ti.Database.open(DATABASE_NAME);
	var statement = "INSERT INTO "+table+" (timestamp, json) VALUES (?, ?);";
	db.execute(statement, timestamp, JSON.stringify(json));
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
    while (rows.isValidRow() && counter < HARD_LIMIT){
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
exports.fetchId = function(table, id){
  log.info('Fetching datum by specific ID in table '+table);
  var db = Ti.Database.open(DATABASE_NAME);
  statement = "SELECT * FROM "+table+" WHERE id=?";
  var rows = db.execute(statement, id);
  var counter = 0;
  var result = [];
  while (rows.isValidRow() && counter < HARD_LIMIT){
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
  return result;  
};
