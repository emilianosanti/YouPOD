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
								<li key={v.id}  className="yt--videoThumbnail">
									<a href="#" onClick={self.play.bind(self, i)}>
										<img src={self.getImageURL(v.id)}/>
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
		Actions.play(this.props.videos[index].id);
  	},

	getImageURL: function(videoId) {
		return "http://img.youtube.com/vi/" + videoId + "/default.jpg"
	}
});

module.exports = VideoThumbnailList;