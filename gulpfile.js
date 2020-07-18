const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

// Copy all HTML Files
gulp.task('copyHTML', async function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dest'));
});

// Minimize image files
gulp.task('imageMin', async function() {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// Concatinate JS files and them Minify
gulp.task('scripts', async function() {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Compile SASS
gulp.task('sass', async function() {
  gulp.src('src/style/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

// Compile all Tasks
gulp.task('default', ['copyHTML', 'imageMin', 'scripts' ,'sass']);

// Watcher for live editing
gulp.task('watch', async function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/*.html', ['copyHTML']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/style/main.scss', ['sass']);
});
