//
//  GPSModel.h
//  Aggregator
//
//  Created by Chuka Okoye on 9/26/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

//TODO refactor. should have common base class with compass model

@interface GPSModel : NSObject
{
    CLLocation* location;
    NSString* activityTag;
}

- (id) initFromGPSReading: locationValue andTag:(NSString*)tag;
- (NSString*) toJSON;

@end
