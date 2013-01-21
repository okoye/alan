//
//  ViewController.m
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/18/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "BaseController.h"

@implementation BaseController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self){
        //Initialize and customize controller object
        //Apply some styling
        [self apply_styling];
        
        //Add right settings nav button
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

#pragma mark - Styling

- (void) apply_styling
{
    //Customize navigation bar styling and background
}
@end
