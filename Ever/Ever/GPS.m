//
//  GPS.m
//  Ever
//
//  Created by Chuka Okoye on 6/17/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "GPS.h"


@implementation GPS

@dynamic longitude;
@dynamic latitude;
@dynamic altitude;
@dynamic horizontalAccuracy;
@dynamic verticalAccuracy;
@dynamic timestamp;
@dynamic speed;
@dynamic course;

- (void) createGPS:(CLLocation *)location
{
    self.longitude = location.coordinate.longitude;
    self.latitude = location.coordinate.latitude;
    self.altitude = location.altitude;
    self.horizontalAccuracy = location.horizontalAccuracy;
    self.verticalAccuracy = location.verticalAccuracy;
    self.timestamp = [location.timestamp timeIntervalSinceReferenceDate];
    self.speed = location.speed;
    self.course = location.course;
}

@end
