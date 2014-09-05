/** @jsx React.DOM */

var React = require("react");
var ReactYoutubePlayer = require("./components/player.js");


var YTContainer = require('./components/yt-container.js');
var YTForm = require('./components/yt-form.js');
var YTInput = require('./components/yt-input.js');
var YTIframe = require('./components/yt-iframe.js');
var YTButton = require('./components/yt-button.js');
var VideoThumbnailList = require('./components/yt-video-thumbnail-list.js');
var VideoDispatcher = require('./dispatcher/dispatcher');

var App = require('./app');

var _videos = [
		{id: "qlBYcR60npU", title: "Title", playing: false},
      	{id: "pT9RxINEbeU", title: "Title", playing: false},
      	{id: "n3o2ERbw0aY", title: "Title", playing: false},
      	{id: "NAOeJEVX9Bk", title: "Title", playing: false},
      	{id: "LDEhk8th4eI", title: "Title", playing: false}
	]

React.renderComponent(
	<App dispatcher={VideoDispatcher} />, document.getElementById('main')
);


