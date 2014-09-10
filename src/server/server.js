var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT;
var isDevEnvironment = process.env.DEVELOPMENT == 'true';
console.log(isDevEnvironment);

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
	console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
	
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to our YouPOD api!'});	
});

router.route('/videolist')
	.post(function(req, res){
		res.json({message: 'Saving list of videos'});	
	})

	.get(function(req, res){
		var _videos = [];
		_videos.push(
	      {videoId: "qlBYcR60npU", title: "Title", playing: false, nextVideoId: "pT9RxINEbeU"},
	      {videoId: "pT9RxINEbeU", title: "Title", playing: false, nextVideoId: "n3o2ERbw0aY"},
	      {videoId: "n3o2ERbw0aY", title: "Title", playing: false, nextVideoId: "NAOeJEVX9Bk"},
	      {videoId: "NAOeJEVX9Bk", title: "Title", playing: false, nextVideoId: "LDEhk8th4eI"},
	      {videoId: "LDEhk8th4eI", title: "Title", playing: false, nextVideoId: undefined}
	      );

		res.json(_videos);
	});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
