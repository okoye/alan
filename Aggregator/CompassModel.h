//
//  CompassModel.h
//  Aggregator
//
//  Created by Chuka Okoye on 9/27/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@interface CompassModel : NSObject
{
    CLHeading* heading;
    NSString* activityTag;
}

- (id) initFromCompassReading:(CLHeading*) heading andTag:(NSString*)tag;
- (id) JSON;

@end
