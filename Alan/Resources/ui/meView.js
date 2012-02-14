/**
 * @author Chuka Okoye
 */

var log = require('lib/logger');
var summaryView = require('ui/summaryView');
var itemSummaryView = require('ui/itemSummaryView');

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
        height: 170,
        width: 280,
        top: 10
    }));
    
    meBodyView.add(itemSummaryView.create({
        height: 60,
        width: 280,
        top: 5,
    }, function(){}, 3));
    return meBodyView;
}
