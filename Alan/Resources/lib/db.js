/**
 * @author Chuka Okoye
 * 
 * Abstraction of database providing common functionality such as creation and deletion of exisiting db
 */

var log = require('lib/logger');

var local = {};
var DATABASE_NAME  = 'Alan.db';

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
exports.insert = function(timestamp, json, table){
	log.info('Inserting new data into table '+table);
	var db = Ti.Database.open(DATABASE_NAME);
	var statement = "INSERT INTO "+table+" (timestamp, json) VALUES (?, ?);";
	db.execute(statement, timestamp, JSON.stringify(json));
	db.close();
	return true;
};
