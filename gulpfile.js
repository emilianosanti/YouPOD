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

var BUILD_CLIENT_ROOT = 'build/client';
var BUILD_SERVER_ROOT = 'build/server';

gulp.task('clean', function(cb) {
    del(['build'], cb);
    
    notify({ message: 'Deleting build folder complete' });
});

gulp.task('styles', function() {
	return gulp.src(['src/styles/main.scss'])
		.pipe(sass())
		.pipe(gulp.dest(BUILD_CLIENT_ROOT + '/css/'));
});

gulp.task('scripts', function () {
  var bundler = browserify('./src/scripts/main.js', {basedir: __dirname}).transform(reactify);
  var stream = bundler.bundle();

  return stream
    .pipe(source('main.js'))
    .pipe(gulp.dest(BUILD_CLIENT_ROOT + '/scripts/'));
});

gulp.task('markup', function() {
    return gulp.src (['src/index.html'])
        .pipe(gulp.dest(BUILD_CLIENT_ROOT + '/'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: BUILD_CLIENT_ROOT
        }
    });
});

gulp.task('build-server', function() {
    return gulp.src(['src/scripts/server/server.js'])
        .pipe(gulp.dest(BUILD_SERVER_ROOT + '/'));
});

gulp.task('server', ['build-server'], function () {
    //start the server at the beginning of the task
    server.run({
        file: 'src/scripts/server/server.js'
    });

    //restart the server when file changes
    gulp.watch(['src/scripts/server/*.js'], server.notify);
});

gulp.task('build', ['styles', 'scripts', 'markup'])

gulp.task('default', ['build', 'browser-sync'], function () {
    gulp.watch('src/styles/**/*', ['styles', browserSync.reload]);
    gulp.watch('src/scripts/**/*', ['scripts', browserSync.reload]);
    gulp.watch('src/index.html', ['markup', browserSync.reload]);
});