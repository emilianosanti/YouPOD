var $ = require('jquery');

var VideoDispatcher = require('../dispatcher/dispatcher');

var Actions = {
  	addVideo: function (video) {
    	VideoDispatcher.addVideo(video);
  	},

	deleteVideo: function (video) {
    	VideoDispatcher.deleteVideo(video);
  	},

  	play: function(videoId) {
  		console.log('Actions - play: ' + videoId);
  		VideoDispatcher.play(videoId)
  	},

  	addAll: function(videos) {
  		console.log('Actions - addAll: ' + videos);
  		VideoDispatcher.addAll(videos)
  	},

  	retrieveVideoList: function() {
  		console.log('Actions - retrieveVideoList');

  		$.getJSON('http://localhost:4001/api/videolist', function(result) {
  			console.log('Actions - result: ' + result)
        	
        	VideoDispatcher.addAll(result);

	    }).fail(function(jqXHR, textStatus, errorThrown) {
	    	console.log('The retrieval of video list failed: ' + textStatus + ' - ' + errorThrown);
	    }).done(function() {
	    	console.log('Done');
	    });
  	}
};

module.exports = Actions;