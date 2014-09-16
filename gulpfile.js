var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reactify = require('reactify');
var notify = require('gulp-notify');
var del = require('del');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var server = require('gulp-express');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');

var DIST_ROOT = './dist/';
var BUILD_ROOT = './build/';
var SRC_ROOT = './src/client/';
var SERVER_ROOT = './src/server/';

var PLAYER_BUILD_ROOT = BUILD_ROOT + 'player/';
var PLAYLIST_BUILD_ROOT = BUILD_ROOT + 'playlist/';

var PLAYER_SRC_ROOT = SRC_ROOT + 'player/';
var PLAYLIST_SRC_ROOT = SRC_ROOT + 'playlist/';

gulp.task('player-clean', function(cb) {
  del([PLAYER_BUILD_ROOT], cb);
});

gulp.task('playlist-clean', function(cb) {
  del([PLAYLIST_BUILD_ROOT], cb);
});

gulp.task('clean', ['player-clean', 'playlist-clean']);

// STYLES
gulp.task('player-styles', function() {
  return gulp.src([PLAYER_SRC_ROOT + 'styles/main.scss'])
    .pipe(sass())
    .pipe(gulp.dest(PLAYER_BUILD_ROOT + '/css/'));
});

gulp.task('playlist-styles', function() {
  return gulp.src([PLAYLIST_SRC_ROOT + 'styles/main.scss'])
    .pipe(sass())
    .pipe(gulp.dest(PLAYLIST_BUILD_ROOT + '/css/'));
});

gulp.task('styles', ['player-styles', 'playlist-styles']);

// SCRIPTS
gulp.task('player-scripts', function () {
  var bundler = browserify(PLAYER_SRC_ROOT + 'scripts/main.js', {basedir: __dirname}).transform(reactify);
  var stream = bundler.bundle();

  return stream
    .pipe(source('main.js'))
    .pipe(gulp.dest(PLAYER_BUILD_ROOT + '/scripts/'));
});

gulp.task('playlist-scripts', function () {
  var bundler = browserify(PLAYLIST_SRC_ROOT + 'scripts/main.js', {basedir: __dirname}).transform(reactify);
  var stream = bundler.bundle();

  return stream
    .pipe(source('main.js'))
    .pipe(gulp.dest(PLAYLIST_BUILD_ROOT + '/scripts/'));
});

gulp.task('scripts', ['player-scripts', 'playlist-scripts']);

// MARKUP
gulp.task('player-markup', function() {
    return gulp.src ([PLAYER_SRC_ROOT + 'index.html'])
        .pipe(gulp.dest(PLAYER_BUILD_ROOT));
});

gulp.task('playlist-markup', function() {
    return gulp.src ([PLAYLIST_SRC_ROOT + 'index.html'])
        .pipe(gulp.dest(PLAYLIST_BUILD_ROOT));
});

gulp.task('markup', ['player-markup', 'playlist-markup'], function() {
  return gulp.src ([SRC_ROOT + 'index.html'])
        .pipe(gulp.dest(BUILD_ROOT));
});

//IMAGES

gulp.task('player-images', function() {
    return gulp.src ([PLAYER_SRC_ROOT + 'images/*'])
        .pipe(gulp.dest(PLAYER_BUILD_ROOT + '/images/'));
});

gulp.task('playlist-images', function() {
    return gulp.src ([PLAYLIST_SRC_ROOT + 'images/*'])
        .pipe(gulp.dest(PLAYLIST_BUILD_ROOT + '/images/'));
});

gulp.task('images', ['player-images', 'playlist-images']);

// BUILD
gulp.task('player-build', function(callback) {
  runSequence('player-clean',
              ['player-styles', 'player-scripts', 'player-markup', 'player-images'],
              callback);
});

gulp.task('playlist-build', function(callback) {
  runSequence('playlist-clean',
              ['playlist-styles', 'playlist-scripts', 'playlist-markup', 'playlist-images'],
              callback);
});

gulp.task('build', ['styles', 'scripts', 'markup', 'images']);

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: BUILD_ROOT
        }
    });
});

gulp.task('build-server', function() {
    return gulp.src([SERVER_ROOT + '/server.js'])
        .pipe(gulp.dest(BUILD_ROOT + 'server/'));
});

gulp.task('server', ['build-server'], function () {
    // start the server at the beginning of the task
    server.run({
        file: BUILD_ROOT + 'server/server.js'
    });

    // restart the server when file changes
    gulp.watch([SERVER_ROOT + '/*.js'], server.notify);
});

gulp.task('default', function(cb) {
  runSequence('clean',
              ['build'],
              'server',
              cb);
});

