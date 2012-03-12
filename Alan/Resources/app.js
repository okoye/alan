/**
 * @author Chuka Okoye
 * 
 * Main app module that controls what type of application launches: train, test, or live.
 */

Titanium.UI.setBackgroundColor('#000');

var ui = require("ui/start");

//Test session
// var tests = require('test/tests');
// tests.run();


//Live Window
//if (!Ti.App.Properties.getBool('instantiated', false)){
//    ui.gettingStarted();
//}
//else{
    ui.alan();
//}

