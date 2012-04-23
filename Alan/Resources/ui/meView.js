/**
 * @author Chuka Okoye
 * Implementing the meView.
 */

var log = require('lib/logger');
var itemSummaryView = require('ui/itemSummaryView');
var styling = require('lib/styles');

var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;

var ME_STATES = {
    WORRY: {
        summary: "THAT'S SAD",
        image: 'images/death.png',
        style: styling.Purple,
    },
    NO_DATA: {
        summary: 'NO DATA',
        image: 'images/sad.png',
        style: styling.Red,
    },
    BAD: {
        summary: "NOT SO GOOD",
        image: 'images/mad.png',
        style: styling.Red,
    },
    GOOD: {
        summary: 'GOOD JOB, DOING GOOD',
        image: 'images/happy.png',
        style: styling.Green,
    },
    AVERAGE: {
        summary: 'KEEP GOING',
        image: 'images/smirk.png',
        style: styling.Blue,
    }
}

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
    var height = 65;
    var width = 289;
    var status = itemSummaryView.create({
        height: height,
        width: width,
        top: 17,
    }, 'messageSummary', styling.Red);
    
    var summary = itemSummaryView.create({
        height: height,
        width: width,
        top: 3,
        title: "Today's Activity Level",
    }, 'meteredSummary', styling.Green);
    
    var calories = itemSummaryView.create({
        height: height,
        width: width,
        top: 3,
        title: "Calorie Burn",
    }, 'meteredSummary', styling.Red);
    
    var steps = itemSummaryView.create({
        height: height,
        width: width,
        top: 3,
        maxLabelOn: true,
        valueLabelOn: true,
        title: "Total Steps",
    }, 'meteredSummary', styling.Blue);
    
    var distance = itemSummaryView.create({
        height: height,
        width: width,
        top: 3,
        title: "Miles Travelled",
    }, 'meteredSummary', styling.Purple);

     status.content(ME_STATES.NO_DATA.image, ME_STATES.NO_DATA.summary, ME_STATES.NO_DATA.style);
    // summary.content('Activity Level', '0');
    // calories.content('Calorie Burn', 0);
    // steps.content('Total   Steps', 0);
    // distance.content('Miles Travelled', 0);
    
    var _updateStatus = function(me_state){
        status.content(me_state.image, me_state.summary, me_state.style);
    };
    var _updateSummary = function(value){
        summary.content(null, value+'%', null);
    };
    var _updateSteps = function(value){
        steps.content(null, value, null);
    };
    var _updateDistance = function(value){
        distance.content(null, value, null);
    };
    var _updateCalories = function(value){
        calories.content(null, value, null);
    };
    meBodyView.add(status);
    //meBodyView.add(space());
    meBodyView.add(summary);
    //meBodyView.add(space());
    meBodyView.add(calories);
    //meBodyView.add(space());
    meBodyView.add(steps);
    //meBodyView.add(space());
    meBodyView.add(distance);
    //meBodyView.add(space(10));
    
    meBodyView.updateSteps = _updateSteps;
    meBodyView.updateDistance = _updateDistance;
    meBodyView.updateCalories = _updateCalories;
    meBodyView.updateStatus = _updateStatus;
    
    return meBodyView;
};

exports.constants = ME_STATES;
