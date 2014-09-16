var Flux = require('delorean.js').Flux;

var VideoListStore = Flux.createStore({
  _videos: [],

  addAll: function(newVideos) {
    this._videos.splice.apply(this._videos, [0, newVideos.length].concat(newVideos))

    this.emit('change');
  },

  getAll: function() {
      return this._videos;
  },

  getVideo: function(id) {
    return this._videos[id];
  },

  addVideo: function(video) {
    this._videos.push(video);
    this.emit('change');
  },

  deleteVideo: function(id) {
    delete this._videos[id];
  },

  currentlyPlaying: function() {
      var currentlyPlayingVideoArray = this._videos.filter(
          function(video) {
            return video.playing;
          }
        );

      if (currentlyPlayingVideoArray.length <= 0)
        return {videoId: '', title: '', playing: false, nextVideoId: ''}
      else {
        return currentlyPlayingVideoArray[0];
      }
  },

  actions: {
    'add-video': 'addVideo',
    'delete-video': 'deleteVideo',
    'get-all': 'getAll',
    'add-all': 'addAll'
  }
});

var store = new VideoListStore();
module.exports = store;

