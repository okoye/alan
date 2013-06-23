//
//  EverLocationDriver.h
//  Ever
//
//  Created by Chuka Okoye on 6/14/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "EverSensorStore.h"

@interface EverLocationDriver : NSObject <CLLocationManagerDelegate>

@property(nonatomic, readonly) NSInteger totalEventsRecorded; //How many events have we saved?
@property(nonatomic, strong) EverSensorStore *store;
+ (EverLocationDriver *) getLocationDriver;
- (BOOL) start; //Hook into necessary frameworks and start timers
- (BOOL) stop; //Stop all resources including location callbacks
@end
