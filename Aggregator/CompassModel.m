//
//  CompassModel.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/27/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "CompassModel.h"

@implementation CompassModel

- (id) initFromCompassReading:(CLHeading *)headingValue
{
    self = [super init];
    if (self){
        heading = [headingValue copy];
    }
    return self;
}

- (NSString*) toJSON
{
    return @"";
}

@end
