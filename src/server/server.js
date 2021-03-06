require('array.prototype.findindex');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT;
var isDevEnvironment = process.env.DEVELOPMENT == 'true';

if (isDevEnvironment) {
	var CLIENT_ROOT = './build'
	console.log(CLIENT_ROOT);
	app.use(express.static(CLIENT_ROOT));
} else {
	console.log('Running in PRODUCTION: ' + __dirname);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	// console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
	
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


var router = express.Router();
var _videos = new Array();

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to our YouPOD api!'});	
});

router.route('/next')
	.get(function(req, res) {
		var next = undefined;
		console.log(JSON.stringify(_videos));
		if (_videos.length > 0) {
			var playingVideoIndex = _videos.findIndex(
      		function(video, index, array){
        		return video.playing;
      		});

			_videos = _videos.slice(playingVideoIndex+1);

			if (_videos.length > 0) {
				_videos[0].playing = true; // it will be always the first

				res.json(_videos[0]);
			}
		} else {
			res.json({videoId: '', title: '', playing: false, nextVideoId: '', votes: 0})
		}
});

router.route('/vote')
	.post(function(req, res){
		var id = req.body.videoId;
		var index = '';
		var votes = 0;
		for(var idx in _videos) {

			if (_videos[idx].videoId === id) {

				_videos[idx].votes++;
				votes = _videos[idx].votes;
				index = idx;
				break;
			}
		}
		if (votes === 3) {
			if (index === "0" && _videos[1]) {
				_videos[1].playing = true;
			}
			_videos.splice(index, 1);
		}
		res.send({msg : ''});
	});

router.route('/videos')
	.post(function(req, res){
		var video = req.body.video;
		var shouldPlay = _videos.length == 0;

		if (video == undefined || (video && video.videoId == '')) {
			res.status(400).send('{message: Video is undefined or videoId field is not defined}');
		} else {
			_videos.push({videoId : video.videoId, title: video.title, playing: shouldPlay, nextVideoId: '', 
				votes: video.votes});

			if (_videos.length > 1)
				_videos[_videos.length - 2].nextVideoId = video.videoId;

			console.log(JSON.stringify(_videos));
			res.json({video: _videos[_videos.length - 1]});	
		}
	})
	.get(function(req, res){
		res.json(_videos)
	});

router.route('/currently')
	.get(function(req, res){
		var current = undefined;
		for(var element in _videos) {
			if(_videos[element].playing) {
				current = _videos[element];
				break;
			}
		}
		res.json(current);
	});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
