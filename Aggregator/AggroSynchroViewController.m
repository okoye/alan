//
//  AggroSynchroViewController.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/23/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "AggroSynchroViewController.h"

@implementation AggroSynchroViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        //Now, configure Navigation bar elements
        [[self navigationItem] setTitle:@"Aggregator"];
        
        //Now configure datastores
    }
    return self;
}

- (void) viewWillAppear: (BOOL)animated
{
    [super viewWillAppear: animated];    
}

- (IBAction) stationary:(id)sender
{
    NSLog(@"Stationary activity is being executed");
}

- (IBAction) walking:(id)sender
{
    NSLog(@"Walking activity is being executed");
}

- (IBAction) running:(id)sender
{
    NSLog(@"Running activity is being executed");
}

- (IBAction) transportation:(id)sender
{
    NSLog(@"Transportation activity is being executed");
}

- (void) sense:(id)sender withActivityType: (NSString*) activity
{
    //Pop new view into view stack with necessary info.
    NSLog(@"Now initializing view for %@", activity);
}


@end
