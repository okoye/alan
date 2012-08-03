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
        (cacheStore.name) ? true : cacheStore[name] = {};
    }
    else{
        cacheStore.name = {};
    }
};
exports.set = function(namespace, key, value){
    //set the value of a key in some namespace
    cacheStore[namespace].key = value;
    persist();
    return cacheStore[namespace][key];
};
exports.get = function(namespace, key){
    //fetch a value of a key from some namespace
    if(cacheStore.namespace && cacheStore.namespace.key){
        return cacheStore[namespace][key];
    }
    else{
        return null;
    }
};
exports.initialize = function(){
    //loads from disk or performs new initialization
    if (Ti.App.Properties.getString(CACHE_NAME) != null && cacheStore == null){
        cacheStore = JSON.parse(Ti.App.Properties.getString(CACHE_NAME));
    }
    else if(Ti.App.Properties.getObject(CACHE_NAME) == null){
    	cacheStore = {};
    }
};
