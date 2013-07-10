//
//  EverContainedInterfaceViewController.h
//  Ever
//
//  Created by Chuka Okoye on 7/9/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol EverContainedDelegate;

@interface EverContainedInterfaceViewController : UIViewController
@property(nonatomic, weak) id <EverContainedDelegate> delegate;
@end

@protocol EverContainedDelegate <NSObject>
- (void) finished:(EverContainedInterfaceViewController *) aController;
@end
