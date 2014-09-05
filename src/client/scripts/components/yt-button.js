/** @jsx React.DOM */
var React = require("react")

var YTButton = React.createClass({
	render: function() {
		return (
				<button className = "yt--button" id="buttonid">nuevo 
				 {this.props.children}
				 </button>
			)
	}
});
module.exports = YTButton;