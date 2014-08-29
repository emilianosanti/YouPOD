/** @jsx React.DOM */

var React = require ('react');

var YTForm = React.createClass ({

	render: function () {
		return (
				<form className="yt--form">
					{this.props.children}
				</form>
			)
	}

});

module.exports = YTForm;