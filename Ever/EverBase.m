//
//  EverBase.m
//  Ever
//
//  Created by Chuka Okoye on 6/14/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverBase.h"
#import "EverLocationDriver.h"
#import "EverSensorStore.h"

@interface EverBase ()

@end

@implementation EverBase
{
    
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        [[self navigationItem] setTitle:@"Ever"];
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [self.view setBackgroundColor:[UIColor grayColor]];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
