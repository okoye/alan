//
//  EverBase.m
//  Ever
//
//  Created by Chuka Okoye on 6/14/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverBase.h"
#import "Ever/EverCommon.h"
#import "EverLocationDriver.h"
#import "EverSensorStore.h"

@interface EverBase ()

@end

@implementation EverBase
{
    UIImageView *backgroundImage;
}

#pragma mark - UIViewController Methods

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        //First instantiate view controllers for this parent view
        backgroundImage = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"bg"]];
        //Now instantiate child view controllers and add to hierarchy
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated
{
    //Apply styling and customization options here
    [super viewWillAppear:animated];
    [self.view setBackgroundColor:[UIColor grayColor]];
    [self.view addSubview:backgroundImage];
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

#pragma mark - EverBase Methods

- (void) toLogin
{
    
}

- (void) toStatus
{
    
}

@end
