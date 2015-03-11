var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint'),
	mocha = require('gulp-mocha');

gulp.task('develop', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
    }).on('restart', function () {
        // a server restarted hook can be added here
    });
});

gulp.task('lint', function () {
  return gulp.src('./api/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
  return gulp.src('./test/**/*.js')
    .pipe(mocha({ reporter: 'spec' })).once('end', function () {
      process.exit();
    });
});

gulp.task('test', ['lint', 'mocha']);
gulp.task('default', ['develop']);