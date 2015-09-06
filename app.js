var config = require('./config');

var recent = require('flickr-recent')({
  key: config.get("apikey")
});

recent(function (error, result) {
  console.log(result);
  // => { "id": "14261747769", "owner": "38040930@N05", "secret": "ed6e9380d7", "server": "2925", "farm": 3, "title": "Desert Camo BumbleBot one off #mikedie #bumblebot #resin #dunny #rwk #transformers #bumblebee #camo  Mikedie.bigcartel.com", "ispublic": 1, "isfriend": 0, "isfamily": 0 }
})
