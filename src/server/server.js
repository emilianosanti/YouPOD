var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT;
var isDevEnvironment = process.env.DEVELOPMENT == 'true';

if (isDevEnvironment) {
	var CLIENT_ROOT = '/home/developer/work/learn-js/build/client'
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
var _videos = [];

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to our YouPOD api!'});	
});

router.route('/videos')
	.post(function(req, res){
		var video = req.body.video;
		var shouldPlay = _videos.length == 0;

		if (video == undefined || (video && video.videoId == '')) {
			res.status(400).send('{message: Video is undefined or videoId field is not defined}');
		} else {
			_videos.push({videoId : video.videoId, title: video.title, playing: shouldPlay, nextVideoId: ''});

			if (_videos.length > 1)
				_videos[_videos.length - 1].nextVideoId = video.videoId;

			res.json({message: 'Video added: ' + JSON.stringify(video)});	
		}
	})
	.get(function(req, res){
		res.json(_videos)
	});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
