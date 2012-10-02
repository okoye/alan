//
//  AggroActivityRecorderViewController.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/25/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "AggroActivityRecorderViewController.h"


@implementation AggroActivityRecorderViewController

@synthesize storeFront, recordingTag, sync, start, stop, status;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        [[self navigationItem] setTitle:@"Recorder"];
    }
    return self;
}

- (void) viewWillAppear:(BOOL)animated
{
    NSLog(@"Setting up view data");
    if (![storeFront hasMoreReadings]){
        [sync setEnabled: NO];
    }
    if ([start isEnabled]){
        [stop setEnabled:NO];
    }
    status.text = [self readingsTaken];
    [super viewWillAppear:animated];
}

- (void) viewWillDisappear:(BOOL)animated
{
    NSLog(@"Cleaning up recorder view data");
    [storeFront stopCollection];
}

- (IBAction) startRecording:(id)sender
{
    NSLog(@"Started recording data");
    [start setEnabled:NO];
    [stop setEnabled:YES];
    [sync setEnabled:YES];
    [storeFront startCollectionWithLabel: [self recordingTag]];
}

- (IBAction) stopRecording:(id)sender
{
    NSLog(@"Stopped recording data");
    [start setEnabled:YES];
    [stop setEnabled:NO];
    [sync setEnabled:YES];
    [storeFront stopCollection];
    status.text = [self readingsTaken];
}

- (IBAction) synchronize:(id)sender
{
    NSLog(@"Synchronizing with api");
    
   // while ([storeFront hasMoreReadings]){
        //fetch in batches of 10, then convert to json.
        //TODO: should eventually be asynchronous
   // }
}

- (void) setRecorderTitle:(NSString *)rec andStoreFront:(SensingStore *)storeF
{
    [[self navigationItem] setTitle:rec];
    [self setStoreFront:storeF];
    recordingTag = [rec copy];
}

- (NSString*) readingsTaken
{
    return [[NSNumber numberWithInt:[storeFront hasMoreReadings]] stringValue];
}

@end
