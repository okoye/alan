//
//  EverBase.m
//  Ever
//
//  Created by Chuka Okoye on 6/14/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverBase.h"
#import "Ever/EverCommon.h"
#import "EverLoginController.h"
#import "EverStatusController.h"

@interface EverBase ()
- (void) animateFromController:(UIViewController *)from toController:(UIViewController *)toCont animation:(UIViewAnimationOptions) opts;
-(void) removeChild: (UIViewController *)controller;
@end

@implementation EverBase
{
    UIImageView *backgroundImage;
    EverLoginController *loginController;
    EverStatusController *statusController;
    //BOOL loggedIn;
}
#pragma mark - EverContainedDelegate Methods

-(void) finished:(EverContainedInterfaceViewController *) aController
{
    if (aController == loginController){ //post login event
        //loggedIn = YES;
        [self addChildViewController:statusController];
        [self animateFromController:loginController toController:statusController animation:UIViewAnimationOptionTransitionFlipFromRight];
    }
    else if(aController == statusController){ //logout event
        //loggedIn = NO;
        [self addChildViewController:loginController];
        [self animateFromController:statusController toController:loginController animation:UIViewAnimationOptionTransitionFlipFromLeft];
    }
    else{
        NSLog(@"non identified Controller fired");
    }
}

#pragma mark - UIViewController Methods

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        //First instantiate view controllers for this parent view
        if (IS_IPHONE_5){
            backgroundImage = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"5bg"]];
            backgroundImage.frame = self.view.frame;
        }
        else{
            backgroundImage = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"bg"]];
        }
        
        loginController = [[EverLoginController alloc] init];
        loginController.view.frame = self.view.frame;
        statusController = [[EverStatusController alloc] init];
        statusController.view.frame = self.view.frame;
        loginController.delegate = self;
        statusController.delegate = self;
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [self.view setBackgroundColor:[UIColor grayColor]];
    [self.view addSubview:backgroundImage];

    //Basically transitions from dummy base to something else
    if ([loginController isLoggedIn]){
        [self addChildViewController:statusController];
        [self.view addSubview:statusController.view];
        [statusController didMoveToParentViewController:self];
    }
    else{
        [self addChildViewController:loginController];
        [self.view addSubview:loginController.view];
        [loginController didMoveToParentViewController:self];
    }
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

#pragma mark - EverBase Private Methods

- (void) animateFromController:(UIViewController *)fromCont toController:(UIViewController *)toCont animation:(UIViewAnimationOptions) opts
{
    NSLog(@"now performing smooth transition animation");
    [self transitionFromViewController:fromCont
        toViewController:toCont
        duration:0.3
        options:opts
        animations:^{}
        completion:^(BOOL finished) {
            [toCont didMoveToParentViewController:self];
            [fromCont.view removeFromSuperview];
            [fromCont removeFromParentViewController];
        }];
}
@end
