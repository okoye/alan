//
//  EverAppDelegate.h
//  Ever
//
//  Created by Chuka Okoye on 6/14/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface EverAppDelegate : UIResponder <UIApplicationDelegate>
{
    @private
    NSManagedObjectContext *managedObjectContext;
    NSManagedObjectModel *managedObjectModel
}
@property (strong, nonatomic) UIWindow *window;

@end
