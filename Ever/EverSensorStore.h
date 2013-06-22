//
//  EverSensorStore.h
//  Ever
//
//  Created by Chuka Okoye on 6/16/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@interface EverSensorStore : NSObject

+ (EverSensorStore *) getStore;
-(BOOL) putGPS:(CLLocation *)location;
-(BOOL) putCompass:(CLHeading *)heading;
-(int32_t) totalSavedObjects;

@end
