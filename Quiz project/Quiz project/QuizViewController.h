//
//  QuizViewController.h
//  Quiz project
//
//  Created by Mathew Lejeune on 9/15/12.
//
//

#import <UIKit/UIKit.h>

@interface QuizViewController : UIViewController

{
    int currentQuestionIndex;
    
    // The model objects
    NSMutableArray *questions;
    NSMutableArray *answers;
    
    // The view objects - don't worry about IBOutlet -
    // we'll talk about it shortly
    IBOutlet UILabel *questionField;
    IBOutlet UILabel *answerField;

}

- (IBAction)showQuestion:(id)sender;
- (IBAction)showAnswer:(id)sender;

@end
