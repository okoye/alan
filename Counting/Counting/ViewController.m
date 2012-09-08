//
//  ViewController.m
//  Counting
//
//  Created by Chuka Okoye on 9/8/12.
//  Copyright (c) 2012 Chuka Okoye. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

- (IBAction) add:(id)sender
{
    NSLog(@"Incrementing value in label");
}

- (IBAction) sub:(id)sender
{
    NSLog(@"Decrementing value in label");
}

- (IBAction) dble:(id)sender
{
    NSLog(@"Doubling value in label");
}

- (IBAction) opposite:(id)sender
{
    NSLog(@"Multiplying value in label by -1");
}

- (IBAction) reset
{
    NSLog(@"Resetting the whole application");
}

- (BOOL) isInteger
{
    id value = [self.display text];
    return [value isMemberOfClass: [NSNumber class]];
}

@end
