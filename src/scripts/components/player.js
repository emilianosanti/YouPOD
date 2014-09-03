/** @jsx React.DOM */

var React = require("react");
var Flux = require('delorean.js').Flux;
var sdk = require("require-sdk")("https://www.youtube.com/iframe_api", "YT");
var loadTrigger = sdk.trigger();

// YT API requires global ready event handler
window.onYouTubeIframeAPIReady = function () {
  loadTrigger();

  delete window.onYouTubeIframeAPIReady;
};

/**
 * Separates video ID from valid YouTube URL
 *
 * @param {string} url
 * @return {string}
 */

function getVideoId(url) {
  var regex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
  if (url) return url.match(regex)[5];
}

function noop() {}

var ReactYoutubePlayer = React.createClass({
	mixins: [Flux.mixins.storeListener],

	propTypes: {
	    id: React.PropTypes.string,
	    url: React.PropTypes.string,
	    height: React.PropTypes.string,
    	width: React.PropTypes.string,
	    autoplay: React.PropTypes.bool,
	    playing: React.PropTypes.func,
	    stopped: React.PropTypes.func,
	    ended: React.PropTypes.func
  	},

  	getDefaultProps: function() {
	    return {
	      	id: 'react-yt-player',
			height: '390',
	      	width: '640',
	      	url: undefined,
	      	autoplay: false,
	      	playing: noop,
	      	stopped: noop,
	      	ended: noop
	    };
  	},

	render: function() {
		return (<div id={this.props.id}></div>);
	},

	/**
	   * Once YouTube API had loaded, a new YT.Player
	   * instance will be created and its events bound.
	   */
	  
  	componentDidMount: function() {
	    var _this = this;
	    // called once API has loaded.
	    sdk(function(err, youtube) {
	    	console.log('Youtube player playing: ' + _this.props.url);
	      var player = new youtube.Player(_this.props.id, 
	      	{
	        	videoId: getVideoId(_this.props.url),
	        	height: _this.props.height,
    			width: _this.props.width,
	        	events: {
	          		'onStateChange': _this._handlePlayerStateChange
	        	}
	      	});

	      _this.setState({player: player});
	    });
	},

	componentWillUpdate: function(nextProps) {
		console.log('componentWillUpdate: ' + JSON.stringify(nextProps));
	    if (this.props.url !== nextProps.url) {
	      this._loadNewUrl(nextProps.url);
	    }
  	},

  	storeDidChange: function (storeName) {
  		console.log('storeDidChange: ' + storeName);
    	var currentlyPlaying = this.stores.videoList.store.currentlyPlaying().id;
  		
  		this.state.player.loadVideoById(currentlyPlaying);
  	},

  	/**
   * Start a new video
   *
   * @param {string} url
   */
  
  	_loadNewUrl: function(url) {
	    this.props.autoplay
	      ? this.state.player.loadVideoById(getVideoId(url))
	      : this.state.player.cueVideoById(getVideoId(url));
  	},

	/**
   * Respond to player events
   *
   * @param {object} event
   */
  
  _handlePlayerStateChange: function(event) {
    switch(event.data) {
      case 0: 
        this.props.ended();
        break;

      case 1:
        this.props.playing();
        break;

      case 2:
        this.props.stopped();
        break;

      default: 
        return;
    }
  }
});

module.exports = ReactYoutubePlayer;