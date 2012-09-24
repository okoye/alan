//
//  AggroAppDelegate.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/23/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "AggroAppDelegate.h"

@implementation AggroAppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
    // Override point for customization after application launch.
    AggroSynchroViewController* syncController = [[AggroSynchroViewController alloc] init];
    UINavigationController* navController = [[UINavigationController alloc]
                                                initWithRootViewController: syncController];
    [self.window setRootViewController:navController];
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
    return YES;
}

@end
