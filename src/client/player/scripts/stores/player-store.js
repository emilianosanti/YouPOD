var Flux = require('delorean.js').Flux;

var PlayerStore = Flux.createStore({
  _video: '',

  getVideo: function() {
    return this._video;
  },

  play: function(video) {
    this._video = video;
    this.emit('change');
  },

  actions: {
    'get-video': 'getVideo',
    'play': 'play'
  }
});

var store = new PlayerStore();
module.exports = store;

