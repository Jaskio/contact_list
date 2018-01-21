var del = require('del');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

const SCRIPT_NAME = 'app.js';
var paths = {
    src: {
        js: {
            files: './src/scripts/**/*.js'
        },
        views: {
            files: './src/views/**/*.html'
        }
    },
    dist: {
        js: './dist/scripts/',
        views: './dist/views/'
    }
};

gulp.task('build', ['views', 'scripts']);

gulp.task('watch', function () {
    gulp.watch(paths.src.views.files, ['views']);
    gulp.watch(paths.src.js.files, ['scripts']);
});

/*
 * Concating and compressing all .html files in dist folder
 */
gulp.task('views', function() {
    gulp.src(paths.src.views.files)
        .pipe(gulp.dest(paths.dist.views));
})

/*
 * Concating and compressing all .js files in main.js
 */
gulp.task('scripts', function() {
  return gulp.src(paths.src.js.files)
    .pipe(sourcemaps.init())
    .pipe(concat(SCRIPT_NAME))
    .pipe(uglify({
        compress: {
            negate_iife: false
        }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.js))
});

/*
 * Cleaning dist
 */
gulp.task('clean', function () {
    return del(['dist'])
});
