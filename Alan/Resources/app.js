/**
 * @author Chuka Okoye
 * 
 * Main app module that controls what type of application launches: train, test, or live.
 */

Ti.UI.setBackgroundColor('#000');

var alan = require("ui/alanWindow");
var instrumentation = require('lib/instrument');


/***********************
 * GLOBAL DECLARATIONS
 **********************/
instrumentation.checkpoint('booted');

/*********************
 * TEST SESSION LOGIC
 ********************/
// var tests = require('test/tests');
// tests.run();


/*********************
 * LIVE WINDOW LOGIC
 ********************/
var success = function(){
    alan.createAlanWindow();
};
var err = function(){
    alan.createInitializeWindow(success, err);
};
alan.createInitializeWindow(success, err);
