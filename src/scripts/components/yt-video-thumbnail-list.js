/** @jsx React.DOM */

var React = require("react");
var VideoListStore = require('../stores/video-list-store');

var VideoThumbnail = React.createClass({
	getImageURL: function(videoId) {
		return "http://img.youtube.com/vi/" + videoId + "/default.jpg"
	},

	propTypes: {
	    videoId: React.PropTypes.string,
	},

	render: function() {
		return (<div className="yt--videoThumbnail"><img src={this.getImageURL(this.props.videoId)}/></div>);
	}
});

var VideoThumbnailList = React.createClass({
	propTypes: {
    	allVideos: React.PropTypes.array.isRequired
	},

	getInitialState: function() {
		return VideoListStore.getAll();
	},

	componentDidMount: function() {
    	VideoListStore.addChangeListener(this._onChange);
  	},

  	componentWillUnmount: function() {
    	VideoListStore.removeChangeListener(this._onChange);
  	},

	render: function() {
		var allVideos = this.props.allVideos
		var videoThumbnails = [];

	    for (var key in allVideos) {
	    	console.log(allVideos[key].id);
	      	videoThumbnails.push(<VideoThumbnail videoId={allVideos[key].id} />);
	    }

		return (<div className="yt--videoThumbnailList">{videoThumbnails}</div>);
	},

	_onChange: function() {
    	this.setState(VideoListStore.getAll());
  	}
});

module.exports = VideoThumbnailList;