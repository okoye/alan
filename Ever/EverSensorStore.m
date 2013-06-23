//
//  EverSensorStore.m
//  Ever
//
//  Created by Chuka Okoye on 6/16/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverSensorStore.h"
#import "GPS.h"
#import "EverAPIConnector.h"

@interface EverSensorStore()
-(void) sync;
@end

@implementation EverSensorStore
{
    uint32_t total_saved;
}

@synthesize managedObjectContext;
static NSUInteger BATCH_SIZE = 100; //Size of records to send

#pragma mark - EverSensorStore Public Methods
+ (EverSensorStore *) getStore
{
    static EverSensorStore *store = nil;
    if (!store){
        store = [[EverSensorStore alloc] init];
    }
    return store;
}

- (id) init
{
    self = [super init];
    return self;
}

- (BOOL) putGPS:(CLLocation *)location
{
    GPS *g = [NSEntityDescription insertNewObjectForEntityForName:@"GPS" inManagedObjectContext:managedObjectContext];
    [g createGPS:location];
    NSError *err = nil;
    BOOL success = [managedObjectContext save:&err];
    if (!success){
        NSLog(@"Failed to save new GPS object: %@",[err localizedDescription]);
    }
    if (success)
        total_saved++;
    NSLog(@"Successfully saved a new record: %c",success);
    return success;
}

- (BOOL) putCompass:(CLHeading *)heading
{
    //TODO
    return YES;
}

- (int32_t) totalSavedObjects
{
    return total_saved;
}


#pragma mark - EverSensorStore Private Methods
-(void) sync
{

    NSString *everAPI = @"api.lightcurvelabs.org/location";
    NSFetchRequest *fetch_request = nil;
    NSInteger count = 0;
    NSError *err = nil;
    NSArray *sensor_readings = nil;
    EverAPIConnector *connector = nil;
#if EVER_DEBUG_MODE
    everAPI = @"api.thepuppetprojects.com";
#endif
    NSURL *url = [NSURL URLWithString:everAPI];
    NSMutableURLRequest *req = [NSMutableURLRequest requestWithURL:url];
    
    //void (^success_callback)(NSManagedObjectContext *cxt, NSArray *values) = ^(NSManagedObjectContext *cxt, NSArray *values){
    //};
    
    //void (^error_callback)void;
    
    //Send all the data in batches
    fetch_request = [[NSFetchRequest alloc] initWithEntityName:@"GPS"];
    count = [managedObjectContext countForFetchRequest:fetch_request error:&err];
    for (int i=1; i<=count; i+=BATCH_SIZE){
        [fetch_request setFetchBatchSize:BATCH_SIZE];
        sensor_readings = [managedObjectContext executeFetchRequest:fetch_request error:&err];
        if (!sensor_readings){
            NSLog(@"failed to retrieve data from persistent store: %@",err);
        }
        else{
            NSLog(@"successfully retrieved data from persistent store");
            connector = [[EverAPIConnector alloc] initWithRequest:req];
            [connector start];
        }
    }
}
@end
