/**
 * @author Chuka Okoye
 */
Titanium.UI.setBackgroundColor("#000");

//create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup0'});

//create running tab and root window
var runWindow = Titanium.UI.createWindow({
	url:'windows/running.js',
	titleid:'running'
});
var runTab = Titanium.UI.createTab({
	icon:'images/run.png',
	titleid:'running_collection',
	window:runWindow
});

//create walking tab and root window
var walkWindow = Titanium.UI.createWindow({
	url:'windows/walking.js',
	titleid:'walking'
});
var walkTab = Titanium.UI.createTab({
	icon:'images/walk.png',
	titleid:'walking_collection',
	window:walkWindow
});

//create stationary tab and root window
var standWindow = Titanium.UI.createWindow({
	url:'windows/standing.js',
	titleid:'standing'
});
var standTab = Titanium.UI.createTab({
	icon:'images/stop.png',
	titleid:'stationary_collection',
	window:standWindow
});

tabGroup.addTab(runTab);
tabGroup.addTab(walkTab);
tabGroup.addTab(standTab);

tabGroup.setActiveTab(1);
tabGroup.open();
