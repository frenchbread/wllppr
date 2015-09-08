var config = require('./config');
var request = require('request');
var wallpaper = require('wallpaper');
var $ = require('cheerio');
var exec = require('child_process').exec;

request('http://photography.nationalgeographic.com/photography/photo-of-the-day/', function(err,resp,rawHtml){

	var html = $.load(rawHtml);

	html(".primary_photo img").map(function(i,link){

		var src = $(link).attr('src');

		var url = "http:" + src;

		var location = __dirname + "/Images/photo-of-the-day.jpg ";

		exec("wget -O " + location + " " + url, function (error, stdout, stderr) {

			if (err) throw err;

		  console.log('stdout: ' + stdout);
		  console.log('stderr: ' + stderr);

			wallpaper.set("./Images/photo-of-the-day.jpg", function(err) {

				if (err) throw err;

				console.log("Background image is set!");

			});

		});

	});

});
