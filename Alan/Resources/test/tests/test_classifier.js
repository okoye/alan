var classifier = require('lib/classifier');

var c = null;
var running = {speed: 4, state: 'RUNNING'};
var walking = {speed: 2, state: 'WALKING'};
var transport = {speed: 12, state: 'TRANSPORT'};

exports.run = function(){
    describe('Classifier tests', function(){
        beforeEach(function(){
            c = new classifier.Classifier(null);
        });
        
        it('should classify as running.', function(){
            var result = c.classify(running);
            expect(result).toBeDefined();
            expect((result.timestamp)).toBeFalsy(); //indirect testing of activity model.
            expect((result.altitude)).toBeFalsy();
            expect(c.classify(running).name).toEqual(running.state);
        });
        
        it('should classify as walking.', function(){
            expect(c.classify(walking).name).toEqual(walking.state);
        });
        
        it('should classify as transport.', function(){
            expect(c.classify(transport).name).toEqual(transport.state);
        })
        
        
    });
}
