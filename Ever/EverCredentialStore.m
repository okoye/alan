//
//  EverCredentialStore.m
//  Ever
//
//  Created by Chuka Okoye on 7/27/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverCredentialStore.h"
#import "KeychainItemWrapper.h"
#import "AFHTTPClient.h"
#import "AFJSONRequestOperation.h"
#import "EverCommon.h"
#import "EverUser.h"
@interface EverCredentialStore ()
-(NSString *) fetchAuthFromJSON:(NSDictionary *)dict;
@end

@implementation EverCredentialStore
{
    @private
    KeychainItemWrapper *authChain;
}

static const NSString *AUTHCHAIN_PREFIX = @"org.lightcurvelabs.ever";

#pragma mark - EverCredentialStore Private Methods
-(NSString *) fetchAuthFromJSON:(NSDictionary *)dict
{
    NSString *value = [[dict valueForKey:@"object"] valueForKey:@"key"];
    return value;
}

#pragma mark - EverCredentialStore Public Methods
+ (EverCredentialStore *) getStore
{
    static EverCredentialStore *store = nil;
    if (!store){
        store = [[EverCredentialStore alloc] init];
    }
    return store;
}

- (id) init
{
    self = [super init];
    if (self){
        NSString *authIdentifier = [NSString stringWithFormat:@"%@:AuthKey",AUTHCHAIN_PREFIX];
        authChain = [[KeychainItemWrapper alloc] initWithIdentifier:authIdentifier accessGroup:nil];
        [authChain setObject:@"EverCredentialsStore" forKey:(id)CFBridgingRelease(kSecAttrService)];
    }
    return self;
}

- (EverUser *) getAuthenticatedUser
{
    NSString* username = [authChain objectForKey:CFBridgingRelease(kSecAttrAccount)];
    NSString* authKey = [authChain objectForKey:CFBridgingRelease(kSecValueData)];
    if (![username isEqual: @""] && ![authKey isEqual: @""]){
        return [[EverUser alloc] initWithUsername: username
                                          andCode: authKey];
    }
    else{
        return nil;
    }    
}

- (void) authenticateUsername:(NSString *)username andPassword:(NSString *)password withSuccess:(void (^)(void))success andError:(void (^)(void))error
{
    //Try to authenticate with service immediately.
    NSString *baseURLString = @"http://everapi.thepuppetprojects.com";
    NSURL *baseUrl = [NSURL URLWithString:baseURLString];
    AFHTTPClient *httpClient = [AFHTTPClient clientWithBaseURL:baseUrl];
    [httpClient setAuthorizationHeaderWithUsername:username password:password];
    NSMutableURLRequest *authRequest = [httpClient requestWithMethod:@"GET" path:@"/v1/auth" parameters:nil];
    AFJSONRequestOperation *op = [AFJSONRequestOperation JSONRequestOperationWithRequest: authRequest
                                                                                 success:^(NSURLRequest *request, NSHTTPURLResponse *resp, id JSON){
                                                                                     success(); //provide feedback to UI
                                                                                     [authChain setObject:username forKey:(id)CFBridgingRelease(kSecAttrAccount)];
                                                                                     [authChain setObject:[self fetchAuthFromJSON:JSON] forKey:(id)CFBridgingRelease(kSecValueData)];
                                                                                     
                                                                                 }
                                                                                 failure:^(NSURLRequest *req, NSHTTPURLResponse *rep, NSError *err, id JSON){
                                                                                     error(); //provide feedback to UI
                                                                                 }];
    [op start];    
}

- (void) logout
{
    [authChain resetKeychainItem]; //actually deletes login info
}
@end
