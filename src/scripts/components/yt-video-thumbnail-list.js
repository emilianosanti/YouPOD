/** @jsx React.DOM */

var React = require("react");
var Flux = require('delorean.js').Flux;

var VideoListStore = require('../stores/video-list-store');
var Actions = require('../actions/actions');

var VideoThumbnail = React.createClass({
	getImageURL: function(videoId) {
		return "http://img.youtube.com/vi/" + videoId + "/default.jpg"
	},

	propTypes: {
	    videoId: React.PropTypes.string,
	},

	render: function() {
		return (<li key={this.props.video.id} className="yt--videoThumbnail"><img src={this.getImageURL(this.props.video.id)}/></li>);
	}
});

var VideoThumbnailList = React.createClass({
	mixins: [Flux.mixins.storeListener],

	propTypes: {
    	allVideos: React.PropTypes.array.isRequired
	},

	getInitialState: function() {
		return Actions.getAll();
	},

	render: function() {
		var self = this;
		return ( <ul className="yt--videoThumbnailList">
				{this.stores.videoList.store._videos.map(
					function(v) {
						console.log('View: ' + JSON.stringify(v));
						return (<VideoThumbnail key={v.id} video={v} />);
					}	
				)}
				</ul> 
			);
	}
});

module.exports = VideoThumbnailList;