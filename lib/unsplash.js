var config = require('../config');
var request = require('request');
var wallpaper = require('wallpaper');
var $ = require('cheerio');
var exec = require('child_process').exec;
var fs = require('fs');

try {

    stats = fs.lstatSync(__dirname  + '/Images');

    if (stats.isDirectory()) {

        // ..

    }
}
catch (e) {

    var dir = __dirname + "/Images";

    exec("mkdir " + dir);

    console.log("Dir 'Images' was created.");

}


exports.set = function(){

			request('https://unsplash.com/', function(err,resp,rawHtml){

				var html = $.load(rawHtml);

				var photos = [];

				html(".photo-description__download a").map(function(i,link){

					var src = $(link).attr('href');

					photos.push(src);

				});

                console.log(photos);

                console.log(photos.length);

                var photoID = Math.floor(Math.random() * 19) + 0;

                console.log("photoID: " + photoID);

                var url = "https://unsplash.com" + photos[photoID];

                var location = __dirname + "/Images/photo-of-the-day_" + photoID + ".jpg";

                console.log("Staring photo download from " + url + " ...");


                var download = function(uri, filename, callback){
                    request.head(uri, function(err, res, body){
                        console.log('content-type:', res.headers['content-type']);
                        console.log('content-length:', res.headers['content-length']);

                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };

                download(url, location, function(){
                    console.log('done');
                    wallpaper.set(location, function(err) {

                        if (err) throw err;

                        alert("Background photo is set!");

                    });
                });

			});
};
