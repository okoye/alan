//
//  ViewController.m
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/18/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "BaseController.h"
#import "SSettingsViewController.h"

@interface BaseController ()
@property (nonatomic, strong) SSettingsViewController *settings;

- (void) _loadSettings:(id)sender;
@end

@implementation BaseController{
    //Global vars
}

@synthesize settings = _settings;

#pragma mark - UIViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self setTitle:@"Record"];
    self.navigationItem.backBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Recordings" style:UIBarButtonItemStyleBordered target:nil action:nil];
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Settings" style:UIBarButtonItemStyleBordered target:self action:@selector(_loadSettings:)];
    //self.navigationItem.rightBarButtonItem.width = 4000.0f;
}

#pragma mark - Private
- (void) _loadSettings:(id)sender
{
    [self.navigationController pushViewController:_settings animated:YES];
}
@end
