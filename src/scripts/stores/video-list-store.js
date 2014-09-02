var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';
var _videos = {};

function addVideo(videoId, title) {
	_videos[videoId] = {
		playing: false,
		title: title,
		id: videoId
	};
}

function removeVideo(videoId) {
	delete _videos[videoId];
}

var VideoListStore = merge(EventEmitter.prototype, {
	processActions: function() {
		return getAll();
	},

	getAll: function() {
    	return _videos;
  	},

	emitChange: function() {
    	this.emit(CHANGE_EVENT);
  	},

  	/**
   	* @param {function} callback
   	*/
  	addChangeListener: function(callback) {
    	this.on(CHANGE_EVENT, callback);
  	},

  	/**
   	* @param {function} callback
   	*/
  	removeChangeListener: function(callback) {
    	this.removeListener(CHANGE_EVENT, callback);
  	}
});

module.exports = VideoListStore;