/**
 * @author Chuka Okoye
 */

var log = require('lib/logger');
var summaryView = require('ui/summaryView');
var itemSummaryView = require('ui/itemSummaryView');

var PLATFORM_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var PLATFORM_WIDTH = Ti.Platform.displayCaps.platformWidth;

exports.create = function(_args){
    var headerHeight = (_args && _args.height) ? _args.height : 45;
    var tabHeight = headerHeight;
    var meBodyView = Ti.UI.createScrollView({
        height: (_args && _args.height) ? _args.height:PLATFORM_HEIGHT - (tabHeight + headerHeight),
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
        top: 5
    }));
    return meBodyView;
}
