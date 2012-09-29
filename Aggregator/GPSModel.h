//
//  GPSModel.h
//  Aggregator
//
//  Created by Chuka Okoye on 9/26/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@interface GPSModel : NSObject
{
    CLLocation* location;
}

- (id) initFromGPSReading: locationValue;
- (NSString*) toJSON;
//TODO: properties of a gps object
//TODO: class method initializing object from CLLocation
@end
