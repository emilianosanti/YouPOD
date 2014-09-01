
/** @jsx React.DOM */

var React = require("react");
var ReactYoutubePlayer = require("./components/player.js");
var YTContainer = require('./components/yt-container.js');
var YTForm = require('./components/yt-form.js');
var YTInput = require('./components/yt-input.js');
var YTIframe = require('./components/yt-iframe.js');
var YTButton = require('./components/yt-button.js');

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
	</YTContainer>, 
    document.getElementById('main')
);