//
//  EverStatusController.h
//  Ever
//
//  Created by Chuka Okoye on 7/5/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "EverContainedInterfaceViewController.h"
#import "EverSensorStore.h"

@interface EverStatusController : EverContainedInterfaceViewController
{
    EverSensorStore *store;
}

-(BOOL) allGood; //Status reporting

@end
