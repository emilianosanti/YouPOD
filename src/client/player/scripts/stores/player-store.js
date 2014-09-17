var Flux = require('delorean.js').Flux;

var PlayerStore = Flux.createStore({
  _video: '',

  getVideo: function() {
    return this._video;
  },

  play: function(video) {
    if (this._isValid(video)) {
      this._video = video;
      this.emit('change');  
    } else {
      console.log('The video is not valid to be play: ' + JSON.stringify(video));
    }
    
  },

  _isValid: function(video) {
    if (video.videoId === undefined)
      return false;

    if (video.videoId === '')
      return false;

    return true;
  },

  actions: {
    'get-video': 'getVideo',
    'play': 'play'
  }
});

var store = new PlayerStore();
module.exports = store;

