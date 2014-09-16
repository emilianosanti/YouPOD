var Flux = require('delorean.js').Flux;
var playlistStore = require('../stores/playlist-store');

var VideoDispatcher = Flux.createDispatcher({
  addVideo: function (video) {
    console.log('VideoDispatcher - addVideo: ' + JSON.stringify(video));
    this.dispatch('add-video', video);
  },

  deleteVideo: function(id) {
    console.log('VideoDispatcher - deleteVideo: ' + JSON.stringify(id));
    this.dispatch('delete-video', id);
  },

  addAll: function(videos) {
    console.log('VideoDispatcher - addAll: ' + JSON.stringify(videos));
    this.dispatch('add-all', videos);
  },

  getStores: function () {
    return {videoList: playlistStore};
  }
});

module.exports = VideoDispatcher;