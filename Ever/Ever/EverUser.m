//
//  EverUser.m
//  Ever
//
//  Created by Chuka Okoye on 7/28/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverUser.h"

@implementation EverUser

@synthesize username;
@synthesize authKey;

-(id) initWithUsername:(NSString *)user andCode:(NSString *)auth
{
    self = [super init];
    if(self){
        username = user;
        authKey = auth;
    }
    return self;
}

-(NSString *) fetchAuthenticationHeader
{
    return @"ApiKey %@:%@",username,authKey;
}

@end
