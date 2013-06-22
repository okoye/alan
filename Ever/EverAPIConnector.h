//
//  EverAPIConnector.h
//  Ever
//
//  Created by Chuka Okoye on 6/22/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface EverAPIConnector : NSObject <NSURLConnectionDelegate>
{
    NSURLConnection *internalConnection;
    NSMutableData *container;
    dispatch_queue_t queue;
}
- (id)initWithRequest:(NSURLRequest *)req;

@property (nonatomic, copy) NSURLRequest *request; //Request to be sent to API
@property (nonatomic, copy) NSArray *payload; //Data to be sent to API
@property (nonatomic, copy) void (^completion_block) (NSManagedObjectContext *ctx); //Callback handler after ops

- (void) start;

@end
