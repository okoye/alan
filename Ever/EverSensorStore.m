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
-(void) storeUpdate;
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
    [self storeUpdate];
    return success;
}

- (BOOL) putCompass:(CLHeading *)heading
{
    //TODO
    [self storeUpdate];
    return YES;
}

- (NSUInteger) countTotalInfo
{
    //TODO update notification center
    return total_saved;
}

- (NSUInteger) countUnsyncInfo
{
    //TODO update notification center
    NSFetchRequest *storeCount = [[NSFetchRequest alloc] initWithEntityName:@"GPS"];
    NSError *error = nil;
    return [managedObjectContext countForFetchRequest:storeCount error:&error];
}


#pragma mark - EverSensorStore Private Methods

-(void) storeUpdate
{
    //Callback hooks for when an update occurs in the store
    const NSUInteger MAGIC_NUMBER = 4;
    
    if (arc4random()%10 == MAGIC_NUMBER){
        NSLog(@"magic number called, syncing to service");
        [self sync];
    }
    
    //DEBUGGING
    [self sync];
    
}

-(void) sync
{

    NSString *everAPI = @"api.lightcurvelabs.org/location";
    NSFetchRequest *fetchRequest = nil;
    NSInteger count = 0;
    NSError *err = nil;
    NSArray *sensorReadings = nil;
    EverAPIConnector *connector = nil;
#if EVER_DEBUG_MODE
    everAPI = @"api.thepuppetprojects.com";
#endif
    NSURL *url = [NSURL URLWithString:everAPI];
    NSMutableURLRequest *req = [NSMutableURLRequest requestWithURL:url];
        
    //Send all the data in batches
    fetchRequest = [[NSFetchRequest alloc] initWithEntityName:@"GPS"];
    count = [managedObjectContext countForFetchRequest:fetchRequest error:&err];
    for (int i=1; i<=count; i+=BATCH_SIZE){
        [fetchRequest setFetchBatchSize:BATCH_SIZE];
        sensorReadings = [managedObjectContext executeFetchRequest:fetchRequest error:&err];
        if (!sensorReadings){
            NSLog(@"failed to retrieve data from persistent store: %@",err);
        }
        else{
            NSLog(@"successfully retrieved data from persistent store");
            connector = [[EverAPIConnector alloc] initWithRequest:req];
            [connector setSuccess_block:^{
                //code here
                NSLog(@"success logic is being executed");
            }];
            [connector setFailure_block:^{
                //code
                NSLog(@"failure logic is being executed");
            }];
            [connector start];
        }
    }
}
@end
