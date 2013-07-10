//
//  EverLoginController.m
//  Ever
//
//  Created by Chuka Okoye on 7/5/13.
//  Copyright (c) 2013 Lightcurve Labs. All rights reserved.
//

#import "EverLoginController.h"
#import "KeychainItemWrapper.h"
#import "EverTextField.h"

//TODO Refactor out authentication into seperate object for StatusController

@interface EverLoginController ()
- (void) screenPaintingInitialization;
- (void) deleteCredentials;
- (void) saveCredentials:(NSString *) username withPassword:(NSString *) password;
- (void) keyboardWasShown:(NSNotification *)notification;
- (void) keyboardWasHidden:(NSNotification *)notification;
- (void) registerForKeyboardNotifications;
- (void) onLogin:(id) loginSubmit;
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
}

@synthesize delegate;
static const NSString *KEYCHAIN_IDENTIFIER_PREFIX = @"org.lightcurvelabs.ever";

#pragma mark - EverLoginController Public Methods
 - (BOOL) isLoggedIn
{
    if ([self fetchUsername] && [self fetchPassword]){
        return YES;
    }
    else{
        return NO;
    }
}

- (NSString *) fetchPassword
{
    return [basicAuthChain objectForKey:CFBridgingRelease(kSecValueData)];
}

- (NSString *) fetchUsername
{
    return [basicAuthChain objectForKey:CFBridgingRelease(kSecAttrAccount)];
}

#pragma mark - EverLoginController Private Methods

- (void) screenPaintingInitialization
{
    scrollView = [[UIScrollView alloc] initWithFrame:self.view.frame];
    scrollView.alpha = 1.0;
    //[scrollView setBackgroundColor:[UIColor redColor]];
    [self.view addSubview:scrollView];
    
    //Handle setup of logo
    logoContainer = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"ever-logo"]];
    logoContainer.alpha = 1.0;
    CGRect logoFrame = CGRectMake(74.0, 81.0, 172.0, 172.0);
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
}

- (void) deleteCredentials
{
    [basicAuthChain resetKeychainItem];
}

- (void) saveCredentials:(NSString *) myUsername withPassword:(NSString *) myPassword
{
    [basicAuthChain setObject:myPassword forKey:CFBridgingRelease(kSecValueData)];
    [basicAuthChain setObject:myUsername forKey:CFBridgingRelease(kSecAttrAccount)];
}

- (void) keyboardWasShown:(NSNotification *)notification
{
    NSDictionary *info  = [notification userInfo];
    CGSize kbSize = [[info objectForKey:UIKeyboardFrameBeginUserInfoKey] CGRectValue].size;
    
    UIEdgeInsets contentInsets = UIEdgeInsetsMake(0.0, 0.0, kbSize.height, 0.0);
    scrollView.contentInset = contentInsets;
    scrollView.scrollIndicatorInsets = contentInsets;
    
    CGRect aRect = self.view.frame;
    aRect.size.height -= kbSize.height;
    
    //If current textfield is obscured by keyboard scroll the view up
    //detect if text field is in visible rectangle
    if (CGRectContainsPoint(aRect, currentlyEditedTextField.frame.origin)){
        CGPoint scrollPoint = CGPointMake(0.0, (currentlyEditedTextField.frame.origin.y+20.0)-(kbSize.height));
        [scrollView setContentOffset:scrollPoint animated:YES];
    }
}
- (void) keyboardWasHidden:(NSNotification *)notification
{
    UIEdgeInsets contentInsets = UIEdgeInsetsZero;
    scrollView.contentInset = contentInsets;
    scrollView.scrollIndicatorInsets = contentInsets;
}
- (void) registerForKeyboardNotifications
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWasShown:)
                                                 name:UIKeyboardDidShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWasHidden:) name:UIKeyboardDidHideNotification object:nil];
}

- (void) onLogin:(id) loginSubmit
{
    //TODO Save username and password fields after validating
    if (username.text == nil || password.text == nil){
        NSLog(@"username or password is nil");
        [[[UIAlertView alloc] initWithTitle:@"Invalid Credentials"
                            message:@"Username and Password fields cannot be left blank."
                            delegate:nil
                            cancelButtonTitle:@"Ok"
                            otherButtonTitles:nil, nil] show];
        return ;
    }
    NSLog(@"onLogin Fired!");
    //TODO contact API and exchange keys or at least verify auth valid.
    [self saveCredentials:username.text withPassword:password.text];
    
    //Now, go signal parent
    [self.delegate finished:self];
    
}

#pragma mark UITextFieldDelegate Methods

- (BOOL) textFieldShouldReturn:(UITextField *)textField
{
    [textField resignFirstResponder];
    return YES;
}

- (BOOL) textFieldShouldBeginEditing:(UITextField *)textField
{
    currentlyEditedTextField = textField;
    return YES;
}
#pragma mark - UIViewController Methods

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        //Create objects related to storing password.
        NSString *keychainBasicAuthIdentifier = [NSString stringWithFormat:@"%@:basic",KEYCHAIN_IDENTIFIER_PREFIX];
        basicAuthChain = [[KeychainItemWrapper alloc]
                        initWithIdentifier:keychainBasicAuthIdentifier
                        accessGroup:nil];
        
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [self screenPaintingInitialization];
    [self registerForKeyboardNotifications];
}

- (void) viewWillDisappear:(BOOL)animated
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIKeyboardDidHideNotification object:nil];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIKeyboardWillShowNotification object:nil];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
