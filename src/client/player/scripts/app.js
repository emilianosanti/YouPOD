/** @jsx React.DOM */

var React = require("react");
var Flux = require('delorean.js').Flux;
var $ = require('jquery');
var Actions = require('../../common/actions/actions');

var ReactYoutubePlayer = require("../../common/components/player.js");
var YTContainer = require('../../common/components/yt-container.js');
var YTIframe = require('../../common/components/yt-iframe.js');
var VideoDispatcher = require('../../common/dispatcher/dispatcher');
var Actions = require('../../common/actions/actions');

var App = React.createClass({
	mixins: [Flux.mixins.storeListener],

	getInitialState: function() {
    	return {
    		videolist: [],
        url: '',
    		currentlyPlayingVideo: {videoId: '', title: '', playing: false, nextVideoId: ''}
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
  				<YTIframe>
  					<ReactYoutubePlayer 
						  videoId={this.state.currentlyPlayingVideo.videoId}
  						height={this.calculatePlayerHeight()} 
						width={this.calculatePlayerWidth()}
            ended={this._handleEnd}/>
  				</YTIframe>
			</YTContainer>
		)
    },  

    _handleEnd: function() {
        Actions.play(this.stores.videoList.store.getVideo(this.state.currentlyPlayingVideo.nextVideoId));
    },
  
  	storeDidChange: function (storeName) {
  		console.log('App - storeDidChange: ');

  		this.setState({
        url: '',
  			videolist: this.stores.videoList.store.getAll(),
  			currentlyPlayingVideo: this.stores.videoList.store.currentlyPlaying()
  		});
  	},

  	calculatePlayerWidth: function() {
		  return '' + (screen.availWidth - ((screen.availWidth * 20) / 100));
    },

	calculatePlayerHeight: function() {
		return '' + (screen.height - ((screen.height * 45) / 100));
	},

  enterKey: function(e) {
    var key = e.which;
       if (key == 13){ 
          if(this.state.url != ""){
            this.handleAddUrl();
          }
        }
     },

  onUrlChange: function(e) {
    this.setState({url: e.target.value});
  },

  getVideoId: function(url) {
    var regex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
    if (url) return url.match(regex)[5];
  },

  handleAddUrl: function () {  
    if(this.state.url != "") {
        var vurl = this.state.url;
        var videoId = this.getVideoId(vurl);
        console.log(videoId);
        Actions.addVideo({videoId: videoId, title: "Title", playing: false, nextVideoId: ''}); 
        // this.setState({url: ""});
    }
  }
});

module.exports = App;

