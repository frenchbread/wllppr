var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function() {

  var win = new BrowserWindow({
    width: 1000,
    height: 600
  });

  win.loadUrl('file://'+__dirname+'/views/index.html')

});
