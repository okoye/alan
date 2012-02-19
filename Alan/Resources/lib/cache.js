/**
 * @author Chuka Okoye
 * A simple cache abstracting the details of caching.
 */

var cacheStore = {}; //TODO Use persistent in app store

//TODO: write tests.

exports.create = function(name){
    //create a new cache given the name 'name'
    cacheStore[name] = [];
};

exports.add = function(name, data){
    //push into 'name', this value
    if (_exists(name)){
        cacheStore[name].push(data);
        return true;
    }
    else{
        return false;
    }
};

exports.fetch = function(name){
    //fetch all data for 'name'
    if (_exists(name)){
        return cacheStore[name];
    }
    else{
        return null;
    }
};

exports.remove = function(name){
    cacheStore[name] = [];
};

exports.fetchLastN = function(name, size){
    if (_exists(name)){
        return cacheStore[name].slice(size*-1); //TODO test this.
    }
};

//Some helper functions
var _exists = function(name){
    return (cacheStore[name]);
};


