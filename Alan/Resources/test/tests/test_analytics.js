var analytics = require('model/analytics');

exports.run = function(){
    describe('Analytics model tests', function(){
        it('should instantiate new analytics', function(){
            analytics.load();
            expect(analytics.steps()).toEqual(0);
            expect(analytics.distance()).toEqual(0);
            expect(analytics.calories()).toEqual(0);
            expect(analytics.steps()).toEqual(0);
        });
        
        it('should have activity properties', function(){
            analytics.load();
            analytics.sync();
            expect(Ti.App.Properties.getString('model/analytics')).toBeTruthy();
        });
    });
}
