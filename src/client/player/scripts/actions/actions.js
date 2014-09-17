var PlayerDispatcher = require('../dispatcher/dispatcher');
var $ = require('jquery');

var Actions = {

  	play: function(video) {
  		PlayerDispatcher.play(video)
  	},

  	getCurrentlyPlayingVideo: function() {

  		$.get('/api/currently', function(video) {
  			
  			PlayerDispatcher.play(video);
  		});
  	}
};

module.exports = Actions;