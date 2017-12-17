'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
// const autoprefixer = require('gulp-autoprefixer');
const pump = require('pump');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const purgecss = require('gulp-purgecss');

gulp.task('default', ['css','js','image','favicons']);
gulp.task('watch', ['css:watch','js:watch']);

/*
 *
 * SASS, tailwind, postCSS
 *
 */

gulp.task('css',function(){
	return gulp.src('resources/assets/scss/*.scss')
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
	gulp.watch('resources/assets/scss/*.scss', ['css']);
});

// /*
//  *
//  * purgeCSS
//  *
//  */
//
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

gulp.task('js', function (cb) {
	pump([
		gulp.src('resources/assets/js/*.js'),
		uglify(),
		gulp.dest('public/js')
	],cb);
});
gulp.task('js:watch', function () {
	gulp.watch('resources/assets/js/*.js', ['js']);
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
