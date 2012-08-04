/**
 * @author Chuka Okoye
 * A simple cache abstracting the details of caching. It stores to a JSON structure.
 */
var log = require('lib/logger');

var cacheStore = null;
var CACHE_NAME = 'ALAN_CACHE';

var persist = function(){
    Ti.App.Properties.setObject(CACHE_NAME, cacheStore);
};

exports.create = function(name, override){
    //create a new namespace
    if (!override){
        (cacheStore[name] != null) ? true : cacheStore[name] = {};
    }
    else{
        cacheStore[name] = {};
    }
};
exports.set = function(namespace, key, value){
    //set the value of a key in some namespace
    cacheStore[namespace][key] = value;
    persist();
    return cacheStore[namespace][key];
};
exports.get = function(namespace, key){
    //fetch a value of a key from some namespace
    log.info('cacheStore is '+JSON.stringify(cacheStore));
    if(cacheStore[namespace] != null && cacheStore[namespace][key] != null){
        return cacheStore[namespace][key];
    }
    else{
        return null;
    }
};
exports.initialize = function(){
    //loads from disk or performs new initialization
    log.info('initialize app cache');
    if (Ti.App.Properties.getObject(CACHE_NAME) != null){
    	log.info('loading previous data into cache');
    	if (cacheStore == null)
        	cacheStore = Ti.App.Properties.getObject(CACHE_NAME);
    }
    else if(Ti.App.Properties.getObject(CACHE_NAME) == null){
    	log.info('creating a brand new cache');
    	cacheStore = {};
    }
};
