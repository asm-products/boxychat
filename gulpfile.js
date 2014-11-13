var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
    }).on('restart', function () {
        // a server restarted hook can be added here
    });
});

gulp.task('default', [
    'develop'
]);
