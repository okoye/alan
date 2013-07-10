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
- (void) animateFromController:(UIViewController *)from toController:(UIViewController *)toCont;
@end

@implementation EverBase
{
    UIImageView *backgroundImage;
    EverLoginController *loginController;
    EverStatusController *statusController;
    BOOL loggedIn;
}
#pragma mark - EverContainedDelegate Methods

-(void) finished:(EverContainedInterfaceViewController *) aController
{
    if (aController == loginController){ //post login event
        NSLog(@"loginController fired!");
        loggedIn = YES;
        [self animateFromController:loginController toController:statusController];
    }
    else if(aController == statusController){ //logout event
        NSLog(@"statusController fired!");
        loggedIn = NO;
        [self animateFromController:statusController toController:loginController];
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
        statusController = [[EverStatusController alloc] init];
        loginController.delegate = self;
        [self addChildViewController:loginController];
        loginController.view.frame = self.view.frame;
        loginController.delegate = self;
        [loginController didMoveToParentViewController:self];
        [self addChildViewController:statusController];
        statusController.view.frame = self.view.frame;
        [statusController didMoveToParentViewController:self];
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated
{
    //Apply styling and customization options here
    //TODO check if components exist (in case of dealloc) then initialize if necessary (like views)
    [super viewWillAppear:animated];
    [self.view setBackgroundColor:[UIColor grayColor]];
    [self.view addSubview:backgroundImage];
    
    //Now load LoginController
    [self.view addSubview: loginController.view];
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

- (void) animateFromController:(UIViewController *)fromCont toController:(UIViewController *)toCont
{
    NSLog(@"now performing smooth transition animation");
    [self transitionFromViewController:fromCont
        toViewController:toCont
        duration:0.3
        options:UIViewAnimationOptionTransitionFlipFromRight
        animations:^{
            
        } completion:^(BOOL finished) {
            //Do nothing for now
        }];
}
@end
