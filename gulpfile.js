'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const purgecss = require('gulp-purgecss');
const babel = require("gulp-babel");

gulp.task('default', ['css','js']);
gulp.task('watch', ['css:watch','js:watch','tailwind:watch']);

/*
 *
 * SASS, tailwind, postCSS
 *
 */

gulp.task('css',function(){
	return gulp.src('resources/assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([
			tailwindcss('./tailwind.js'),
			require('autoprefixer'),
			require('cssnano')({
				preset: 'default',
			}),
		]))
		.pipe(gulp.dest('public/css'));
});
gulp.task('css:watch', function () {
	gulp.watch('resources/assets/scss/**/*.scss', ['css']);
});
gulp.task('tailwind:watch', function () {
    gulp.watch('tailwind.js', ['css']);
});

/*
 *
 * purgeCSS
 *
 */

// gulp.task('purge',function(){
// 	return gulp.src('public/css/*.css')
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(purgecss({
// 			content: ['']
// 		}))
// 		.pipe(gulp.dest('public/css'));
// });
// gulp.task('css:watch', function () {
// 	gulp.watch('resources/assets/scss/*.scss', ['css']);
// });

/*
 *
 * js
 *
 */

gulp.task('js', function () {
    return gulp.src("resources/assets/js/**/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("public/js"));
});
gulp.task('js:watch', function () {
	gulp.watch('resources/assets/js/**/*.js', ['js']);
});

/*
 *
 * image
 *
 */

gulp.task('image', function () {
	return gulp.src('resources/assets/img/**/*')
		.pipe(imagemin({progressive: true}))
		.pipe(gulp.dest('public/img'));
});
gulp.task('image:watch', function () {
	gulp.watch('resources/assets/img/**/*', ['image']);
});

/*
 *
 * favicons
 *
 */

gulp.task('favicons', function () {
    return gulp.src('resources/assets/favicons/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('public'));
});

/*
 *
 * fonts
 *
 */

gulp.task('fonts', function () {
    return gulp.src('resources/assets/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});
