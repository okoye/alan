//
//  EverUser.h
//  Ever
//
//  Created by Chuka Okoye on 7/28/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface EverUser : NSObject

@property(nonatomic, readonly) NSString* username;
@property(nonatomic, readonly) NSString* authKey;

-(id) initWithUsername:(NSString *)user andCode:(NSString *)auth;
-(NSString *) fetchAuthenticationHeader;

@end
