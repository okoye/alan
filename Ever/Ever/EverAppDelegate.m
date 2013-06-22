//
//  EverAppDelegate.m
//  Ever
//
//  Created by Chuka Okoye on 6/14/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverAppDelegate.h"
#import "EverBase.h"

@implementation EverAppDelegate

@synthesize managedObjectContext = _managedObjectContext;
@synthesize managedObjectModel = _managedObjectModel;
@synthesize persistentStoreCoordinator = _persistentStoreCoordinator;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    UIViewController *baseController = [[EverBase alloc] initWithNibName:@"Home" bundle:nil];
    self.window.rootViewController = baseController;
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
    return YES;
}

@end
