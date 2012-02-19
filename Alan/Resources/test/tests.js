
exports.run = function(){
  Ti.include('/test/lib/jasmine-1.0.2.js');
  Ti.include('/test/lib/jasmine-titanium.js');
  
  var db = require('test/tests/test_database');
  db.run();
  
  var classifier = require('test/tests/test_classifier');
  classifier.run();
  
  var cache = require('test/tests/test_cache');
  cache.run();
  
  var filter = require('test/tests/test_filter');
  filter.run();

  jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
  jasmine.getEnv().execute();  
};
