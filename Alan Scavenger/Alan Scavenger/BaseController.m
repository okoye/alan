//
//  ViewController.m
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/18/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "BaseController.h"
#import "SSettingsViewController.h"
#import "CircleButton.h"

@interface BaseController ()
@property (nonatomic, strong) SSettingsViewController *settings;

- (void)_settings:(id)sender;
- (void)_view;
- (void)_toggleRun:(id)sender;
- (void)_toggleWalk:(id)sender;
- (void)_toggleSit:(id)sender;
- (void)_toggleTransport:(id)sender;
- (void) _setLock:(BOOL)lock andTag:(NSInteger)tag;

@end

@implementation BaseController
{
    UIButton *running;
    UIButton *walking;
    UIButton *sitting;
    UIButton *transporting;
    BOOL locked;
    NSInteger currentActivityTag;
} 


#pragma mark - UIViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self setTitle:@"Record"];
    [[self view] setBackgroundColor:[UIColor whiteColor]];
    self.navigationItem.backBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Recordings" style:UIBarButtonItemStyleBordered target:nil action:nil];
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Settings" style:UIBarButtonItemStyleBordered target:self action:@selector(_settings:)];
    [self _view];
}

#pragma mark - Private
- (void) _settings:(id)sender
{
    [self.navigationController pushViewController:_settings animated:YES];
}

- (void) _view
{
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
    float squareSide = screenBounds.size.width/2;
    float startX = 0;
    float startY = 70;
    
    
    CGRect runRec = CGRectMake(startX, startY, squareSide, squareSide);
    CGRect walkRec = CGRectMake(startX, startY+squareSide, squareSide, squareSide);
    CGRect sitRec = CGRectMake(startX+squareSide, startY, squareSide,squareSide);
    CGRect transportRec = CGRectMake(startX+squareSide, squareSide+startY, squareSide, squareSide);
        
    running = [UIButton buttonWithType:UIButtonTypeCustom];
    [running setImage:[UIImage imageNamed:@"run"] forState:UIControlStateNormal];
    [running addTarget:self action:@selector(_toggleRun:) forControlEvents:UIControlEventTouchUpInside];
    running.frame = runRec;
    running.tag = 0;
    
    walking = [UIButton buttonWithType:UIButtonTypeCustom];
    [walking setImage:[UIImage imageNamed:@"walk"] forState:UIControlStateNormal];
    [walking addTarget:self action:@selector(_toggleWalk:) forControlEvents:UIControlEventTouchUpInside];
    walking.frame = walkRec;
    walking.tag = 1;
    
    transporting = [UIButton buttonWithType:UIButtonTypeCustom];
    [transporting setImage:[UIImage imageNamed:@"trans"] forState:UIControlStateNormal];
    [transporting addTarget:self action:@selector(_toggleTransport:) forControlEvents:UIControlEventTouchUpInside];
    transporting.frame = transportRec;
    transporting.tag = 2;
    
    sitting = [UIButton buttonWithType:UIButtonTypeCustom];
    [sitting setImage:[UIImage imageNamed:@"sit"] forState:UIControlStateNormal];
    [sitting addTarget:self action:@selector(_toggleSit:) forControlEvents:UIControlEventTouchUpInside];
    sitting.frame = sitRec;
    sitting.tag = 3;
    
    [[self view] addSubview:running];
    [[self view] addSubview:walking];
    [[self view] addSubview:transporting];
    [[self view] addSubview:sitting];    
}

- (void) _toggleRun:(id)sender
{
    if ((locked == NO) || ((locked == YES) && (currentActivityTag == running.tag))){
        if (!running.selected){ //off to on
            [running setImage:[UIImage imageNamed:@"run_on"] forState:UIControlStateNormal];
            running.selected = YES;
            [self _setLock:YES andTag:running.tag];
            NSLog(@"Now running...");
        }
        else{
            [running setImage:[UIImage imageNamed:@"run"] forState:UIControlStateNormal];
            running.selected = NO;
            locked = NO;
            [self _setLock:NO andTag:-1];
            NSLog(@"Stopped running...");
        }
    }
}

- (void) _toggleSit:(id)sender
{
    if ((locked == NO) || ((locked == YES) && (currentActivityTag == sitting.tag))){
        if (!sitting.selected){
            [sitting setImage:[UIImage imageNamed:@"sit_on" ] forState:UIControlStateNormal];
            sitting.selected = YES;
            [self _setLock:YES andTag:sitting.tag];
            NSLog(@"Now sitting...");
        }
        else{
            [sitting setImage:[UIImage imageNamed:@"sit"] forState:UIControlStateNormal];
            sitting.selected = NO;
            [self _setLock:NO andTag:-1];
            NSLog(@"Stopped sitting...");
        }
    }
}

- (void) _toggleWalk:(id)sender
{
    if ((locked == NO) || ((locked == YES) && (currentActivityTag == walking.tag))){
        if (!walking.selected) {
            [walking setImage:[UIImage imageNamed:@"walk_on"] forState:UIControlStateNormal];
            walking.selected = YES;
            [self _setLock:YES andTag:walking.tag];
            NSLog(@"Now walking...");
        }
        else{
            [walking setImage:[UIImage imageNamed:@"walk"] forState:UIControlStateNormal];
            walking.selected = NO;
            [self _setLock:NO andTag:-1];
            NSLog(@"Stopped walking...");
        }
    }
}

- (void) _toggleTransport:(id)sender
{
    if ((locked == NO) || ((locked == YES) && (currentActivityTag == transporting.tag))){
        if (!transporting.selected){
            [transporting setImage:[UIImage imageNamed:@"trans_on"] forState:UIControlStateNormal];
            transporting.selected = YES;
            [self _setLock:YES andTag:transporting.tag];
            NSLog(@"In a transport...");
        }else{
            [transporting setImage:[UIImage imageNamed:@"trans"] forState:UIControlStateNormal];
            transporting.selected = NO;
            [self _setLock:NO andTag:transporting.tag];
            NSLog(@"Got out of transport...");
        }
    }
}

- (void) _setLock:(BOOL)lock andTag:(NSInteger)tag
{
    locked = lock;
    currentActivityTag = tag;
}

@end
