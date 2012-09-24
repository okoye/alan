//
//  AggroSynchroViewController.h
//  Aggregator
//
//  Created by Chuka Okoye on 9/23/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AggroSynchroViewController : UIViewController

@property(nonatomic, readonly) __weak IBOutlet UILabel* status;

- (IBAction) stationary:(id) sender;
- (IBAction) walking:(id) sender;
- (IBAction) running:(id) sender;
- (IBAction) transportation:(id) sender;

- (void) sense:(id)sender withActivityType: (NSString*) activity;

@end
