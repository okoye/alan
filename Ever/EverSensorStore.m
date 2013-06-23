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
-(NSString *) getDatabasePath;
@end

@implementation EverSensorStore
{
    NSManagedObjectContext *context;
    NSManagedObjectModel *model;
    uint32_t total_saved;
}

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
    if (self){
        //Read data model in
        model = [NSManagedObjectModel mergedModelFromBundles:nil];
        
        //Create a store coordinator
        NSPersistentStoreCoordinator *strCoordinator =
        [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:model];
        
        //Store db somewhere
        NSError *error = nil;
        if (![strCoordinator addPersistentStoreWithType:NSSQLiteStoreType configuration:nil
                                                    URL:[NSURL fileURLWithPath:[self getDatabasePath]]
                                                options:nil error:&error]){
            NSLog(@"Could not open database, FATAL.");
            [NSException raise: @"Could not open database"
                        format:@"Reason: %@",[error localizedDescription]];
        }
        
        //Create managed object context
        context = [[NSManagedObjectContext alloc] init];
        [context setPersistentStoreCoordinator:strCoordinator];
        
        //We have no plans to undo operations
        [context setUndoManager:nil];
    }
    NSLog(@"Initialized EverSensorStore");
    return self;
}

- (BOOL) putGPS:(CLLocation *)location
{
    GPS *g = [NSEntityDescription insertNewObjectForEntityForName:@"GPS" inManagedObjectContext:context];
    [g createGPS:location];
    NSError *err = nil;
    BOOL success = [context save:&err];
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
- (NSString*) getDatabasePath
{
    //Get a list of directories where documents can be stored
    NSArray *dDirectories = NSSearchPathForDirectoriesInDomains(NSDocumentationDirectory, NSUserDomainMask, YES);
    
    //Get one and only directory from that list
    NSString *dDirectory = [dDirectories objectAtIndex: 0];
    
    NSLog(@"Directory where db will be created %@",dDirectory);
        
    //Return new path
    return [dDirectory stringByAppendingPathComponent:@"eversensorstore.data"];
}

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
    count = [context countForFetchRequest:fetch_request error:&err];
    for (int i=1; i<=count; i+=BATCH_SIZE){
        [fetch_request setFetchBatchSize:BATCH_SIZE];
        sensor_readings = [context executeFetchRequest:fetch_request error:&err];
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
