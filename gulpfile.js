var fs = require('fs');
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

var DIST_ROOT = 'dist/';

var BUILD_ROOT = 'build/';
var BUILD_CLIENT_ROOT = BUILD_ROOT + 'client';
var BUILD_SERVER_ROOT = BUILD_ROOT + 'server';

var CLIENT_ROOT = './src/client';
var CLIENT_ROOT_SCRIPTS = CLIENT_ROOT + '/scripts';
var CLIENT_ROOT_STYLES = CLIENT_ROOT + '/styles';
var CLIENT_ROOT_IMAGES = CLIENT_ROOT + '/images';

var SERVER_ROOT = './src/server';

var version = require("./package.json").version;

gulp.task('clean', function(cb) {
    del([BUILD_ROOT, DIST_ROOT], cb);
});

gulp.task('styles', function() {
	return gulp.src([CLIENT_ROOT_STYLES + '/main.scss'])
		.pipe(sass())
		.pipe(gulp.dest(BUILD_CLIENT_ROOT + '/css/'));
});

gulp.task('scripts', function () {
  var bundler = browserify(CLIENT_ROOT_SCRIPTS + '/main.js', {basedir: __dirname}).transform(reactify);
  var stream = bundler.bundle();

  return stream
    .pipe(source('main.js'))
    .pipe(gulp.dest(BUILD_CLIENT_ROOT + '/scripts/'));
});

gulp.task('markup', function() {
    return gulp.src ([CLIENT_ROOT + '/index.html'])
        .pipe(gulp.dest(BUILD_CLIENT_ROOT + '/'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: BUILD_CLIENT_ROOT,
            port: 4001
        }
    });
});

gulp.task('build-server', function() {
    return gulp.src([SERVER_ROOT + '/server.js'])
        .pipe(gulp.dest(BUILD_SERVER_ROOT + '/'));
});

gulp.task('images', function() {
    return gulp.src ([CLIENT_ROOT_IMAGES + '/*'])
        .pipe(gulp.dest(BUILD_CLIENT_ROOT + '/css/images/'));
});

gulp.task('server', ['build-server'], function () {
    //start the server at the beginning of the task
    server.run({
        file: BUILD_SERVER_ROOT + '/server.js'
    });

    //restart the server when file changes
    gulp.watch([SERVER_ROOT + '/*.js'], server.notify);
});

gulp.task('zip', function() {
    var fileName = 'youpod-' + version + '.zip';

    return gulp.src([BUILD_ROOT + '/**/*'])
        .pipe(zip(fileName))
        .pipe(gulp.dest('./dist/'));
});

//gulp.task('build', ['styles', 'scripts', 'markup', 'images']);

gulp.task('release', function(callback) {
  runSequence('build',
              ['zip'],
              callback);
});

gulp.task('build', function(callback) {
  runSequence('clean',
              ['styles', 'scripts', 'markup', 'images', 'build-server'],
              callback);
});

gulp.task('default', function(callback) {
  runSequence('build',
              ['server'],
              function () {
                gulp.watch('src/styles/**/*', ['styles', server.notify]);
                gulp.watch('src/scripts/**/*', ['scripts', server.notify]);
                gulp.watch('src/index.html', ['markup', server.notify]);
            });
});
