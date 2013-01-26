//
//  ViewController.m
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/18/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "BaseController.h"
#import "SSettingsViewController.h"
#import "SStateControl.h"

@interface BaseController ()
@property (nonatomic, strong) SSettingsViewController *settings;

- (void) _loadSettings:(id)sender;
- (void) _drawStateControls;

@end

@implementation BaseController{
    float sensingViewWidth;
    float sensingViewHeight;
    NSDictionary *circles;
}

@synthesize settings = _settings;

#pragma mark - UIViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self setTitle:@"Record"];
    self.navigationItem.backBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Recordings" style:UIBarButtonItemStyleBordered target:nil action:nil];
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Settings" style:UIBarButtonItemStyleBordered target:self action:@selector(_loadSettings:)];
    [self _drawStateControls];
}

#pragma mark - Private
- (void) _loadSettings:(id)sender
{
    [self.navigationController pushViewController:_settings animated:YES];
}

- (void) _drawStateControls
{
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
    float squareSide = screenBounds.size.width/3.0;
    float startX = 0;
    float startY = 70;
    CGRect runRec = CGRectMake(squareSide, startY, squareSide, squareSide);
    CGRect walkRec = CGRectMake(squareSide+(38.71*2*0.707), squareSide+startY, squareSide, squareSide);
    CGRect stationRec = CGRectMake(squareSide, (2*squareSide)+startY, squareSide, squareSide);
    CGRect transportRec = CGRectMake(startX, squareSide+startY, squareSide, squareSide);
    
    circles = [[NSDictionary alloc] initWithObjectsAndKeys:
               [[SStateControl alloc] initWithFrame:runRec ], @"running",
               [[SStateControl alloc] initWithFrame:walkRec], @"walking",
               [[SStateControl alloc] initWithFrame:stationRec], @"stationary",
               [[SStateControl alloc] initWithFrame:transportRec], @"transport",
               nil];

    NSEnumerator *enumerator = [circles objectEnumerator];
    id enumValue;
    while ((enumValue = [enumerator nextObject])){
        [self.view addSubview:enumValue];
    }
}
@end
