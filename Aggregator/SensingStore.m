//
//  SensingStore.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/25/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "SensingStore.h"

@implementation SensingStore

+ (SensingStore*) fetchStoreOrInitializeWithSize:(NSUInteger)size
{
    static SensingStore* senseStore = nil;
    if (!senseStore){
        senseStore = [[SensingStore alloc] init];
        [senseStore initializeLocationManagerAndArray:size];
    }
    return senseStore;
}
- (void) initializeLocationManagerAndArray: (NSUInteger)size
{
    dataStore = [NSMutableArray arrayWithCapacity:size];
    collect = NO;
    locationManager = [[CLLocationManager alloc] init];
    [locationManager setHeadingFilter:1];
    [locationManager setPurpose:@"To differentiate various modes of movement"];
    [locationManager setDelegate:self];
}

- (BOOL) startCollectionWithLabel:(NSString *)currentLabel
{
    NSLog(@"starting data collection");
    [locationManager startUpdatingHeading];
    label = [currentLabel copy];
    collect = YES;
    return collect;
}

- (BOOL) stopCollection
{
    label = nil;
    collect = NO;
    [locationManager stopUpdatingHeading];
    return collect;
}

- (NSMutableArray*) fetchReadingsOfSize:(NSUInteger)size
{
    NSLog(@"Fetching readings of size %i",size);
    return nil;
}

- (void) locationManager:(CLLocationManager*) manager didUpdateHeading:(CLHeading *)newHeading
{
    NSLog(@"Received heading update %@", newHeading);
    
    //TODO: new heading should be massaged into data model including label
}

- (void) locationManager:(CLLocationManager*) manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
    NSLog(@"Authorization status changed.");
    //TODO: if disabled, set collect to NO.
}


@end
