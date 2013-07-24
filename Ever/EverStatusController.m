//
//  EverStatusController.m
//  Ever
//
//  Created by Chuka Okoye on 7/5/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverStatusController.h"
#import "EverLabel.h"

@interface EverStatusController ()
-(void) toGood;
-(void) toBad; 
-(void) screenPaintingInitialization;
-(void) registerForLocationNotifications;
@end

@implementation EverStatusController
{
    UIImageView *stateContainer;
    UILabel *stateInfo;
    
}
#pragma mark - EverStatusController Public Methods
- (BOOL) allGood
{
    if ([store countUnsyncInfo] <= 10)
        return YES;
    else
        return NO;
}

#pragma mark - EverStatusController Private Methods
-(void) toGood
{
    //implement logic for good
    NSLog(@"toGood routine here");
}

-(void) toBad
{
    //implement logic for bad
    NSLog(@"toBad routine here");
}

-(void) registerForLocationNotifications
{
    
}

-(void) screenPaintingInitialization
{
    CGRect stateFrame = CGRectMake(74.0, 81.0, 175.0, 175.0);
    stateContainer = [[UIImageView alloc] initWithFrame:stateFrame];
    [stateContainer setBackgroundColor:[UIColor redColor]]; //Remove
    [self.view addSubview:stateContainer];
    
    //Setup text label to view
    CGRect infoFrame = CGRectMake(28, 301, 267, 35);
    stateInfo = [[EverLabel alloc] initWithFrame:infoFrame];
    [self.view addSubview:stateInfo];
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
    [self screenPaintingInitialization];
    [self registerForLocationNotifications];
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
