//
//  AggroActivityRecorderViewController.m
//  Aggregator
//
//  Created by Chuka Okoye on 9/25/12.
//  Copyright (c) 2012 Lightcurves Labs. All rights reserved.
//

#import "AggroActivityRecorderViewController.h"
#import <YAJLiOS/YAJL.h>

@implementation AggroActivityRecorderViewController

@class CompassModel;
@synthesize storeFront, recordingTag, sync, start, stop, status;

NSArray *synchronizedObjects;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        [[self navigationItem] setTitle:@"Recorder"];
    }
    NSURLCredential *credential = [NSURLCredential credentialWithUser:@"trainer@alanapp.com"
                                                            password:@"e9747xUWqw^E"
                                                            persistence:NSURLCredentialPersistenceForSession];
    NSURLProtectionSpace *protectionSpace = [[NSURLProtectionSpace alloc]
        initWithHost:@"api.thepuppetprojects.com"
        port:80
        protocol:@"http"
        realm:@"Secure Area"
        authenticationMethod:nil];
    [[NSURLCredentialStorage sharedCredentialStorage] setCredential:credential
     forProtectionSpace:protectionSpace];
    return self;
}

- (void) viewWillAppear:(BOOL)animated
{
    NSLog(@"Setting up view data");
    if (![storeFront hasMoreReadings:recordingTag]){
        [sync setEnabled: NO];
    }
    if ([start isEnabled]){
        [stop setEnabled:NO];
    }
    status.text = [self readingsTaken];
    [super viewWillAppear:animated];
}

- (void) viewWillDisappear:(BOOL)animated
{
    NSLog(@"Cleaning up recorder view data");
    [storeFront stopCollection];
}

- (IBAction) startRecording:(id)sender
{
    NSLog(@"Started recording data");
    [start setEnabled:NO];
    [stop setEnabled:YES];
    [sync setEnabled:YES];
    [storeFront startCollectionWithLabel: [self recordingTag]];
}

- (IBAction) stopRecording:(id)sender
{
    NSLog(@"Stopped recording data");
    [start setEnabled:YES];
    [stop setEnabled:NO];
    [sync setEnabled:YES];
    [storeFront stopCollection];
    status.text = [self readingsTaken];
}

- (IBAction) synchronize:(id)sender
{
    //TODO: if not local object not null resend again
    NSLog(@"Synchronizing with api");
    NSString *baseURLString = @"http://api.thepuppetprojects.com/1/training/";
    NSURLConnection *conn;
    NSURL *url = [NSURL URLWithString: [baseURLString stringByAppendingString: [self.recordingTag lowercaseString]]];
    NSMutableURLRequest *req = [[NSMutableURLRequest alloc] initWithURL:url];
    NSPredicate *predicate = [NSPredicate
                              predicateWithFormat:@"activityTag like %@",recordingTag];
    synchronizedObjects = [storeFront fetchReadingsOfType:predicate andSize:100];
    NSString *jsonReadings = [synchronizedObjects yajl_JSONString];
    NSData *data = [NSData dataWithBytes:[jsonReadings UTF8String] length:[jsonReadings length]];
    [req setHTTPMethod:@"POST"];
    [req setHTTPBody: data];
    
    conn = [[NSURLConnection alloc] initWithRequest:req
                                            delegate: self
                                            startImmediately:YES];
    
}

- (void) connection: (NSURLConnection *)conn didReceiveData:(NSData *)data
{
    NSLog(@"Received data chunk from api");
}

- (void) connection:(NSURLConnection *)connection didReceiveResponse:(NSHTTPURLResponse *)response
{
    NSLog(@"Received response %@",response);
    if ([response statusCode] == 204){
        NSLog(@"Successful synchronization with API");
        [storeFront removeReadings:synchronizedObjects];
    }
    NSLog(@"Status code is %i",[response statusCode]);
    synchronizedObjects = nil;
    status.text = [self readingsTaken];
}

- (void) connectionDidFinishLoading:(NSURLConnection *)connection
{
    
}

- (void) connection:(NSURLConnection *)connection didFailWithError:(NSError *)error
{
    connection = nil;
    UIAlertView *av = [[UIAlertView alloc] initWithTitle:@"Error"
                                                message:@"Could not sync with Alan"
                                                delegate:nil
                                                cancelButtonTitle:@"OK"
                                                otherButtonTitles:nil];
    [av show];
}

- (void) setRecorderTitle:(NSString *)rec andStoreFront:(SensingStore *)storeF
{
    [[self navigationItem] setTitle:rec];
    [self setStoreFront:storeF];
    recordingTag = [rec copy];
}

- (NSString*) readingsTaken
{
    return [[NSNumber numberWithInt:[storeFront hasMoreReadings:recordingTag]] stringValue];
}

@end
