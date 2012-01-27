// (function(){
		// Ti.include('/test/lib/jasmine-1.0.2.js');
		// Ti.include('/test/lib/jasmine-titanium.js');
// 		
		// // Include all the test files
		// Ti.include('/test/tests/test_database.js');
// 		
		// jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
		// jasmine.getEnv().execute();
// })();

exports.run = function(){
  Ti.include('/test/lib/jasmine-1.0.2.js');
  Ti.include('/test/lib/jasmine-titanium.js');
  
  var db = require('test/tests/test_database');
  db.run();
  
  jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
  jasmine.getEnv().execute();  
};
