var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function() {

  var win = new BrowserWindow({
    width: 300,
    height: 400,
    resizable: false
  });

  win.loadUrl('file://'+__dirname+'/views/index.html');

});

// app.on('window-all-closed', function () {
// 	if (process.platform !== 'darwin') {
// 		app.quit();
// 	}
// });
