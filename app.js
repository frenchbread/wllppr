var config = require('./config');
var request = require('request');
var wallpaper = require('wallpaper');
var $ = require('cheerio');
var exec = require('child_process').exec;

request('http://photography.nationalgeographic.com/photography/photo-of-the-day/', getImageURL);

function getImageURL(err,resp,rawHtml){

	var html = $.load(rawHtml);

	html(".primary_photo img").map(function(i,link){

		var src = $(link).attr('src');

		var url = "http:" + src;

		var location = __dirname + "/Images/file.jpg ";
		console.log(location)

		exec("wget -O " + location + " " + url, setWallPaper(location) );

	});

}

function setWallPaper(location){
	wallpaper.set(location, function(err){

		if (err) console.log(err);

		console.log("Done");

	});
}
