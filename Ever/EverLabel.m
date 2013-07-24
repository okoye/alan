//
//  EverLabel.m
//  Ever
//
//  Created by Chuka Okoye on 7/23/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverLabel.h"

@implementation EverLabel

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        self.font = [UIFont fontWithName:@"Verdana-Bold" size:12.0];
        self.text = @"Ever is initializing...";
        self.textAlignment = NSTextAlignmentCenter;
        self.backgroundColor = [UIColor clearColor];
        self.textColor = [UIColor whiteColor];
    }
    return self;
}


@end
