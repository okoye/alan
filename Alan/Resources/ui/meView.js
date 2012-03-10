/**
 * @author Chuka Okoye
 * Implementing the meView.
 */

var log = require('lib/logger');
var summaryView = require('ui/summaryView');
var itemSummaryView = require('ui/itemSummaryView');
var styling = require('lib/styles');

var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;

exports.create = function(_args){
    var meBodyView = Ti.UI.createScrollView({
        backgroundImage: 'images/center_view_bg.png',
        width: PLATFORM_WIDTH,
        showVerticalScrollIndicator: true,
        contentHeight: 'auto',
        contentWidth: 'auto',
        verticalBounce: true,
        layout: 'vertical',
    });
    meBodyView.add(summaryView.create({
        height: 195,
        width: 280,
        top: 10
    }));
    
    var calories = itemSummaryView.create({
        height: 60,
        width: 280,
        top: 5
    }, 2, styling.Blue);
    
    var steps = itemSummaryView.create({
        height: 60,
        width: 280,
        top: 5,
    }, 3, styling.Green);
    
    var distance = itemSummaryView.create({
        height: 60,
        width: 280,
        top: 5
    }, 2, styling.Yellow);

    
    calories.content('Total Today', 0, 'Cal. Burn');
    steps.content('Steps', 0, ''); //TODO: add callback function.
    distance.content('Distance', 0, 'miles');
    
    var _updateSteps = function(value){
        steps.content(null, value, null);
    };
    var _updateDistance = function(value){
        distance.content(null, value, null);
    };
    var _updateCalories = function(value){
        calories.content(null, value, null);
    };
    meBodyView.add(calories);
    meBodyView.add(distance);
    meBodyView.add(steps);
    
    meBodyView.updateSteps = _updateSteps;
    meBodyView.updateDistance = _updateDistance;
    meBodyView.updateCalories = _updateCalories;
    
    meBodyView.addEventListener('scroll', function(evt){
        log.debug('SCROLLING###############');
    });
    return meBodyView;
}
