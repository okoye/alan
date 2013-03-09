//
//  Store.m
//  FernandoStore
//
//  Created by Chuka Okoye on 2/17/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "Store.h"
#import "CompassRecord.h"

@interface Store ()
{
    @private
    NSMutableArray *readingsBuffer;
    NSMutableArray *allSessionInfo;
    NSManagedObjectContext *context;
    NSManagedObjectModel *model;
    int64_t lastRecordId;
    int64_t currentSessionId;
}
- (CompassRecord *) createCompassRecord; //Instantiate and return a new compass record
- deleteCompassRecord:(CompassRecord *) recordToDelete; //Gerrout of here
- (NSString *)dbPath; //Where is my database located?
- (BOOL) save; //Save all objects in database
@end

@implementation Store

- (id)init
{
    self = [super init];
    if (self){
        //Read in datamodel
        model = [NSManagedObjectModel mergedModelFromBundles:nil];
        
        //Setup actual store coordinator
        NSPersistentStoreCoordinator *storeCoordinator = [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:model];
        
        //Where should I store my db
        NSError *error = nil;
        if (![storeCoordinator addPersistentStoreWithType:NSSQLiteStoreType
                                            configuration: nil
                                            URL: [NSURL fileURLWithPath:[self dbPath]]
                                            options:nil
                                                    error:&error]){
            [NSException raise:@"Could not open database"
                           format:@"Reason: %@",[error localizedDescription]];
        }
        
        //Create managed object context
        context = [[NSManagedObjectContext alloc] init];
        [context setPersistentStoreCoordinator:storeCoordinator];
        
        //Dont need undo operations
        [context setUndoManager:nil];
    }
    return self;
}

#pragma mark - Store Methods

- (CompassRecord *) createCompassRecord
{
    CompassRecord *c  = [NSEntityDescription insertNewObjectForEntityForName:@"CompassRecord" inManagedObjectContext:context];
    //now, implement record specific properties
    //TODO
}

- (BOOL) save
{
    NSError *err = nil;
    //Save objects to local database (flush)
    BOOL success = [context save: &err];
    if (!success){
        NSLog(@"Error saving to db: %@", [err localizedDescription]);
    }
    return success;
}

- (NSString *)dbPath
{
    //Get a list of directories where documents can be stored
    NSArray *documentDirectories = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    
    //Get one and only document directory from that list
    NSString *documentDirectory = [documentDirectories objectAtIndex:0];
    
    //Return the new db path
    return [documentDirectory stringByAppendingPathComponent:@"store.data"];
}
@end
