/** @jsx React.DOM */

var React = require("react");
var Flux = require('delorean.js').Flux;
var $ = require('jquery');
var Actions = require('./actions/actions');

var ReactYoutubePlayer = require("./components/player.js");
var YTContainer = require('./components/yt-container.js');
var YTForm = require('./components/yt-form.js');
var YTInput = require('./components/yt-input.js');
var YTIframe = require('./components/yt-iframe.js');
var YTButton = require('./components/yt-button.js');
var VideoThumbnailList = require('./components/yt-video-thumbnail-list.js');
var VideoDispatcher = require('./dispatcher/dispatcher');
var Actions = require('./actions/actions');

var App = React.createClass({
	mixins: [Flux.mixins.storeListener],

	getInitialState: function() {
    	return {
    		videolist: [],
        url: '',
    		currentlyPlayingVideo: undefined
    	};
  	},

  	componentDidMount: function() {
  		console.log('App - componentDidMount');

  		Actions.retrieveVideoList();
  	},

  	render: function() {
  		console.log('App - render: ' + JSON.stringify(this.state));
  		return (
	  		<YTContainer>
					<YTInput onChange={this.onUrlChange} value={this.state.url} />
					<YTButton onClick={this.handleAddUrl}/>
  				<YTIframe>
  					<ReactYoutubePlayer 
						id={this.state.currentlyPlayingVideo?this.state.currentlyPlayingVideo.id:undefined}
  						url={this.currentlyPlayingURL()}
  						height={this.calculatePlayerHeight()} 
  						width={this.calculatePlayerWidth()}/>
  				</YTIframe>
				<YTIframe>
					<VideoThumbnailList videos={this.state.videolist}/>
				</YTIframe>
			</YTContainer>
		)
  	},

  	storeDidChange: function (storeName) {
  		console.log('App - storeDidChange: ');

  		this.setState({
  			videolist: this.stores.videoList.store.getAll(),
  			currentlyPlayingVideo: this.stores.videoList.store.currentlyPlaying()
  		});
  	},

  	currentlyPlayingURL: function() {
  		var currentlyPlayingVideo = this.stores.videoList.store.getAll().filter(
  				function(video) {
  					return video.playing;
  				}
  			);

  		if (currentlyPlayingVideo.length > 0)
  			return 'http://www.youtube.com/watch?v=' + currentlyPlayingVideo[0].id;
  		else
  			return undefined;
  	},

  	calculatePlayerWidth: function() {
		return '' + (screen.availWidth - ((screen.availWidth * 20) / 100));
	},

	calculatePlayerHeight: function() {
		return '' + (screen.height - ((screen.height * 45) / 100));
	},

  onUrlChange: function(e) {
    this.setState({url: e.target.value});
  },

  getVideoId: function(url) {
    var regex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
    if (url) return url.match(regex)[5];
  },

  handleAddUrl: function () {  
      var vurl = this.state.url;
      var videoId = this.getVideoId(vurl);
      console.log(videoId);
      Actions.addVideo({id: videoId, title: "Title", playing: false}); 
    }
});

module.exports = App;

