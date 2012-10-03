//
//  SensingStore.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/25/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "SensingStore.h"
#import "CompassModel.h"

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
    if (size > [dataStore count]){
        size = [dataStore count];
    }
    else if (size <= 0){
        return nil;
    }
    NSMutableArray *buffer = [NSMutableArray arrayWithCapacity:size];
    while (size > 0){
        [buffer addObject: [dataStore objectAtIndex:--size]];
    }
    return buffer;
}

- (NSArray*) fetchReadingsOfType:(NSPredicate *)pred
{
    NSLog(@"Fetching readings with predicate %@",pred);
    return [dataStore filteredArrayUsingPredicate:pred];
}

- (NSUInteger) hasMoreReadings
{
    return [dataStore count];
}

- (void) removeReadings:(NSMutableArray *)objectsToRemove
{
    NSLog(@"Removing readings of size %i from datastore", [objectsToRemove count]);
    for (CompassModel *mod in objectsToRemove){
       [dataStore removeObjectIdenticalTo:mod];
    }
}

- (void) locationManager:(CLLocationManager*) manager didUpdateHeading:(CLHeading *)newHeading
{
    NSLog(@"Received heading update %@", newHeading);
    CompassModel* aReading = [[CompassModel alloc] initFromCompassReading:newHeading andTag:label];
    [aReading JSON];
    [dataStore addObject:aReading];
    NSLog(@"Size of datastore readings is %i", [dataStore count]);
}

- (void) locationManager:(CLLocationManager*) manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
    NSLog(@"Authorization status changed.");
    //TODO: if disabled, set collect to NO.
}


@end
