//
//  EverTextField.m
//  Ever
//
//  Created by Chuka Okoye on 7/7/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverTextField.h"

@implementation EverTextField
{
    UIEdgeInsets insets;
}

const float TRANSPARENCY = 0.4;

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        self.backgroundColor = [UIColor whiteColor];
        self.alpha = TRANSPARENCY;
        self.font = [UIFont fontWithName:@"Verdana" size:10.0];
        insets = UIEdgeInsetsMake(11.0, 11.0, 11.0, 11.0);
    }
    return self;
}

- (CGRect) editingRectForBounds:(CGRect)bounds
{
    return UIEdgeInsetsInsetRect([super editingRectForBounds:bounds], insets);
}

- (CGRect) textRectForBounds:(CGRect)bounds
{
    return UIEdgeInsetsInsetRect([super textRectForBounds:bounds], insets);
}

//- (CGRect)placeholderRectForBounds:(CGRect)bounds
//{
//    return UIEdgeInsetsInsetRect([super placeholderRectForBounds:bounds], insets);
//}

- (void) drawPlaceholderInRect:(CGRect)rect
{
    [[UIColor whiteColor] setFill];
    [[self placeholder] drawInRect:rect withFont:self.font];
}

- (void) drawTextInRect:(CGRect)rect
{
    [[UIColor whiteColor] setFill];
    [[self text] drawInRect:rect withFont:self.font];
}

@end
