var Flux = require('delorean.js').Flux;
var playerStore = require('../stores/player-store');

var VideoDispatcher = Flux.createDispatcher({

  getVideo: function() {
  	  this.dispatch('get-video');
  },
  
  play: function(video) {
      this.dispatch('play', video);
  },

  getStores: function () {
    return {video: playerStore};
  }
});

module.exports = VideoDispatcher;