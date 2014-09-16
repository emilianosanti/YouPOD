/** @jsx React.DOM */

var React = require("react");
var Flux = require('delorean.js').Flux;

var VideoListStore = require('../../../common/stores/video-list-store');
var Actions = require('../../../common/actions/actions');

var VideoThumbnailList = React.createClass({
	mixins: [Flux.mixins.storeListener],

	propTypes: {
		videos: React.PropTypes.array
	},

	render: function() {
		var self = this;
		
		return 	(
		<div className="yt--thumbnail-container">
				<span className="yt--thumbnail-span">CHECKOUT THE PLAYLIST</span>
					<ul className="yt--videoThumbnailList" id="yt--video-thumbnail">
					{
						this.props.videos.map(
									function(v, i) {
								return (
									<li key={v.videoId}  
										className="yt--videoThumbnail">
										<a href="#">
											<img src={self.getImageURL(v.videoId)}/>
										</a>
									</li>
								);
							}
						)
					}
					</ul>
		</div> 
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