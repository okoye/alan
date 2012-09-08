//
//  ViewController.h
//  Counting
//
//  Created by Chuka Okoye on 9/8/12.
//  Copyright (c) 2012 Chuka Okoye. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
{
    UILabel* display;
}

@property (nonatomic, retain) IBOutlet UILabel* display;

- (IBAction) add: (id) sender;
- (IBAction) sub: (id) sender;
- (IBAction) dble: (id) sender;
- (IBAction) opposite: (id) sender;
- (IBAction) reset;

@end
