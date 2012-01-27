var db = require('lib/db');

exports.run = function(){
    describe('Database tests', function(){
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
    });
    
};
