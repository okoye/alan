//
//  GPS.m
//  Ever
//
//  Created by Chuka Okoye on 6/22/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "GPS.h"

@interface GPS ()
- (NSString *) stringFromDate:(NSDate *) value;
@end

@implementation GPS

@dynamic altitude;
@dynamic course;
@dynamic horizontalAccuracy;
@dynamic latitude;
@dynamic longitude;
@dynamic speed;
@dynamic timestamp;
@dynamic verticalAccuracy;

- (void) createGPS:(CLLocation *)location
{
    self.longitude = location.coordinate.longitude;
    self.latitude = location.coordinate.latitude;
    self.altitude = location.altitude;
    self.horizontalAccuracy = location.horizontalAccuracy;
    self.verticalAccuracy = location.verticalAccuracy;
    self.timestamp = [self stringFromDate: location.timestamp];
    self.speed = location.speed;
    self.course = location.course;
}

#pragma mark - GPS Private Methods
- (NSString *) stringFromDate:(NSDate *) value
{
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy'-'MM'-'dd'T'HH':'mm':'ss'Z'"];
    return [formatter stringFromDate:value];
}

@end
