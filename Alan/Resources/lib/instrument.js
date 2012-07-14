/**
 * @author Chuka Okoye
 * 
 * Instrumentation module is used for instrumenting portions of app
 */

var testflight = require('ti.testflight');
testflight.token('e02a75890def3a7ac573022791989e18_NTE2NzcyMDEyLTAxLTI3IDAwOjQ2OjMxLjEwMDU5MQ');
var myId = Ti.Platform.getId();


exports.checkpoint = function(str){
    testflight.checkpoint(myId + ' '+str);
};

exports.customInfo = function(key, value){
    testflight.customInfo(key, value);
};

exports.feedback = function(){
    testflight.feedback();  
};

exports.sendFeedback = function(text){
    testflight.sendFeedback(text);
};
