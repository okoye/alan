//
//  AggroActivityRecorderViewController.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/25/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "AggroActivityRecorderViewController.h"


@implementation AggroActivityRecorderViewController

@synthesize storeFront, recordingTag;

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
    //TODO: setup pressdown and press up functionality
    [storeFront startCollectionWithLabel: [self recordingTag]];
}

- (IBAction) stopRecording:(id)sender
{
    NSLog(@"Stopped recording data");
    //TODO: setup pressdown and press up functionality
    [storeFront stopCollection];
}

- (IBAction) synchronize:(id)sender
{
    NSLog(@"Synchronizing with api");
    
    while ([storeFront hasMoreReadings]){
        //fetch in batches of 10, then convert to json.
    }
}

- (void) setRecorderTitle:(NSString *)rec andStoreFront:(SensingStore *)storeF
{
    [[self navigationItem] setTitle:rec];
    [self setStoreFront:storeF];
    recordingTag = [rec copy];
}

- (void) sizeChanged:(NSUInteger) count
{
    //callback for when size changes in store front
}

@end
