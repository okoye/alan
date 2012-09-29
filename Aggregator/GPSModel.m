//
//  GPSModel.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/26/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "GPSModel.h"

@implementation GPSModel

- (id) initFromGPSReading:(id)locationValue
{
    self = [super init];
    if (self){
        location = [locationValue copy];
    }
    return self;
}

- (NSString*) toJSON
{
    return @"";
}

@end
