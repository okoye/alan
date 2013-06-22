//
//  EverLocationDriver.h
//  Ever
//
//  Created by Chuka Okoye on 6/14/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface EverLocationDriver : NSObject <CLLocationManagerDelegate>

@property(nonatomic, readonly) NSInteger totalEventsRecorded; //How many events have we saved?
+ (EverLocationDriver *) getLocationDriver;
- (id) init; //Creates necessary objects and initializes them
- (BOOL) run; //Hook into necessary frameworks and start timers
- (BOOL) stop; //Stop all resources including location callbacks
@end
