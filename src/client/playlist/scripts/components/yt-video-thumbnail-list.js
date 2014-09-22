/** @jsx React.DOM */

var React = require("react");
var Flux = require('delorean.js').Flux;
var $ = require('jquery');

var VideoListStore = require('../stores/playlist-store');
var Actions = require('../actions/actions');

var VideoThumbnailList = React.createClass({
	mixins: [Flux.mixins.storeListener],

	propTypes: {
		videos: React.PropTypes.array
	},

	render: function() {
		var self = this;
		
		return 	(
		<div className="yt--thumbnail-container">
					<ul className="yt--videoThumbnailList" id="yt--video-thumbnail">
					{
						this.props.videos.map(
									function(v, i) {
								return (
									<li key={v.videoId}  
										className="yt--videoThumbnail">
										<a href="#" onClick={self.vote.bind(self, i)}>
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
	},

	vote: function(index) {
		var _this = this;

		$.get('/api/ip', function(ip) {
            var votes = _this.props.videos[index].votedBy;
            if (votes) {
            	for(var vote in votes) {
					if(votes[vote] === ip) {
						break;
					}
					_this.props.videos[index].votedBy.push(ip);
				}
            } else {
            	_this.props.videos[index].votedBy = [ip];
            }
            if (_this.props.videos[index].votedBy.length === 2) {
            	$.post('/api/del', {'videoId' : _this.props.videos[index].videoId}, function(res){
            		console.log('ATRODEN');
            	});
            	_this.props.videos.splice(index, 1);
            }
            console.log(JSON.stringify(_this.props.videos[index].votedBy));
         });
	}
});

module.exports = VideoThumbnailList;