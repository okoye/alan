//
//  EverStatusController.m
//  Ever
//
//  Created by Chuka Okoye on 7/5/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverStatusController.h"

@interface EverStatusController ()

@end

@implementation EverStatusController

#pragma mark - EverStatusController Public Methods
- (BOOL) allGood
{
    if ([store countUnsyncInfo] <= 10)
        return YES;
    else
        return NO;
}

#pragma mark - UIViewController Methods
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        store = [EverSensorStore getStore];
    }
    return self;
}

- (void) viewWillAppear:(BOOL)animated
{
    self.view.alpha = 1.0;
}
- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
