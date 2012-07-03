var profile = require('model/profile');
var log = require('lib/logger');
var mock_profile = {
    height: 170,
    weight: 200,
    birthday: '1988-06-26',
    sex: 'female',
    hours_sitting: 10,
    days_workout: 1
};

exports.run = function(){
    describe('Profile model tests', function(){
        it('should instantiate Profile model', function(){
            aprofile = profile.create(mock_profile);
            expect(aprofile).toBeDefined();
            log.debug(JSON.stringify(aprofile));
            expect(aprofile.height).toBeDefined();
            expect(aprofile.weight).toBeDefined();
            expect(aprofile.birthday).toBeTruthy();
            expect(aprofile.sex).toBeTruthy();
        });
        
        it('should validate getters and setters', function(){
            aprofile = profile.create(mock_profile);
            expect(profile.get('hours_sitting')).toEqual(mock_profile.hours_sitting);
            expect(profile.get('height')).toEqual(mock_profile.height);
            expect(profile.get('weight')).toEqual(mock_profile.weight);
            expect(profile.get('birthday')).toEqual(mock_profile.birthday);
            expect(profile.get('height')).toEqual(mock_profile.height); //checking for side effects from previous call
            profile.set('nickname', 'icewoman');
            expect(profile.get('nickname')).toEqual('icewoman');
        });
    });
    
}
