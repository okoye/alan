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

- (id) JSON
{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"];
    NSArray* dictValues = [[NSArray alloc] initWithObjects: [NSNumber numberWithDouble:[heading magneticHeading]],
                        [NSNumber numberWithDouble:[heading trueHeading]],
                        [NSNumber numberWithDouble:[heading headingAccuracy]],
                        [dateFormatter stringFromDate:[heading timestamp]],
                        [NSNumber numberWithDouble:[heading x]],
                        [NSNumber numberWithDouble:[heading y]],
                        [NSNumber numberWithDouble:[heading z]], nil];
    NSArray* dictKeys = [[NSArray alloc ] initWithObjects:@"magnetic_heading", @"true_heading",
                        @"heading_accuracy", @"timestamp", @"tesla_x", @"tesla_y",
                        @"tesla_z", nil];
    
    return [[NSDictionary alloc] initWithObjects:dictValues forKeys:dictKeys];
}

@end
