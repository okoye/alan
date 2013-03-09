//
//  FLViewController.m
//  FastLight
//
//  Created by Chuka Okoye on 3/2/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "FLViewController.h"
#import "FLCore.h"

#define IS_WIDESCREEN ( fabs( ( double )[ [ UIScreen mainScreen ] bounds ].size.height - ( double )568 ) < DBL_EPSILON )
#define IS_IPHONE ( [ [ [ UIDevice currentDevice ] model ] isEqualToString: @"iPhone" ] )
#define IS_IPOD   ( [ [ [ UIDevice currentDevice ] model ] isEqualToString: @"iPod touch" ] )
#define IS_IPHONE_5 ( IS_IPHONE && IS_WIDESCREEN )

@interface FLViewController ()
- (void) toggleLight: (id) sender;
@end

@implementation FLViewController
{
    FLCore *flash;
    UIButton *light;
}

#pragma mark - UIViewController

- (id) initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self){
        flash = [[FLCore alloc] init];
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self setTitle:@"FastLight"];
    
    UIImageView *backgroundImageView = nil;
    if (IS_IPHONE_5){
        backgroundImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"bg-568h"]];
        backgroundImageView.frame = self.view.frame;
    }
    else{
        backgroundImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"bg"]];
    }
    
    [self.view addSubview: backgroundImageView];
    float centerX = [[UIScreen mainScreen] bounds].size.width/2;
    float centerY = [[UIScreen mainScreen] bounds].size.height/2;
    float side = 250;
    CGRect rec = CGRectMake(centerX-(side/2.0), centerY-(side/2), side, side);
    light = [UIButton buttonWithType:UIButtonTypeCustom];
    [light setImage:[UIImage imageNamed:@"inactive_button"] forState:UIControlStateNormal];
    [light setImage:[UIImage imageNamed:@"active_button"] forState:UIControlStateHighlighted];
    [light setImage:[UIImage imageNamed:@"active_button"] forState:UIControlStateSelected];
    [light addTarget:self action:@selector(toggleLight:) forControlEvents:UIControlEventTouchUpInside];

    light.adjustsImageWhenHighlighted = NO;
    light.center = CGPointMake(centerX, centerY);
    light.frame = rec;
    
    [[self view] addSubview:light];
    [self toggleLight:self];
}

#pragma mark - FLViewController

- (void) toggleLight: (id) sender
{
    light.selected = light.selected ? NO : YES;
    if (light.selected){
        [flash glow];
    }
    else{
        [flash diminish];
    }
}

@end
