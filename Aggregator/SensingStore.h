//
//  SensingStore.h
//  Aggregator
//
//  Created by Chuka Okoye on 9/25/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@interface SensingStore : NSObject <CLLocationManagerDelegate>
{
    @private
    NSMutableArray* dataStore;
    NSString* label;
    CLLocationManager* locationManager;
    BOOL collect;
}
//TODO: singleton
+ (SensingStore*) fetchStoreOrInitializeWithSize:(NSUInteger)size;

- (BOOL) startCollectionWithLabel:(NSString*)currentLabel;

- (BOOL) stopCollection;

- (NSMutableArray*) fetchReadingsOfSize:(NSUInteger)size;

- (void) removeReadings:(NSMutableArray*)objectsToRemove;

- (BOOL) hasMoreReadings;

@end
