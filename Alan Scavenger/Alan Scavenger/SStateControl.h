//
//  SSensingStateView.h
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/19/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SStateControl : UIView
@property(nonatomic) int lineWidth;
@property (nonatomic, readonly) float radius;
@property (nonatomic, copy) UILabel *title;

- (void) setEnabled:(BOOL) enabled;
- (void) setImage:(UIImage *) image;

@end
