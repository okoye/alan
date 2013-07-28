//
//  EverLoginController.m
//  Ever
//
//  Created by Chuka Okoye on 7/5/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverLoginController.h"
#import "KeychainItemWrapper.h"
#import "EverCredentialStore.h"
#import "EverTextField.h"

//TODO Refactor out authentication into seperate object for StatusController

@interface EverLoginController ()
- (void) screenPaintingInitialization;
- (void) keyboardWasShown:(NSNotification *)notification;
- (void) keyboardWasHidden:(NSNotification *)notification;
- (void) registerForKeyboardNotifications;
- (void) onLogin:(id) loginSubmit;
- (void) dismissKeyboardOnTouchOutside;
@end

@implementation EverLoginController
{
    @private
    UIScrollView *scrollView;
    UIImageView *logoContainer;
    UITextField *username;
    UITextField *password;
    UIButton *login;
    UITextField *currentlyEditedTextField;
    KeychainItemWrapper *basicAuthChain;
    EverCredentialStore *credStore;
    UIActivityIndicatorView *activityIndicator;
}

@synthesize delegate;

#pragma mark - EverLoginController Private Methods

- (void) dismissKeyboardOnTouchOutside
{
    NSLog(@"Keyboard should be dismissed from view here");
    if (currentlyEditedTextField){
        [currentlyEditedTextField resignFirstResponder];
    }
}

- (void) screenPaintingInitialization
{
    scrollView = [[UIScrollView alloc] initWithFrame:self.view.frame];
    scrollView.alpha = 1.0;
    //[scrollView setBackgroundColor:[UIColor redColor]];
    [self.view addSubview:scrollView];
    
    //Handle setup of logo
    logoContainer = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"ever-logo"]];
    logoContainer.alpha = 1.0;
    CGRect logoFrame = CGRectMake(74.0, 30.0, 175.0, 175.0);
    logoContainer.frame = logoFrame;
    
    //Handle setup of text input boxes
    CGRect emailFrame = CGRectMake(53.0,
                                   logoFrame.origin.y+logoFrame.size.height+45,
                                   214.0,31.0);
    username = [[EverTextField alloc] initWithFrame:emailFrame];
    username.placeholder = @"Username";
    username.delegate = self;
    CGRect passwordFrame = CGRectMake(emailFrame.origin.x,
                                      emailFrame.origin.y+9+emailFrame.size.height,
                                      emailFrame.size.width,
                                      emailFrame.size.height);
    password = [[EverTextField alloc] initWithFrame:passwordFrame];
    password.placeholder = @"Password";
    password.secureTextEntry = YES;
    password.delegate = self;
    
    //Handle login button
    CGRect buttonFrame = CGRectMake(194, passwordFrame.origin.y+passwordFrame.size.height+14, 73, 31);
    login = [[UIButton alloc] initWithFrame:buttonFrame];
    login.alpha = 0.5;
    [login setBackgroundImage:[UIImage imageNamed:@"login-btn"] forState:UIControlStateNormal];
    [login addTarget:self action:@selector(onLogin:) forControlEvents:UIControlEventTouchUpInside];
    
    //Add all to view
    [scrollView addSubview:logoContainer];
    [scrollView addSubview:username];
    [scrollView addSubview:password];
    [scrollView addSubview:login];
    [scrollView addSubview:activityIndicator];
}

- (void) keyboardWasShown:(NSNotification *)notification
{
    NSLog(@"Keyboard was shown on screen");
    NSDictionary *info  = [notification userInfo];
    CGSize kbSize = [[info objectForKey:UIKeyboardFrameBeginUserInfoKey] CGRectValue].size;
    
    UIEdgeInsets contentInsets = UIEdgeInsetsMake(0.0, 0.0, kbSize.height, 0.0);
    scrollView.contentInset = contentInsets;
    scrollView.scrollIndicatorInsets = contentInsets;
    
    CGRect aRect = self.view.frame;
    aRect.size.height -= kbSize.height;
    
    //If current textfield is obscured by keyboard scroll the view up
    //detect if text field is in visible rectangle
    if (!CGRectContainsPoint(aRect, currentlyEditedTextField.frame.origin)){
        NSLog(@"Shifting keys"); 
        CGPoint scrollPoint = CGPointMake(0.0, (currentlyEditedTextField.frame.origin.y+20.0)-(kbSize.height));
        [scrollView setContentOffset:scrollPoint animated:YES];
    }
}
- (void) keyboardWasHidden:(NSNotification *)notification
{
    NSLog(@"Keyboard was hidden on screen");
    UIEdgeInsets contentInsets = UIEdgeInsetsZero;
    scrollView.contentInset = contentInsets;
    scrollView.scrollIndicatorInsets = contentInsets;
}
- (void) registerForKeyboardNotifications
{
    NSLog(@"Registering for keyboard notifications");
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWasShown:)
                                                 name:UIKeyboardDidShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWasHidden:) name:UIKeyboardDidHideNotification object:nil];
}

- (void) onLogin:(id) loginSubmit
{
    if (username.text == nil || password.text == nil){
        NSLog(@"username or password is nil");
        [[[UIAlertView alloc] initWithTitle:@"Invalid Credentials"
                            message:@"Username and Password fields cannot be left blank."
                            delegate:nil
                            cancelButtonTitle:@"Ok"
                            otherButtonTitles:nil, nil] show];
        return ;
    }
    [activityIndicator startAnimating];
    [credStore authenticateUsername:username.text andPassword:password.text withSuccess:^{
        [self.delegate finished:self];
        [activityIndicator stopAnimating];
    } andError:^{
        [activityIndicator stopAnimating];
        [[[UIAlertView alloc] initWithTitle:@"Invalid Credentials"
                            message:@"Either username or password is invalid"
                            delegate:nil
                            cancelButtonTitle:@"Ok"
                          otherButtonTitles:nil, nil] show];
    }];
}

#pragma mark UITextFieldDelegate Methods

- (BOOL) textFieldShouldReturn:(UITextField *)textField
{
    [textField resignFirstResponder];
    return YES;
}

- (BOOL) textFieldShouldBeginEditing:(UITextField *)textField
{
    NSLog(@"Textfield should begin editing fired");
    currentlyEditedTextField = textField;
    return YES;
}
#pragma mark - UIViewController Methods

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        //Create objects related to storing password.
        self.wantsFullScreenLayout = YES;
        credStore = [EverCredentialStore getStore];
        activityIndicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [self registerForKeyboardNotifications];
}

- (void) viewDidLoad
{
    [super viewDidLoad];
    [self screenPaintingInitialization];
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(dismissKeyboardOnTouchOutside)];
    [self.view addGestureRecognizer:tap];
}

- (void) viewDidAppear:(BOOL)animated
{
    //Contact webservice if necessary.
}

- (void) viewWillDisappear:(BOOL)animated
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIKeyboardDidHideNotification object:nil];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIKeyboardWillShowNotification object:nil];
}

- (void) viewDidDisappear:(BOOL)animated
{
    username.text = @"";
    password.text = @"";
}
@end
