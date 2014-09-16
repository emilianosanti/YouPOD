var VideoDispatcher = require('../dispatcher/dispatcher');
var $ = require('jquery');

var Actions = {
  	addVideo: function (video) {
      var this_ = this;
      $.post('/api/videos', {'video':video}, function(result) {
        console.log('Video added: ' + JSON.stringify(result.video));
        
        this_.retrieveVideoList();
      });    	
  	},

    deleteVideo: function (video) {
    	VideoDispatcher.deleteVideo(video);
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