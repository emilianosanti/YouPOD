/** @jsx React.DOM */

var React = require("react");
var ReactYoutubePlayer = require("./components/player.js");


var YTContainer = require('./components/yt-container.js');
var YTInput = require('./components/yt-input.js');
var YTIframe = require('./components/yt-iframe.js');
var YTButton = require('./components/yt-button.js');
var VideoThumbnailList = require('./components/yt-video-thumbnail-list.js');
var VideoDispatcher = require('./dispatcher/dispatcher');

var App = require('./app');

React.renderComponent(
	<App dispatcher={VideoDispatcher} />, document.getElementById('main')
);


