//
//  SSensingStateView.m
//  Alan Scavenger
//
//  Created by Chuka Okoye on 1/19/13.
//  Copyright (c) 2013 Lightcurves Labs. All rights reserved.
//

#import "SStateControl.h"

@interface SStateControl()
- (void) _drawCircleWithColor:(float)R :(float)G :(float)B;
- (void) _redraw;
@end

@implementation SStateControl{
    BOOL enabled;
    CGPoint center;
    UIImageView *stateImage;
}
@synthesize lineWidth;
@synthesize radius;
@synthesize title;

- (id)initWithFrame:(CGRect)frame
{
    if ((self = [super initWithFrame:frame])){
        self.backgroundColor = [UIColor clearColor];
        lineWidth = 5;
        enabled = NO;
        center.x = self.bounds.origin.x + self.bounds.size.width / 2.0;
        center.y = self.bounds.origin.y + self.bounds.size.height / 2.0;
        radius = (hypot(self.bounds.size.width, self.bounds.size.height) / 4.0)+1.0;
        stateImage = nil;
        NSLog(@"Radius is %f", self.radius);
    }
    return self;
}

- (void) drawRect:(CGRect)otherRect
{
    [self _drawCircleWithColor:0.6 :0.6 :0.6];
}

#pragma mark - StateControl

- (void) setEnabled:(BOOL)enable
{
    enabled = enable;
    if (enable){
        [self _drawCircleWithColor:0.4 :0.4 :0.4];
    }
    else{
        [self _drawCircleWithColor:0.6 :0.6 :0.6];
    }
    [self _redraw];
}

- (void) setImage:(UIImage *)image
{
    stateImage = [[UIImageView alloc]initWithImage:image];
    stateImage.center = center;
    [self _redraw];
}

- (void) setRadius:(float)newRadius
{
    self.radius = newRadius;
    [self _redraw];
}

#pragma mark - Private Methods
- (void) _drawCircleWithColor:(float)R :(float)G :(float)B
{
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    CGContextSetLineWidth(ctx, self.lineWidth);
    CGContextSetRGBStrokeColor(ctx, R, G, B, 1.0);
    CGContextAddArc(ctx, center.x, center.y, radius, 0.0, M_PI*2.0, YES);
    CGContextStrokePath(ctx);
}

- (void) _redraw
{
    [self setNeedsDisplay];
}

@end