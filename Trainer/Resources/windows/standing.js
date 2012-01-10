/**
 * @author Chuka Okoye
 */
var win = Titanium.UI.currentWindow;

var statusLabel = Titanium.UI.createLabel({
	text:'Status information',
	color:'#900',
	height:50,
	width:'auto',
	top:100
});
win.add(statusLabel);

var startButton = Titanium.UI.createButton({
	title:'Start',
	height:40,
	width:200,
	top:230
});
var start=true;
startButton.addEventListener('click', function(){
	if (start){
		statusLabel.text="Stopping data collection";
		start=false;
		startButton.title = 'Start';
	}
	else{
		statusLabel.text = 'Restarting data collection';
		start=true;
		startButton.title='Stop';
	}
});
win.add(startButton);
