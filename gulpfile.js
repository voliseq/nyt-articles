/**
 * Created by Maciej on 2017-06-12.
 */
let gulp = require('gulp'),
    concat = require('gulp-concat');


gulp.task('concat-js', () => {

    return gulp.src(['./js/vendor/modernizr-2.8.3.min.js',
        './js/vendor/jquery-1.12.0.min.js',
        './js/vendor/bootstrap.min.js',
        './js/vendor/bootstrap-datepicker.min.js',
        './js/api.js',
        './js/main.js'])
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./dist/'));

});



gulp.task('concat-css', () => {
    return gulp.src([
        './font-awesome/css/font-awesome.min.css',
        './css/normalize.css',
        './css/bootstrap.min.css',
        './css/bootstrap-datepicker3.min.css',
        './css/main.css'])
        .pipe(concat('build.css'))
        .pipe(gulp.dest('./dist/'));
});
