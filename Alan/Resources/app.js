/**
 * @author Chuka Okoye
 * 
 * Main app module that controls what type of application launches: train, test, or live.
 */

Ti.UI.setBackgroundColor('#000');

var alan = require("ui/alanWindow");
var instrumentation = require('lib/instrument');
var cache = require('lib/cache');

/***********************
 * STATE VARIABLES
 **********************/
var initialized_app = null;
var created_account = null;

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
cache.initialize();
cache.create('startup_routine', false);

initialized_app = cache.get('startup_routine', 'initialized_app');
created_account = cache.get('startup_routine', 'created_account');

var initialize = function(){
	if (!initialized_app){
		alan.createInitializeWindow(function(success){
			if (success == true){
				cache.set('startup_routine', 'initialized_app', true);
				create(success);
			}
		});
	}
	else{
		create(true);
	}
	instrumentation.checkpoint('initialized');
};
var create = function(success){
	if (!created_account && success){
		alan.createAccountWindow(function(success){
			if (success == true){
				cache.set('startup_routine', 'created_account', true);
				monitor(success);
			}
		});
	}
	else if(created_account){
		monitor(true);
	}
	instrumentation.checkpoint('created');
};
var monitor = function(success){
	if (success){
		alan.createAlanWindow();
	}
	instrumentation.checkpoint('monitored');
};

initialize();
