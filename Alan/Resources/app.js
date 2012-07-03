/**
 * @author Chuka Okoye
 * 
 * Main app module that controls what type of application launches: train, test, or live.
 */

Ti.UI.setBackgroundColor('#000');

var ui = require("ui/start");
//var testflight = require("ti.testflight");
//testflight.token('e02a75890def3a7ac573022791989e18_NTE2NzcyMDEyLTAxLTI3IDAwOjQ2OjMxLjEwMDU5MQ');

//Test session
 var tests = require('test/tests');
 tests.run();


//Live Window
//if (!Ti.App.Properties.getBool('instantiated', false)){
//    ui.gettingStarted();
//}
//else{
//    ui.alan();
//}

