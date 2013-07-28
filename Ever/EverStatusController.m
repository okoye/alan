//
//  EverStatusController.m
//  Ever
//
//  Created by Chuka Okoye on 7/5/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverStatusController.h"
#import "EverLabel.h"
#import "EverCredentialStore.h"

@interface EverStatusController ()
-(void) toGood;
-(void) toBad; 
-(void) screenPaintingInitialization;
-(void) registerForLocationNotifications;
-(void) setState;
-(void) onLogout:(id) logoutSubmit;
@end

@implementation EverStatusController
{
    UIImageView *stateContainer;
    UILabel *stateInfo;
    UIButton *logout;
    EverCredentialStore *credentialStore;
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
    stateContainer.image = [UIImage imageNamed:@"connected"];
    stateInfo.text = @"Ever is analyzing your lifestyle";
}

-(void) toBad
{
    stateContainer.image = [UIImage imageNamed:@"not-connected"];
    stateInfo.text = @"Ever is not connected";
}

-(void) setState
{
    if ([self allGood]){
        [self toGood];
    }
    else{
        [self toBad];
    }
}

-(void) registerForLocationNotifications
{
    
}

-(void) onLogout:(id)logoutSubmit
{
    NSLog(@"onLogout fired");
    [credentialStore logout];
    [self.delegate finished:self];
}

-(void) screenPaintingInitialization
{
    [self.view setBackgroundColor: [UIColor clearColor]];
    CGRect stateFrame = CGRectMake(74.0, 61.0, 175.0, 175.0);
    stateContainer = [[UIImageView alloc] initWithFrame:stateFrame];
    //[stateContainer setBackgroundColor:[UIColor purpleColor]];
    [self.view addSubview:stateContainer];
    
    //Setup text label to view
    CGRect infoFrame = CGRectMake(28, stateFrame.origin.y+stateFrame.size.height+45, 267, 35);
    stateInfo = [[EverLabel alloc] initWithFrame:infoFrame];
    [self.view addSubview:stateInfo];
    
    //Setup logout button
    CGRect logoutFrame = CGRectMake(249.0, 0.0, 73.0, 31.0);
    logout = [[UIButton alloc] initWithFrame:logoutFrame];
    [logout setBackgroundColor:[UIColor clearColor]];
    [logout setBackgroundImage:[UIImage imageNamed:@"logout"] forState:UIControlStateNormal];
    [logout addTarget:self action:@selector(onLogout:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:logout];
}

#pragma mark - UIViewController Methods
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        store = [EverSensorStore getStore];
        self.wantsFullScreenLayout = YES;
        credentialStore = [EverCredentialStore getStore];
    }
    return self;
}

- (void) viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [self registerForLocationNotifications];
    [self setState];
}
- (void)viewDidLoad
{
    [super viewDidLoad];
    [self screenPaintingInitialization];
}
- (void) viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}
- (void) viewWillDisappear:(BOOL)animated
{
    //unregister for notifications.
}
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

@end
