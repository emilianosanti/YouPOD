/** @jsx React.DOM */

var React = require("react");

var VideoDispatcher = require('./dispatcher/dispatcher');

var App = require('./app');

React.renderComponent(
	<App dispatcher={VideoDispatcher} />, document.getElementById('main')
);


