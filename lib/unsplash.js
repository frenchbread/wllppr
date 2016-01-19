var config = require('../config');
var request = require('request');
var wallpaper = require('wallpaper');
var $ = require('cheerio');
var exec = require('child_process').exec;
var fs = require('fs');

var NotificationCenter = require('node-notifier').NotificationCenter;

try {

    stats = fs.lstatSync(__dirname  + '/Images');

    if (stats.isDirectory()) {

        // ..

    }
}
catch (e) {

    var dir = __dirname + "/Images";

    exec("mkdir " + dir);

}


exports.set = function(){

			request('https://unsplash.com/', function(err,resp,rawHtml){

				var html = $.load(rawHtml);

				var photos = [];

				html(".photo-description__download a").map(function(i,link){

					var src = $(link).attr('href');

					photos.push(src);

				});

                var photoID = Math.floor(Math.random() * 19) + 0;

                var url = "https://unsplash.com" + photos[photoID];

                var location = __dirname + "/Images/photo-of-the-day_" + photoID + ".jpg";


                var downloadImage = function(uri, filename, callback){

                    request.head(uri, function(err, res, body){

                        //console.log('content-type:', res.headers['content-type']);

                        //console.log('content-length:', res.headers['content-length']);

                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };

                downloadImage(url, location, function(){
                    console.log('done');
                    wallpaper.set(location, function(err) {

                        if (err) throw err;

                        //alert("Background photo is set!");

                        var notifier = new Notification({
                            //withFallback: false, // use Growl if <= 10.8?
                            //customPath: void 0 // Relative path if you want to use your fork of terminal-notifier
                        });

                        notifier.notify({
                            'title': "Test title",
                            'subtitle': "Test subtitle",
                            'message': "Test message",
                            //'sound': false, // Case Sensitive string of sound file (see below)
                            'icon': 'Terminal Icon' // Set icon? (Absolute path to image)
                            //'contentImage': void 0, // Attach image? (Absolute path)
                            //'open': void 0, // URL to open on click
                            //'wait': false // if wait for notification to end
                        }, function(error, response) {
                            console.log(response);
                        });

                    });
                });

			});
};
