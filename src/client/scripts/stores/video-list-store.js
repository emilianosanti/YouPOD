var Flux = require('delorean.js').Flux;

var VideoListStore = Flux.createStore({
  _videos: [],

  initialize: function (url) {
    this._videos.push(
      {id: "qlBYcR60npU", title: "Title", playing: false},
      {id: "pT9RxINEbeU", title: "Title", playing: false},
      {id: "n3o2ERbw0aY", title: "Title", playing: false},
      {id: "NAOeJEVX9Bk", title: "Title", playing: false},
      {id: "LDEhk8th4eI", title: "Title", playing: false}
      )
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

            if (video.id === id) 
              video.playing = true;
            else
              video.playing = false;
          }
      );
      this.emit('change');
  },

  currentlyPlaying: function() {
<<<<<<< HEAD:src/scripts/stores/video-list-store.js
      var currentlyPlayingVideo = this.getAll().filter(
=======
      var currentlyPlayingVideoArray = this._videos.filter(
>>>>>>> Leandro Soler - Changing the structure:src/client/scripts/stores/video-list-store.js
          function(video) {
            return video.playing;
          }
        )[0];

<<<<<<< HEAD:src/scripts/stores/video-list-store.js
      console.log(currentlyPlayingVideo);
      if (currentlyPlayingVideo === undefined)
        return {id: "", title: "", playing: false};
      else
        return currentlyPlayingVideo;
=======
      
      if (currentlyPlayingVideoArray.length <= 0)
        return {videoId: '', title: '', playing: false}
      else {
        return currentlyPlayingVideoArray[0];
      }
>>>>>>> Leandro Soler - Changing the structure:src/client/scripts/stores/video-list-store.js
  },

  actions: {
    'add-video': 'addVideo',
    'delete-video': 'deleteVideo',
    'get-all': 'getAll',
    'play': 'play'
  }
});

var store = new VideoListStore();
module.exports = store;

