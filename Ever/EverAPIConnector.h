//
//  EverAPIConnector.h
//  Ever
//
//  Created by Chuka Okoye on 6/22/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface EverAPIConnector : NSObject
{
    NSURLConnection *internalConnection;
    NSMutableData *container;
}
- (id)initWithRequest:(NSURLRequest *)req;

@property (nonatomic, copy) NSMutableURLRequest *request; //Request to be sent to API
@property (nonatomic, copy) NSArray *payload; //Data to be sent to API
@property (nonatomic, weak) NSManagedObjectContext *ctx; //Object manager
@property (nonatomic, copy) void (^success_block) (void); //Callback handler after ops
@property (nonatomic, copy) void (^failure_block) (void); //Callback handler after ops

- (void) start;

@end
