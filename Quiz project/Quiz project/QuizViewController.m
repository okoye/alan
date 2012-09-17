//
//  QuizViewController.m
//  Quiz project
//
//  Created by Mathew Lejeune on 9/15/12.
//
//

#import "QuizViewController.h"

@interface QuizViewController ()

@end

@implementation QuizViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil 
	{
        // Call the init method implemented by the superclass
        self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
        if (self)  {
            // Create two arrays and make the pointers point to them
            questions = [[NSMutableArray alloc] init];
            answers = [[NSMutableArray alloc] init];
            
            // Add questions and answers to the arrays
            [questions addObject:@"What is 2 + 2?"];
            [answers addObject:@"5 :P"];
            
            [questions addObject:@"What is the capital of Vermont?"];
            [answers addObject:@"Montpelier"];
            
            [questions addObject:@"From what is cognac made?"];
            [answers addObject:@"Grapes"];
        }
    
        // Return the address of the new object
        return self;
    }
    
    - (IBAction)showQuestion:(id)sender
    
    {
        // Step to the next question
        currentQuestionIndex++;
        
        // Am I past the last question?
        if (currentQuestionIndex == [questions count]) {
        
            // Go back to the first question
            currentQuestionIndex = 0;
        }
        
        // Get the string at that index in the questions array
        NSString *question = [questions objectAtIndex:currentQuestionIndex];
        
        // Log the string to the console
        NSLog(@"displaying question: %@", question);
        
        // Display the string in the question field
        [questionField setText:question];
        // Clear the answer field
        [answerField setText:@"???"];
}

- (IBAction)showAnswer:(id)sender
    {
        // What is the answer to the current question?
        NSString *answer = [answers objectAtIndex:currentQuestionIndex];
        
        // Display it in the answer field
        [answerField setText:answer];
        
    }
 
    
@end
