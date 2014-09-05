/** @jsx React.DOM */

var React = require("react");

var YTInput = React.createClass({

	render: function() {
		return (
			<input className="yt--input-url" id="inputurl">
				{this.props.children}
			</input>
		)
	}
});

module.exports = YTInput;