/** @jsx React.DOM */

var React = require("react");
var Flux = require('delorean.js').Flux;

var VideoListStore = require('../stores/video-list-store');
var Actions = require('../actions/actions');

var VideoThumbnailList = React.createClass({
	mixins: [Flux.mixins.storeListener],

	propTypes: {
		videos: React.PropTypes.array
	},

	render: function() {
		var self = this;
		
		return 	( 
				<ul className="yt--videoThumbnailList">
				{
					this.props.videos.map(
	
						function(v, i) {
							return (
								<li key={v.videoId}  className="yt--videoThumbnail">
									<a href="#" onClick={self.play.bind(self, i)}>
										<img src={self.getImageURL(v.videoId)}/>
									</a>
								</li>
								
							);
						}
	
					)
				}
				</ul> 
				);
	},

	play: function(index) {
		console.log('play: ' + index);
		Actions.play(this.props.videos[index].videoId);
  	},

	getImageURL: function(videoId) {
		return "http://img.youtube.com/vi/" + videoId + "/default.jpg"
	}
});

module.exports = VideoThumbnailList;