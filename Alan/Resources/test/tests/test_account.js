var account = require('model/account');

exports.run = function(){
    describe('Account model tests', function(){
        it('should instantiate a new account', function(){
            account.load('test@email.com', 'password');
            expect(account.username()).toEqual('test@email.com');
            expect(account.password()).toEqual('password');
        });
        
        it('should have email and password fields', function(){
            account.save();
            expect(Ti.App.Properties.getString('model/account')).toBeTruthy();
        });
    });
}
