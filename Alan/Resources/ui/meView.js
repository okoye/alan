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
        layout: 'vertical'
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
    }, 2, styling.INFO);
    totalToday._setContent('Total Today', 2000, 'Cal. Burn');
    log.info('Finished setting content');
    var setTodayTotal = function(calories){
       totalToday._setContent('Total Today', calories,'Cal. Burn'); 
    };
    meBodyView.setTotal = setTodayTotal;
    meBodyView.add(totalToday);
    
    return meBodyView;
}
