/**
 * @author Chuka Okoye
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
        layout: 'vertical',
    });
    meBodyView.add(summaryView.create({
        height: 195,
        width: 280,
        top: 10
    }));
    
    var totalToday = itemSummaryView.create({
        height: 60,
        width: 280,
        top: 5
    }, 2, styling.Info);
    totalToday.content('Total Today', 0, 'Cal. Burn');
    var setTodayTotal = function(calories){
       totalToday.content('Total Today', calories,'Cal. Burn'); 
    };
    
    //TODO: add functions to add activity, set total today, clear activities
    
    var clearActivities = function(){
        //For each view, if _type == 'itemSummaryView', delete it by using remove.
    };
    
    var addActivity = function(isv){
        log.info('adding new activity to meView');
        meBodyView.add(isv);
    };
    
    meBodyView.totalCalories = setTodayTotal;
    meBodyView.newActivity = addActivity;
    
    meBodyView.add(totalToday);
    
    return meBodyView;
}
