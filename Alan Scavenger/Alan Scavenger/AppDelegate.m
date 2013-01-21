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

- (void)applyStyling
{
    UINavigationBar* navigationBar = [UINavigationBar appearance];
    [navigationBar setBackgroundImage: UIImage imageNamed:<#(NSString *)#>]
}

@end
