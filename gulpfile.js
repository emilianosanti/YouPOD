var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reactify = require('reactify');
var notify = require('gulp-notify');
var del = require('del');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');

gulp.task('clean', function(cb) {
    del(['build'], cb);
    
    notify({ message: 'Deleting build folder complete' });
});

gulp.task('styles', function() {
	return gulp.src(['src/styles/main.scss'])
		.pipe(sass())
		.pipe(gulp.dest('build/css/'))
});

gulp.task('scripts', function () {
  var bundler = browserify('./src/scripts/main.js', {basedir: __dirname}).transform(reactify);
  var stream = bundler.bundle();

  return stream
    .pipe(source('main.js'))
    .pipe(gulp.dest('build/scripts/'));
});

gulp.task('markup', function() {
    return gulp.src (['src/index.html'])
        .pipe(gulp.dest('build/'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        }
    });
});

gulp.task('clean-build', ['clean']);

gulp.task('default', ['styles', 'scripts', 'markup', 'browser-sync'], function () {
    gulp.watch('src/styles/**/*', ['styles', browserSync.reload]);
    gulp.watch('src/scripts/**/*', ['scripts', browserSync.reload]);
    gulp.watch('src/index.html', ['markup', browserSync.reload]);
});