/** @jsx React.DOM */

var React = require("react");

var YTIframe = React.createClass({
	render: function() {
		return (
			<div className="yt--iframe">
				{this.props.children}
			</div>
		)
	}
});

module.exports = YTIframe;