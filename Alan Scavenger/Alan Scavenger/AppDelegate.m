//
//  AppDelegate.m
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/18/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "AppDelegate.h"

#import "BaseController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    // Override point for customization after application launch.
    
    UIViewController *baseController =  [[BaseController alloc] initWithNibName:@"BaseView" bundle:nil];
    UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:baseController];
    
    //Customize the window appearance (primarily navigation bar)
    [self applyStyling];
    
    
    self.window.rootViewController = navController;
    [self.window makeKeyAndVisible];
    return YES;
}

#pragma mark - Styling

- (void)applyStyling
{
    //Navigation bar
    UINavigationBar* navigationBar = [UINavigationBar appearance];
    [navigationBar setBackgroundImage: [UIImage imageNamed:@"top_nav"] forBarMetrics:UIBarMetricsDefault];
    [navigationBar setTitleVerticalPositionAdjustment:0.0f forBarMetrics:UIBarMetricsDefault];
    [navigationBar setTitleTextAttributes:[[NSDictionary alloc] initWithObjectsAndKeys:
                                [UIColor colorWithWhite:0.0f alpha:0.2f], UITextAttributeTextShadowColor,
                                [NSValue valueWithUIOffset:UIOffsetMake(0.0f, 1.0f)], UITextAttributeTextShadowOffset,
                                [UIColor whiteColor], UITextAttributeTextColor,
                                nil]];
   //Navigation button
   NSDictionary *barButtonTitleTextAttributes = [[NSDictionary alloc] initWithObjectsAndKeys:
                                [UIColor colorWithWhite:0.0f alpha:0.2f], UITextAttributeTextShadowColor,
                                [NSValue valueWithUIOffset:UIOffsetMake(0.0f, 1.0f)], UITextAttributeTextShadowOffset,
                                [UIColor whiteColor], UITextAttributeTextColor,
                                nil];
    
    UIBarButtonItem *barButton = [UIBarButtonItem appearanceWhenContainedIn:[UINavigationBar class], nil];
    
    [barButton setTitleTextAttributes:barButtonTitleTextAttributes forState:UIControlStateNormal];
    [barButton setTitleTextAttributes:barButtonTitleTextAttributes forState:UIControlStateHighlighted];
    [barButton setTintColor:[UIColor colorWithRed:0.38f green:0.7568f blue:0.9f alpha:1.0f]];
    
    //Navigation back button
    [barButton setBackButtonTitlePositionAdjustment:UIOffsetMake(2.0f, -2.0f) forBarMetrics:UIBarMetricsDefault];
    //TODO set back button background image
}

@end
