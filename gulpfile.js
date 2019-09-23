var gulp 		 = require('gulp'),
	sass 		 = require("gulp-sass"),
	cssnano		 = require('gulp-cssnano'),
	rename		 = require('gulp-rename'),
	browserSync  = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer');
 
gulp.task('browser-sync', function(){
	browserSync({
		// server: {
		// 	baseDir: 'app'
		// },
		proxy: "http://gulp.loc", 
		notify: false
	});
});

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('phpcode', function() {
    return gulp.src('app/*.php')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function(){
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass') );
	gulp.watch('app/*.html', gulp.parallel('code') );
	gulp.watch('app/*.php', gulp.parallel('phpcode') );
    gulp.watch('app/js/**/*.js', gulp.parallel('scripts') );
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch') );

