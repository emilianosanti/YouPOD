/** @jsx React.DOM */

var React = require("react");

var YTInput = React.createClass({

	render: function() {
		return (
			<input className="yt--input-url" id="inputurl" placeholder="Insert url here to add" onChange={this.props.onChange} onKeyUp={this.props.onKeyUp} value={this.props.value}>
				{this.props.children}
			</input>
		)
	}
});

module.exports = YTInput;