/**
 * @author Chuka Okoye
 * 
 * Main app module that controls what type of application launches: train, test, or live.
 */

Titanium.UI.setBackgroundColor('#000');

var ui = require("lib/ui");


//Live Session
win = new ui.AppWindow();

//Training session
//new ui.TrainWindow();

//Test session
// var tests = require('test/tests');
// tests.run();

