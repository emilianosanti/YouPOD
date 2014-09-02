var Flux = require('delorean.js').Flux;
var videoListStore = require('../stores/video-list-store');

var VideoDispatcher = Flux.createDispatcher({
  addVideo: function (video) {
    this.dispatch('add-video', video);
  },

  deleteVideo: function(id) {
  	this.dispatch('delete-video', id);
  },
  
  getAll: function() {
  	this.dispatch('get-all', null);
  },
  
  getStores: function () {
    return {videoList: videoListStore};
  }
});

module.exports = VideoDispatcher;