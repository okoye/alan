//
//  EverCredentialStore.h
//  Ever
//
//  Created by Chuka Okoye on 7/27/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
@class EverUser;

@interface EverCredentialStore : NSObject
+ (EverCredentialStore *) getStore;
- (id) init;
- (EverUser *) getAuthenticatedUser;
- (void) authenticateUsername:(NSString *) username andPassword:(NSString *) password withSuccess:(void(^)(void))success andError:(void(^)(void))error;
- (void) logout;
@end
