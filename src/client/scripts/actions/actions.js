var VideoDispatcher = require('../dispatcher/dispatcher');

var Actions = {
  	addVideo: function (video) {
    	VideoDispatcher.addVideo(video);
  	},

	deleteVideo: function (video) {
    	VideoDispatcher.deleteVideo(video);
  	},

  	play: function(videoId) {
  		VideoDispatcher.play(videoId)
  	}
};

module.exports = Actions;