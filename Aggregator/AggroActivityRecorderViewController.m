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
        [self toggleButtons:YES :NO :NO];
    }
    else{
        [self toggleButtons:YES :NO :YES];
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
    [self toggleButtons:NO :YES :YES];
    [storeFront startCollectionWithLabel: [self recordingTag]];
}

- (IBAction) stopRecording:(id)sender
{
    NSLog(@"Stopped recording data");
    [self toggleButtons:YES :NO :YES];
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
    [req addValue:@"yes" forHTTPHeaderField:@"X-Testing"];
    
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
    NSLog(@"Connection finished loading");
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

-(void) toggleButtons:(BOOL)startButton:(BOOL)stopButton:(BOOL)syncButton
{
    [start setEnabled:startButton];
    [stop setEnabled:stopButton];
    [sync setEnabled:syncButton];
    
    if (startButton)
        [start setAlpha:1];
    else
        [start setAlpha:0.3];
    
    if (stopButton)
        [stop setAlpha:1];
    else
        [stop setAlpha:0.3];
    
    if (syncButton)
        [sync setAlpha:1];
    else
        [sync setAlpha:0.3];
}
@end
