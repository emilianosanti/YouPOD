/** @jsx React.DOM */

var React = require("react");

var YTContainer = require('../../common/components/yt-container.js');
var YTInput = require('../../common/components/yt-input.js');
var YTIframe = require('../../common/components/yt-iframe.js');
var YTButton = require('../../common/components/yt-button.js');
var VideoThumbnailList = require('../../common/components/yt-video-thumbnail-list.js');
var VideoDispatcher = require('../../common/dispatcher/dispatcher');

var App = require('./app');

React.renderComponent(
	<App dispatcher={VideoDispatcher} />, document.getElementById('main')
);


