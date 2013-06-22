//
//  EverAPIConnector.m
//  Ever
//
//  Created by Chuka Okoye on 6/22/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverAPIConnector.h"

@implementation EverAPIConnector


@synthesize request, payload, completion_block;

- (id) initWithRequest:(NSURLRequest *)req
{
    self = [super init];
    if (self){
        [self setRequest:req];
    }
    return self;
}

- (void) start
{
    NSData *json_rep = nil;
    if (payload){
        NSError *error = nil;
        json_rep = [NSJSONSerialization dataWithJSONObject:payload options:nil error:&error];
    }
    
}

@end
