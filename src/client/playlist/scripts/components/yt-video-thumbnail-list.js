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
										<img id={v.videoId} src={self.getImageURL(v.videoId)} 
											style={self.getOpacity(v.videoId)} />
									</a>
									<span className="yt--video-name">{self.getThumbnailTitle(v.videoId)}</span>
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

	getThumbnailTitle: function(videoId) {
		var title = '';

		$.ajax({
			type : 'GET',
			url : 'http://gdata.youtube.com/feeds/api/videos/' + videoId + '?v=2',
			success : function(data) {
				title = $(data).find('entry').find('title').text();
			},
			async : false
		});

		return title;
	},

	getOpacity: function(videoId) {

	  	var _this = this;

      	for (var idx in _this.props.videos) {

	      	if (_this.props.videos[idx].videoId === videoId) {
	          
	          switch(this.props.videos[idx].votes){
	            case "0":
	            case 0:
	              return {'opacity' : 1};
	              break;
	            case 1:
	              return {'opacity' : 0.7};
	              break;
	            case 2:
	              return {'opacity' : 0.3};
	              break;
	            default:
	              console.log('Oops!');
	          }
	          break;
	       }
   	  	}
  	},

	vote: function(index) {
		$.post('/api/vote', {'videoId' : this.props.videos[index].videoId});
		this.props.videos[index].votes++;
		console.log(this.props.videos[index].votes);

		switch(this.props.videos[index].votes){
			case 1:
				$('#'+this.props.videos[index].videoId).css("opacity", "0.7");
				break;
			case 2:
				$('#'+this.props.videos[index].videoId).css("opacity", "0.3");
				break;
			case 3:
				$.post('/api/del', {'videoId' : this.props.videos[index].videoId});
        		this.props.videos.splice(index, 1);
        		location.reload();
        		break;
        	default:
        		console.log('Oops!');     	
        }
	}
});

module.exports = VideoThumbnailList;