//
//  CompassRecord.m
//  FernandoStore
//
//  Created by Chuka Okoye on 2/17/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "CompassRecord.h"


@implementation CompassRecord

@dynamic recordId;
@dynamic timestamp;
@dynamic teslaX;
@dynamic teslaY;
@dynamic teslaZ;
@dynamic headingAccuracy;
@dynamic magneticHeading;
@dynamic trueHeading;
@dynamic sessionInfo;

#pragma mark - CoreData Overrides
- (void)awakeFromFetch
{
    //constructor where object can be configured
    [super awakeFromFetch];
    
}

- (void)awakeFromInsert
{
    //called after object is first added to the database (created)
    [super awakeFromInsert];
    NSTimeInterval t = [[NSDate date] timeIntervalSinceReferenceDate];
    [self setTimestamp:t];
}

@end
