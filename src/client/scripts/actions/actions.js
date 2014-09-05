var VideoDispatcher = require('../dispatcher/dispatcher');
var $ = require('jquery');

var Actions = {
  	addVideo: function (video) {
    	VideoDispatcher.addVideo(video);
  	},

    deleteVideo: function (video) {
    	VideoDispatcher.deleteVideo(video);
  	},

  	play: function(videoId) {
  		VideoDispatcher.play(videoId)
  	},

  	retrieveVideoList: function() {
  		$.get('http://localhost:4001/api/videolist', function(result) {
  			console.log(result);
  			VideoDispatcher.addAll(result);
  		})
  		.fail(function(){
  			console.log('Request for videoList failed');
  		});
  	}
};

module.exports = Actions;