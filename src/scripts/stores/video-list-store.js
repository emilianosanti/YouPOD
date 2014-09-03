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
      return this.getAll().filter(
          function(video) {
            return video.playing;
          }
        )[0];
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

