
exports.run = function(){
  Ti.include('/test/lib/jasmine-1.0.2.js');
  Ti.include('/test/lib/jasmine-titanium.js');
  
  var db = require('test/tests/test_database');
  db.run();
  
  // var classifier = require('test/tests/test_classifier');
  // classifier.run();
  
  // var filter = require('test/tests/test_filter');
  // filter.run();
  
  var acc = require('test/tests/test_account');
  acc.run();
  
  var ana = require('test/tests/test_analytics');
  ana.run();
  
  var prof = require('test/tests/test_profile');
  prof.run();

  jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
  jasmine.getEnv().execute();  
};
