//
//  Store.h
//  FernandoStore
//
//  Created by Chuka Okoye on 2/17/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>

@interface Store : NSObject
{
}

- (int64_t) startReading:(NSString *)label;
- (BOOL) stopReadingWithId:(int64_t) readingId;
- (void) synchronize;

@end
