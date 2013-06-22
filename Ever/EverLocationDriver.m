//
//  EverLocationDriver.m
//  Ever
//
//  Created by Chuka Okoye on 6/14/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <CoreLocation/CoreLocation.h>
#import "EverLocationDriver.h"

/**
 Purpose of this location driver is to listen for interesting events in location
 and periodically update the datastore.
 */

@interface EverLocationDriver ()
-(void) locationManager:(CLLocationManager *) manager didUpdateLocations:(NSArray *)locations;
-(void) locationManager:(CLLocationManager *) manager didFailWithError:(NSError *)error;
@end

@implementation EverLocationDriver
{
    CLLocationManager *lmanager;
}

@synthesize totalEventsRecorded;

#pragma mark - EverLocationDriver Public Methods
+ (EverLocationDriver*) getLocationDriver
{
    static EverLocationDriver *driver = nil;
    if (!driver){
        driver = [[EverLocationDriver alloc]init];
    }
    return driver;
}

-(id) init
{
    self = [super init];
    if (self){
        totalEventsRecorded = 0;
        
        //Configure location manager information
        lmanager = [[CLLocationManager alloc] init];
        lmanager.distanceFilter = 100;
        lmanager.desiredAccuracy = kCLLocationAccuracyBest; //Modify to Kilometer to shutoff GPS use.
        [lmanager setActivityType:CLActivityTypeFitness];
        [lmanager setDelegate: self];
    }
    return self;
}

- (BOOL) run
{
    [lmanager startUpdatingLocation];
    return YES;
}

- (BOOL) stop
{
    [lmanager stopUpdatingLocation];
    return YES;
}

#pragma mark - LocationManager Delegate Methods
-(void) locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
    //Insert data into store
}

-(void) locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    //If unauthorized, stop all location collection activities
    if (error.code == kCLErrorDenied){
        [manager stopUpdatingLocation];
    }
}
@end
