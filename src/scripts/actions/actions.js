var VideoDispatcher = require('../dispatcher/dispatcher');

var Actions = {
  	addVideo: function (video) {
    	VideoDispatcher.addVideo(video);
  	},

	deleteVideo: function (video) {
    	VideoDispatcher.deleteVideo(video);
  	},

  	getAll: function() {
  		return VideoDispatcher.getAll();
  	}
};

module.exports = Actions;