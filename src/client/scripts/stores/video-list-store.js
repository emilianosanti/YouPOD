var Flux = require('delorean.js').Flux;

var VideoListStore = Flux.createStore({
  _videos: [],

  getAll: function() {
      return this._videos;
  },

  getVideo: function(videoId) {
    return this._videos[videoId];
  },

  addAll: function(videos) {
    console.log('Store - addAll ' + JSON.stringify(videos));

    for (var i = 0; i < videos.length; i++) {
      this._videos.push(videos[i]);  
    }
    
    console.log(JSON.stringify(this._videos));

    this.emit('change');    
  },

  addVideo: function(video) {
    console.log('Store - addVideo ' + JSON.stringify(video));
    this._videos.push(video);

    this.emit('change');
  },

  deleteVideo: function(videoId) {
    delete this._videos[videoId];
  },

  play: function(videoId) {
      console.log('Store - play: ' + videoId);
      this._videos.forEach(
          function playing(video) {
            
            if (video.videoId === videoId) {
              video.playing = true;
              console.log('playing ' + video.videoId);
            } else
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

