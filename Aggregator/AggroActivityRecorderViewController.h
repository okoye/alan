//
//  AggroActivityRecorderViewController.h
//  Aggregator
//
//  Created by Chuka Okoye on 9/25/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SensingStore.h"

@interface AggroActivityRecorderViewController : UIViewController

@property(nonatomic, readonly) __weak IBOutlet UILabel *status;
@property(nonatomic) SensingStore* storeFront;
@property(nonatomic, readonly) NSString* recordingTag;

- (IBAction) startRecording:(id)sender;

- (IBAction) stopRecording:(id)sender;

- (void) setRecorderTitle:(NSString*) rec andStoreFront:(SensingStore*) storeFront;

@end
