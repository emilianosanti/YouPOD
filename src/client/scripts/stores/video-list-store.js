var Flux = require('delorean.js').Flux;

var VideoListStore = Flux.createStore({
  _videos: [],

  addAll: function(newVideos) {
    for (var i = 0; i < newVideos.length; i++) {
      this._videos.push(newVideos[i]);
    }

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

  play: function(id) {
      this._videos.forEach(
          function playing(video) {

            if (video.videoId === id) 
              video.playing = true;
            else
              video.playing = false;
          }
      );
      this.emit('change');
  },

  currentlyPlaying: function() {
      var currentlyPlayingVideoArray = this._videos.filter(
          function(video) {
            return video.playing;
          }
        );

      if (currentlyPlayingVideoArray.length <= 0)
        return {videoId: '', title: '', playing: false}
      else {
        return currentlyPlayingVideoArray[0];
      }
  },

  actions: {
    'add-video': 'addVideo',
    'delete-video': 'deleteVideo',
    'get-all': 'getAll',
    'play': 'play',
    'add-all': 'addAll'
  }
});

var store = new VideoListStore();
module.exports = store;

