//
//  CircleButton.h
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/26/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CircleButton : UIControl

- (id) initWithFrame:(CGRect)frame andRadius:(float) r;

- (void) setImage:(UIImage *)normalImage :(UIImage *)highlightedImage;

@end