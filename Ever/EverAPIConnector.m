//
//  EverAPIConnector.m
//  Ever
//
//  Created by Chuka Okoye on 6/22/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverAPIConnector.h"
#import "AFJSONRequestOperation.h"

@implementation EverAPIConnector

//Static class variables
static dispatch_queue_t success_q = nil;
static dispatch_queue_t failure_q = nil;
static NSMutableArray *shared_connection_list = nil;

//Instance variables
@synthesize request, payload, success_block, failure_block, ctx;

- (id) initWithRequest:(NSMutableURLRequest *)req
{
    self = [super init];
    if (self){
        self.request = req;
        //If you are the first connection, create dispatch queues
        if (!success_q){
            success_q = dispatch_queue_create("org.lightcurvelabs.ever.success", 0);
        }
        if (!failure_q){
            failure_q = dispatch_queue_create("org.lightcurvelabs.ever.failure", 0);
        }
        if (!shared_connection_list){
            shared_connection_list = [[NSMutableArray alloc]init];
        }
    }
    return self;
}

- (void) start
{
    NSData *data = nil;
    if (payload){
        NSLog(@"Now serializing JSON object");
        NSError *error = nil;
        data = [NSJSONSerialization dataWithJSONObject:payload options:0 error:&error];
        [request setHTTPBody:data];
    }
    AFJSONRequestOperation *op = [AFJSONRequestOperation JSONRequestOperationWithRequest:self.request success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {
        //SUCCESS callback here
        NSLog(@"Success! I tell you");
    } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON) {
        //FAILURE callback here
        NSLog(@"Failure in sending request");
    }];
    op.failureCallbackQueue = failure_q; //if nil, op will use main thread :(
    op.successCallbackQueue = success_q; //if nil, op will use main thread :(
    
    //Add our connection to static array to avoid being garbage collected until completion
    [shared_connection_list addObject:self];
    
    //Finally, start the pesky op
    [op start];
}

@end
