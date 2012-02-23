var filter = require('lib/filter');
var log = require('lib/logger'); 

exports.run = function(){
    describe('Filter tests', function(){
        it('should return RUNNING STATE', function(){
            for (var i=0; i<20; i++){
                filter.probableActivity('RUNNING');
            }
            var result = filter.probableActivity('WALKING');
            expect(result).toBeDefined();
            expect(result.element).toEqual('RUNNING<=>RUNNING');
            result = filter.probableActivity('WALKING');
            expect(result).toBeDefined();
            result = filter.probableActivity('WALKING');
            expect(result).toBeDefined();
            expect(result.element).toEqual('WALKING<=>WALKING');
        });
    });
};
