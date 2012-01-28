var db = require('lib/db');

exports.run = function(){
    describe('Database tests', function(){
       beforeEach(function(){
          db.createTable('test_database');
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
    });
    
};
