//
//  CompassRecord.h
//  FernandoStore
//
//  Created by Chuka Okoye on 2/17/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>


@interface CompassRecord : NSManagedObject

@property (nonatomic) int64_t recordId;
@property (nonatomic) NSTimeInterval timestamp;
@property (nonatomic) double teslaX;
@property (nonatomic) double teslaY;
@property (nonatomic) double teslaZ;
@property (nonatomic) float headingAccuracy;
@property (nonatomic) double magneticHeading;
@property (nonatomic) double trueHeading;
@property (nonatomic, retain) NSManagedObject *sessionInfo;

//TODO: add JSON representation methods

@end
