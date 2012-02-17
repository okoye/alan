var cache = require('lib/cache');

exports.run = function(){
    describe('Caching tests', function(){
        it('should store 10 elements', function(){
            expect(cache.add(3)).toBeFalsy();
            cache.create('testing');
            for(var i=0; i<10; i++){
                expect(cache.add('testing', 1)).toBeTruthy();
            }
        });
        
        it('should retrieve 10 elements', function(){
            expect(cache.fetch('testing').length).toEqual(10);
        });
    });
}
