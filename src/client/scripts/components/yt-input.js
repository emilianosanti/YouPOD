/** @jsx React.DOM */

var React = require("react");

var YTInput = React.createClass({

	render: function() {
		return (
			<input className="yt--input-url" id="inputurl" onChange={this.props.onChange} onKeyPress={this.props.onKeyPress} value={this.props.value}>
				{this.props.children}
			</input>
		)
	}
});

module.exports = YTInput;