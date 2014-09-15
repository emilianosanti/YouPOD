/** @jsx React.DOM */

var React = require("react");

var YTContainer = React.createClass({
	render: function() {
		return (
			<div className="yt--container">
				{this.props.children}
			</div>
		)
	}
});

module.exports = YTContainer;