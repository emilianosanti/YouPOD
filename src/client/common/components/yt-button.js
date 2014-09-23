/** @jsx React.DOM */
var React = require("react");


var YTButton = React.createClass({
	render: function() {
		var self = this;
		return (
				<button onClick={this.props.onClick} className = "yt--button" id="buttonid" title="Click To Add" >
				 {this.props.children}
				 </button>
			)
	}
});
module.exports = YTButton;
