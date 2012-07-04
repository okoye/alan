var account = require('model/account');
var log = require('lib/logger');
var mock_account = {
    username: 'test@testers.com',
    password: 'tester',
    firstname: 'test king',
    lastname: 'king test',
    nickname: 'fisher',
    avatar_url: 'http://i.dont.exist.com'
};

exports.run = function(){
    describe('Account model tests', function(){
        it('should instantiate a new account', function(){
            aaccount = account.create(mock_account);
            expect(aaccount).toBeDefined();
            expect(aaccount.username).toBeTruthy();
            expect(aaccount.password).toBeTruthy();
            expect(aaccount.firstname).toBeTruthy();
            expect(aaccount.lastname).toBeTruthy();
            expect(aaccount.nickname).toBeTruthy();
            expect(aaccount.avatar_url).toBeTruthy();
        });
        
        it('should validate getters and setters', function(){
            account.create(mock_account);
            expect(account.get('username')).toEqual(mock_account.username);
            expect(account.get('password')).toEqual(mock_account.password);
            expect(account.get('firstname')).toEqual(mock_account.firstname);
            expect(account.get('lastname')).toEqual(mock_account.lastname);
            expect(account.get('nickname')).toEqual(mock_account.nickname);
            expect(account.get('avatar_url')).toEqual(mock_account.avatar_url);
        });
    });
};
