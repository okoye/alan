var db = require('lib/db');
var activity = require('model/activity');

exports.run = function(){
    describe('Database tests', function(){
       beforeEach(function(){
          db.createTable('test_database');
       });
       
       afterEach(function(){
          db.deleteTable('test_database'); 
       });
       
       it('should do nothing.', function(){
          expect(null).toBeNull(); 
       }); 
       
       it('should create a new table', function(){
           expect(db.createTable('test_database')).toBeTruthy();
       });
       
       it('should insert into table', function(){
          expect(db.insert(1, {test: 'object'}, 'test_database')).toBeTruthy(); 
       });
       
       it('should drop the table', function(){
           expect(db.deleteTable('test_database')).toBeTruthy();
       });
       
       it('should fetch get result object', function(){
          expect(db.fetchAll('test_database')).toBeDefined(); 
       });
       
       it('should have 0 and 1 elements', function(){
          expect(db.fetchAll('test_database').length).toEqual(0);
          db.insert(0, {test: 'object'}, 'test_database');
          expect(db.fetchAll('test_database').length).toEqual(1);
       });
       
       it('should have get exact id', function(){
          db.insert(0, {test: 'object'}, 'test_database');
          db.insert(0, {test: 'object'}, 'test_database');
          db.insert(0, {test: 'object'}, 'test_database');
         expect(db.fetchId('test_database', 1).length).toEqual(1); 
         var result = db.fetchId('test_database', 1);
         expect(result[0].id).toEqual(1);
       });
       
       it('should get no results', function(){
          expect(db.fetchId('test_database', 100).length).toEqual(0);
       });
       
       it('should get 3 results', function(){
          db.insert(0, {test: 'object'}, 'test_database');
          db.insert(0, {test: 'object'}, 'test_database');
          db.insert(0, {test: 'object'}, 'test_database');
          db.insert(0, {test: 'object'}, 'test_database');
          expect(db.fetchValuesGreater('test_database', 1).length).toEqual(3); //not zero indexed
       });
       
    });
    
    describe('Activity Database Tests', function(){
        beforeEach(function(){
            db.createTable('test_activity_database', '(id INTEGER PRIMARY KEY, name TEXT NOT NULL, timestamp INTEGER NOT NULL, speed REAL NOT NULL, latitude REAL, longitude REAL, altitude REAL)');
        });
        
        afterEach(function(){
          db.deleteTable('test_activity_database'); 
        });
        
        it('should insert an activity', function(){
           var act = new activity.Activity(null, null, {
               name : 'RUNNING',
               timestamp: 1234567890,
               speed: 7,
               latitude: 0,
               longitude: 0,
               altitude: 0
           });
           
           expect(db.insertActivity(act, 'test_activity_database')).toBeTruthy();
       });
       
       it('should retrieve an activity', function(){
           var act = new activity.Activity(null, null, {
               name : 'RUNNING',
               timestamp: 1234567890,
               speed: 7,
               latitude: 0,
               longitude: 0,
               altitude: 0
           });
           db.insertActivity(act, 'test_activity_database');
           expect(db.fetchAllActivity('test_activity_database').length).toEqual(1);
       });
    });
    
};
