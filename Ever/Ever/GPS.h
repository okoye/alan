//
//  GPS.h
//  Ever
//
//  Created by Chuka Okoye on 6/17/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>
#import <CoreLocation/CoreLocation.h>


@interface GPS : NSManagedObject

@property (nonatomic) float longitude;
@property (nonatomic) float latitude;
@property (nonatomic) float altitude;
@property (nonatomic) float horizontalAccuracy;
@property (nonatomic) float verticalAccuracy;
@property (nonatomic) NSTimeInterval timestamp;
@property (nonatomic) float speed;
@property (nonatomic) float course;

- (void) createGPS:(CLLocation *) location;

@end
