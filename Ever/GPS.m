//
//  GPS.m
//  Ever
//
//  Created by Chuka Okoye on 6/22/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "GPS.h"


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
    self.timestamp = [location.timestamp timeIntervalSinceReferenceDate];
    self.speed = location.speed;
    self.course = location.course;
}

@end
