//
//  CircleButton.m
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/26/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "CircleButton.h"

@implementation CircleButton{
    CGPoint center;
    float borderWidth;
    float radius;
    UIImageView *image;
}

#pragma mark - UIView and CircleButton

- (id) initWithFrame:(CGRect) frame andRadius: (float) r{
    if ((self = [super initWithFrame:frame])){
        self.backgroundColor = [UIColor clearColor];
        borderWidth = 5.0;
        radius = r;
    }
    return self;
}

- (void) drawRect:(CGRect)rect{
    center.x = rect.origin.x + rect.size.width/2.0;
    center.y = rect.origin.y + rect.size.height/2.0;
}

- (void) setImage:(UIImage *)normalImage :(UIImage *)highlightedImage{
    image = [[UIImageView alloc] initWithImage:normalImage highlightedImage:highlightedImage];
    [self addSubview:image];
    //[self setNeedsDisplay];
}

@end