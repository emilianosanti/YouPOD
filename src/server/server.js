var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 4001;
var CLIENT_ROOT = '/home/developer/work/learn-js/build/client'

// configure app to use bodyParser()
// this will let us get the data from a POST
console.log(CLIENT_ROOT);
app.use(express.static(CLIENT_ROOT));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });


var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/videolist')
	.post(function(req, res){
		res.json({message: 'Saving list of videos'});	
	})

	.get(function(req, res){
		var _videos = [];
		_videos.push(
	      {videoId: "qlBYcR60npU", title: "Title", playing: false},
	      {videoId: "pT9RxINEbeU", title: "Title", playing: false},
	      {videoId: "n3o2ERbw0aY", title: "Title", playing: false},
	      {videoId: "NAOeJEVX9Bk", title: "Title", playing: false},
	      {videoId: "LDEhk8th4eI", title: "Title", playing: false}
	      );

		res.json(_videos);
	});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
