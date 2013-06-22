//
//  EverSensorStore.m
//  Ever
//
//  Created by Chuka Okoye on 6/16/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverSensorStore.h"
#import "GPS.h"

@interface EverSensorStore ()
{
}
-(void) sync;
-(NSString *) getDatabasePath;
@end

@implementation EverSensorStore
{
    NSManagedObjectContext *context;
    NSManagedObjectModel *model;
    uint32_t total_saved;
    dispatch_queue_t async_queue;
    NSArray *incomplete_requests;
}

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
        
        //Create asynchronous processing queue
        async_queue = dispatch_queue_create("org.lightcurvelabs.ever", 0);
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
    
    //Return new path
    return [dDirectory stringByAppendingPathComponent:@"eversensorstore.data"];
}

-(void) sync
{
    //next, using a bunch of data retrieved from store, execute asynchronously:
    //http://tewha.net/2012/06/networking-using-nsurlconnection/
    //http://developer.apple.com/library/mac/#featuredarticles/BlocksGCD/_index.html
    
    NSString *everAPI = @"everapi.lightcurvelabs.org/location";
    //Convert records to JSON
#if EVER_DEBUG_MODE
    everAPI = @"everapi.thepuppetprojects.com";
    jsonWriter.humanReadable = YES;
    NSString *jsonRepresentation = [jsonWriter stringWithObject:values];
    NSLog(@"This is what will be sent to the API, %@",jsonRepresentation);
#endif
    
    //Send over wire using async connection
    NSURL *url = [NSURL URLWithString:everAPI];
    NSMutableURLRequest *req = [NSMutableURLRequest requestWithURL:url];
    
    void (^callback)(NSManagedObjectContext *cxt, NSArray *values) = ^(NSManagedObjectContext *cxt, NSArray *values){
    };
    
    
    // dispatch_async(async_queue, ^(void){
    //    printf("Now executing async queue operations");
    //});
    
}
@end
