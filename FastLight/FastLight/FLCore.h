//
//  FLCore.h
//  FastLight
//
//  Created by Chuka Okoye on 3/2/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FLCore : NSObject

@property(nonatomic, readonly) BOOL isGlowing;

- (id) init;
- (void) glow;
- (void) diminish;

@end