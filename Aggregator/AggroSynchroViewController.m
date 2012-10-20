//
//  AggroSynchroViewController.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/23/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "AggroSynchroViewController.h"
#import "AggroActivityRecorderViewController.h"

@implementation AggroSynchroViewController

@synthesize store, status;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        //Now, configure Navigation bar elements
        [[self navigationItem] setTitle:@"Aggregator"];
        
        //Now configure datastores
        store = [SensingStore fetchStoreOrInitializeWithSize:10000];
    }
    return self;
}

- (void) viewWillAppear: (BOOL)animated
{
    [super viewWillAppear: animated];
    status.text = @"";
}

- (IBAction) stationary:(id)sender
{
    NSLog(@"Stationary activity is being executed");
    [self sense:sender withActivityType:@"Stationary"];
}

- (IBAction) walking:(id)sender
{
    NSLog(@"Walking activity is being executed");
    [self sense:sender withActivityType:@"Walking"];
}

- (IBAction) running:(id)sender
{
    NSLog(@"Running activity is being executed");
    [self sense:sender withActivityType:@"Running"];
}

- (IBAction) transportation:(id)sender
{
    NSLog(@"Transportation activity is being executed");
    [self sense:sender withActivityType:@"Transportation"];
}

- (void) sense:(id)sender withActivityType: (NSString*) activity
{
    //Pop new view into view stack with necessary info.
    NSLog(@"Now initializing view for %@", activity);
    AggroActivityRecorderViewController* activityRec = [[AggroActivityRecorderViewController alloc] initWithNibName:@"ActivityRecorderView" bundle:nil];
    [activityRec setRecorderTitle:activity andStoreFront:store];
    
    [[self navigationController] pushViewController:activityRec animated:YES];
}


@end
