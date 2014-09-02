
/** @jsx React.DOM */

var React = require("react");
var ReactYoutubePlayer = require("./components/player.js");
var YTContainer = require('./components/yt-container.js');
var YTForm = require('./components/yt-form.js');
var YTInput = require('./components/yt-input.js');
var YTIframe = require('./components/yt-iframe.js');
var YTButton = require('./components/yt-button.js');
var VideoThumbnailList = require('./components/yt-video-thumbnail-list.js');

var _videos = [
	{
		playing: false,
		title: "title",
		id: "qlBYcR60npU"
	}
];

React.renderComponent(
	<YTContainer>
		<YTForm>
			<YTInput>
			</YTInput>
			<YTButton>
			</YTButton>
		</YTForm>
		<YTIframe>
			<ReactYoutubePlayer url="http://www.youtube.com/watch?v=I8cnKNB2WIk"/>
		</YTIframe>
		<YTIframe>
			<VideoThumbnailList allVideos={_videos}/>
		</YTIframe>
	</YTContainer>, 
    document.getElementById('main')
);