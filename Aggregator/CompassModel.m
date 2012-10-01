//
//  CompassModel.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/27/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "CompassModel.h"

@implementation CompassModel

- (id) initFromCompassReading:(CLHeading *)headingValue andTag:(NSString *)tag
{
    self = [super init];
    if (self){
        heading = [headingValue copy];
        activityTag = [tag copy];
    }
    return self;
}

- (id)JSON
{
    return [NSDictionary alloc] initWithObjects:<#(NSArray *)#> forKeys:<#(NSArray *)#>;
}

@end
