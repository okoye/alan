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
#import "EverCommon.h"
#import "EverCredentialStore.h"
#import "EverUser.h"
#import "AFHTTPClient.h"
#import "AFJSONRequestOperation.h"

@interface EverSensorStore()
-(void) sync;
-(void) storeUpdate;
@end

@implementation EverSensorStore
{
    uint32_t total_saved;
    EverCredentialStore *credentialStore;
    EverUser *user;
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
    if(self){
        credentialStore = [EverCredentialStore getStore];
        user = nil;
    }
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
    
    //FOR DEBUGGING, force out of band sync
#if EVER_DEBUG_MODE
    [self sync];
#endif
    
}

-(void) sync
{

    NSString *everAPI = @"api.lightcurvelabs.org";
    NSFetchRequest *fetchRequest = nil;
    NSInteger count = 0;
    NSError *err = nil;
    NSArray *sensorReadings = nil;
    EverAPIConnector *connector = nil;
#if EVER_DEBUG_MODE
    everAPI = @"everapi.thepuppetprojects.com";
#endif
    EverUser *currentUser = [credentialStore getAuthenticatedUser];
    if(user != currentUser && currentUser == nil){ //signed out
        NSLog(@"user signed out, no updates being sent to API");
        return;//dont send anything since we are signed out.
    }
    else if (user != currentUser && currentUser != nil){ //new sign in
        NSLog(@"new user signed in, updating authentication headers");
        user = currentUser;
    }
    else if (user == nil && currentUser == nil){
        return; //new account with no sign in
    }
    NSURL *url = [NSURL URLWithString:everAPI];
    AFHTTPClient *httpClient = [AFHTTPClient clientWithBaseURL:url];
    [httpClient setAuthorizationHeaderWithToken:[user fetchAuthenticationHeader]];
    NSMutableURLRequest *req = [httpClient requestWithMethod:@"POST" path:@"/v1/location/sensor" parameters:nil];
        
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
            //Setup rup request information including payload and context.
            connector = [[EverAPIConnector alloc] initWithRequest:req];
            [connector setPayload:sensorReadings];
            [connector setContext:managedObjectContext];
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
