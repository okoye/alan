//
//  AppDelegate.m
//  FernandoStore
//
//  Created by Chuka Okoye on 2/16/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "AppDelegate.h"

#import "ViewController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
    UIViewController *baseController = [[ViewController alloc] initWithNibName:@"ViewController" bundle:nil];
    UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:baseController];
    
    self.window.rootViewController = navController;
    [self.window makeKeyAndVisible];
    return YES;
}
@end
