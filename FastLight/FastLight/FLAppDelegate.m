//
//  FLAppDelegate.m
//  FastLight
//
//  Created by Chuka Okoye on 3/2/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "FLAppDelegate.h"

#import "FLViewController.h"

@implementation FLAppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.viewController = [[FLViewController alloc] initWithNibName:@"FLViewController" bundle:nil];
    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];
    return YES;
}
@end
