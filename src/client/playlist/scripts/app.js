/** @jsx React.DOM */

var React = require("react");
var Flux = require('delorean.js').Flux;
var $ = require('jquery');

var Actions = require('./actions/actions');
var VideoDispatcher = require('./dispatcher/dispatcher');

var YTContainer = require('../../common/components/yt-container.js');
var YTIframe = require('../../common/components/yt-iframe.js');
var VideoThumbnailList = require('./components/yt-video-thumbnail-list.js');

var App = React.createClass({
	mixins: [Flux.mixins.storeListener],

	getInitialState: function() {
    	return {
    		videolist: [],
        url: '',
    		currentlyPlayingVideo: {videoId: '', title: '', playing: false, nextVideoId: '', addedBy: '',
          votedBy: []}
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
          <input className="yt--input-url" id="inputurl" placeholder="Insert url here to add" 
            onChange={this.onUrlChange} 
            onKeyPress={this.enterKey} 
            value={this.state.url}/>       

          <button onClick={this.handleAddUrl} className = "yt--button" id="buttonid" title="Click To Add" >Add
          </button>

					<VideoThumbnailList videos={this.state.videolist}/>
        </YTContainer>
		  )
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

    handleAddUrl: function () {  
      if(this.state.url != "") {
          var videoId = this.getVideoId(this.state.url);
          $.get('/api/ip', function(ip) {
            Actions.addVideo({videoId: videoId, title: "Title", playing: false, nextVideoId: '', 
            addedBy: ip, votedBy: []});
          }); 
      }
    },

    getVideoId: function(url) {
      var regex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
      if (url) return url.match(regex)[5];
    },
});

module.exports = App;

