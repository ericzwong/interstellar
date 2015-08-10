var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    return gulp.src(['src/app.js'])
            .pipe(browserify())
            .pipe(gulp.dest('dest'));
});

gulp.task('bundle', ['browserify'], function() {
    return gulp.src(['src/jquery-2.1.4.min.js', 'dest/app.js'])
            .pipe(concat('all.js'))
            //.pipe(uglify({mangle: false}))
            .pipe(gulp.dest('dest'));
});

gulp.task('copy', function() {
    return gulp.src(['src/index.html'])
           .pipe(gulp.dest('dest'));
});

gulp.task('watch', ['bundle', 'copy'], function() {
    return gulp.watch(['src/app/*.js', 'src/index.html'], ['bundle', 'copy']);
});

gulp.task('default',['watch']);
