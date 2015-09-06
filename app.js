var config = require('./config');
var request = require('request')
var $ = require('cheerio');

request('http://photography.nationalgeographic.com/photography/photo-of-the-day/', parseHtml);

function parseHtml(err,resp,rawHtml){

	var html = $.load(rawHtml);

	html(".primary_photo img").map(function(i,link){
		var src = $(link).attr('src');
    console.log(src);

	});

}
