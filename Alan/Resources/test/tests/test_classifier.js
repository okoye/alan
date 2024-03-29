var classifier = require('lib/classifier');

var c = null;
var running = {speed: 4, state: 'RUNNING'};
var walking = {speed: 2, state: 'WALKING'};
var transport = {speed: 12, state: 'TRANSPORT'};
var lazy = {speed: 0.4, state: 'LAZY'};

exports.run = function(){
    describe('Classifier tests', function(){
        beforeEach(function(){
            c = new classifier.Classifier(null, false);
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
        });
        
        it('should classify as lazy.', function(){
            expect(c.classify(lazy).name).toEqual(lazy.state);
        });
    });
    
    describe('Classifier, Filter integration tests', function(){
        c = new classifier.Classifier(null, true);
        it('should classify as running.', function(){
            expect(c.classify(running).name).toEqual(running.state);
        });
        
        it('should classify as walking.', function(){
            expect(c.classify(walking).name).toEqual(walking.state);
        });
    });
};
