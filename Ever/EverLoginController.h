//
//  EverLoginController.h
//  Ever
//
//  Created by Chuka Okoye on 7/5/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "EverContainedInterfaceViewController.h"

@interface EverLoginController : EverContainedInterfaceViewController <UITextFieldDelegate>

- (BOOL) isLoggedIn;
- (NSString *) fetchUsername;
- (NSString *) fetchPassword;

@end
