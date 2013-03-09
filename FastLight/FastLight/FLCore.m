//
//  FLCore.m
//  FastLight
//
//  Created by Chuka Okoye on 3/2/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import <AVFoundation/AVFoundation.h>
#import "FLCore.h"

@interface FLCore ()
- (void) flashOn:(BOOL) state;
@end

@implementation FLCore
{
    AVCaptureDevice *device;
}

@synthesize isGlowing;

#pragma mark - FastLight methods

- (id) init
{
    self = [super init];
    if (self){
        //Initialize state variables
        isGlowing = NO;
        device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    }
    return self;
}

- (void) glow
{
    //Turn on
    [self flashOn: YES];
}

- (void) diminish
{
    //Turn off
    [self flashOn: NO];
}

#pragma mark - Private methods

- (void) flashOn:(BOOL)state
{
    if ([device hasTorch]){
        [device lockForConfiguration:nil];
        [device setTorchMode: state ? AVCaptureTorchModeOn : AVCaptureTorchModeOff];
        [device unlockForConfiguration];
    }
}
@end
