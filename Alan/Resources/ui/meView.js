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
        height: 372,
        top: 0,
        showVerticalScrollIndicator: true,
        contentHeight: 'auto',
        contentWidth: 'auto',
        verticalBounce: true,
        layout: 'vertical',
    });
    var space = function(diff){
        return Ti.UI.createView({
                    height: (diff) ? diff:4,
                    opacity: 0,
                    width: 280,
                });
    };
    meBodyView.add(summaryView.create({
        height: 195,
        width: 280,
        top: 10,
    }));
    var calories = itemSummaryView.create({
        height: 60,
        width: 280,
        top: 1
    }, 3, styling.Red);
    
    var steps = itemSummaryView.create({
        height: 60,
        width: 280,
        top: 1,
    }, 3, styling.Blue);
    
    var distance = itemSummaryView.create({
        height: 60,
        width: 280,
        top: 1,
    }, 3, styling.Green);

    
    calories.content('Calorie Burn', 10);
    steps.content('Total   Steps', 10);
    distance.content('Miles Travelled', 10);
    
    var _updateSteps = function(value){
        steps.content(null, value, null);
    };
    var _updateDistance = function(value){
        distance.content(null, value, null);
    };
    var _updateCalories = function(value){
        calories.content(null, value, null);
    };
    meBodyView.add(space());
    meBodyView.add(calories);
    meBodyView.add(space());
    meBodyView.add(steps);
    meBodyView.add(space());
    meBodyView.add(distance);
    meBodyView.add(space(10));
    
    meBodyView.updateSteps = _updateSteps;
    meBodyView.updateDistance = _updateDistance;
    meBodyView.updateCalories = _updateCalories;
    
    return meBodyView;
}
