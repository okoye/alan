//
//  AggroSynchroViewController.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/23/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "AggroSynchroViewController.h"

@interface AggroSynchroViewController ()

@end

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
    
    [[self view] setBackgroundColor:[UIColor orangeColor]];
}

- (IBAction) sense:(id)sender
{
}

@end
