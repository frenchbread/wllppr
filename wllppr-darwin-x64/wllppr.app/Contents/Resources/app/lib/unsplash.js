var config = require('../config');
var request = require('request');
var wallpaper = require('wallpaper');
var $ = require('cheerio');
var exec = require('child_process').exec;
var fs = require('fs');


exports.set = function(){

			request('https://unsplash.com/', function(err,resp,rawHtml){

				var html = $.load(rawHtml);

				var photos = [];

				html(".photo img").map(function(i,link){

					var src = $(link).attr('src');

					photos.push(src);


				});

				console.log(photos.length);

				var photoID = Math.floor(Math.random() * 19) + 0;

				console.log("photoID: " + photoID);

				var url = photos[photoID];

                try {

                    stats = fs.lstatSync('./Images');

                    if (stats.isDirectory()) {

                        downloadAndSave(photoID, url);

                    }
                }
                catch (e) {

                    exec("mkdir ./lib/Images");

                    console.log("Dir 'Images' was created.");

                    downloadAndSave(photoID, url);

                }

                function downloadAndSave(photoID, url) {

                    var location = __dirname + "/Images/photo-of-the-day_" + photoID + ".jpg";

                    console.log("Staring photo download from " + url + " ...");

                    exec("wget -O " + location + " " + url, function (error, stdout, stderr) {

                        if (err) throw err;

                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);

                        console.log("Downloaded!");

                        console.log("Setting photo as desktop background!");

                        wallpaper.set(location, function(err) {

                            if (err) throw err;

                            console.log("Background photo is set!");

                        });

                    });


                }

			});
};