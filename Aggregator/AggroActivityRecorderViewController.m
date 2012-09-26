//
//  AggroActivityRecorderViewController.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/25/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "AggroActivityRecorderViewController.h"


@implementation AggroActivityRecorderViewController

@synthesize senseManager;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        [[self navigationItem] setTitle:@"Recorder"];
    }
    return self;
}

- (IBAction) startRecording:(id)sender
{
    NSLog(@"Started recording data");
}

- (IBAction) stopRecording:(id)sender
{
    NSLog(@"Stopped recording data");
}

- (void) setRecorderTitle:(NSString *)rec
{
    [[self navigationItem] setTitle:rec];
}

@end
