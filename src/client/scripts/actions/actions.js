var VideoDispatcher = require('../dispatcher/dispatcher');
var $ = require('jquery');

var Actions = {
  	addVideo: function (video) {
      $.post('/api/videos', {'video':video}, function() {
        console.log('Video added: ' + JSON.stringify(video));
        VideoDispatcher.addVideo(video);  
      });    	
  	},

    deleteVideo: function (video) {
    	VideoDispatcher.deleteVideo(video);
  	},

  	play: function(videoId) {
  		VideoDispatcher.play(videoId)
  	},

  	retrieveVideoList: function() {
  		$.get('/api/videos', function(videos) {
  			console.log(videos);
  			VideoDispatcher.addAll(videos);
  		})
  		.fail(function(){
  			console.log('Request for videoList failed');
  		});
  	}
};

module.exports = Actions;