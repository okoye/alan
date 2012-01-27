/**
 * @author Chuka Okoye
 * 
 * Abstraction of database providing common functionality such as creation and deletion of exisiting db
 */

var log = require('lib/logger');

var local = {};
var DATABASE_NAME  = 'Alan.db';

local.createTable = function(name){
	log.info('Creating a new table, if none exists');
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('CREATE TABLE IF NOT EXISTS ? (id INTEGER PRIMARY KEY, timestamp INTEGER NOT NULL, json TEXT NOT NULL)', name);
	db.close();
};
local.deleteTable = function(name){
	log.info('Dropping table from Alan database');
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('DROP TABLE ?', name);
	db.close();
};
local.insert = function(timestamp, json, table){
	log.info('Inserting new data into table '+table);
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute('INSERT INTO ? (timestamp, json) VALUES (?, ?)', table, timestamp, JSON.stringify(json));
	db.close();
};

