var gulp = require('gulp');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reactify = require('reactify');
var notify = require('gulp-notify');
var del = require('del');

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('styles', function() {
	return gulp.src(['src/styles/main.scss'])
		.pipe(sass())
		.pipe(gulp.dest('build/css/'))
		.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
	gulp.src(['src/scripts/main.jsx'])
		.pipe(browserify({transform: ['reactify']}))
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

gulp.task('default', ['clean', 'styles', 'scripts', 'markup', 'browser-sync'], function () {
    gulp.watch('src/styles', ['styles', browserSync.reload]);
    gulp.watch('src/scripts/', ['scripts', browserSync.reload]);
    gulp.watch('src/index.html', ['markup', browserSync.reload]);
});