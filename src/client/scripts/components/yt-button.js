/** @jsx React.DOM */
var React = require("react");
var Actions = require('../actions/actions');

var YTButton = React.createClass({
	render: function() {
		var self = this;
		return (
				<button onClick={self.handleClick} className = "yt--button" id="buttonid"> +
				 {this.props.children}
				 </button>
			)
	},

	handleClick: function () {	
  		console.log('handleClick');
  		Actions.addVideo({videoId: "xX8TrPeIb2c", title: "Title", playing: false});
	}
});
module.exports = YTButton;