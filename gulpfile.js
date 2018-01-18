var gulp = require('gulp'),
 	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
    imgmin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	stripDebug = require('gulp-strip-debug'),
	del = require('del'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	stripDebug = require('gulp-strip-debug'),
	concat = require('gulp-concat'),
	runSequence = require('gulp-run-sequence');

var resourceDir   = 'src/main/resources/META-INF/resources';
var srcJsDir	  = resourceDir + '/js/src';
var distJsDir	  = resourceDir + '/js/dist';
var exVendorsDir  = '!' + resourceDir + '/vendors/**';

/*gulp.task('sass', function() {
	return gulp.src([resourceDir + '/sass/*.scss'])
		   .pipe(sass.sync().on('error', sass.logError))
		   .pipe(gulp.dest(resourceDir + '/css'));
});*/

gulp.task('map_min', function() {
	return gulp.src([
	       srcJsDir + '/map/hotplace.js',
	       srcJsDir + '/map/hotplace.maps.js',
	       srcJsDir + '/map/hotplace.minimaps.js',
	       srcJsDir + '/map/hotplace.panomaps.js',
	       srcJsDir + '/map/hotplace.report.js',
	       srcJsDir + '/map/hotplace.validation.js',
	       srcJsDir + '/map/hotplace.calc.js',
	       srcJsDir + '/map/hotplace.chart.js',
	       srcJsDir + '/map/hotplace.database.js',
	       srcJsDir + '/map/hotplace.dom.js',
	       srcJsDir + '/map/hotplace.search.js',
	       srcJsDir + '/map/hotplace.streetview.js'])
		   .pipe(stripDebug())
		   .pipe(uglify().on('error', function(uglify) {
				console.log(uglify.message);
				this.emit('end');
		   }))
		   .pipe(rename({suffix: '.min'}))
		   .pipe(gulp.dest(srcJsDir + '/min'));
});

gulp.task('info_min', function() {
	return gulp.src([
	       srcJsDir + '/info/acceptbuilding.js',
	       srcJsDir + '/info/bosangpyeonib.js',
	       srcJsDir + '/info/gongmae.js',
	       srcJsDir + '/info/gyeongmae.js',
	       srcJsDir + '/info/silgeolae.js',
	       srcJsDir + '/info/sujibunseog.js'])
		   .pipe(stripDebug())
		   .pipe(uglify().on('error', function(uglify) {
				console.log(uglify.message);
				this.emit('end');
		   }))
		   .pipe(rename({suffix: '.min'}))
		   .pipe(gulp.dest(srcJsDir + '/min'));
});

gulp.task('js_min', function() {
	return gulp.src([
	       srcJsDir + '/location.js',
	       srcJsDir + '/login.js',
	       srcJsDir + '/notice.js',
	       srcJsDir + '/main.js'])
		   .pipe(stripDebug())
		   .pipe(uglify().on('error', function(uglify) {
				console.log(uglify.message);
				this.emit('end');
		   }))
		   .pipe(rename({suffix: '.min'}))
		   .pipe(gulp.dest(distJsDir));
});


gulp.task('map_concat_min', function() {
	return gulp.src([
           srcJsDir + '/min/hotplace.min.js',
  	       srcJsDir + '/min/hotplace.maps.min.js',
  	       srcJsDir + '/min/hotplace.minimaps.min.js',
  	       srcJsDir + '/min/hotplace.panomaps.min.js',
  	       srcJsDir + '/min/hotplace.report.min.js',
  	       srcJsDir + '/min/hotplace.validation.min.js',
  	       srcJsDir + '/min/hotplace.calc.min.js',
  	       srcJsDir + '/min/hotplace.chart.min.js',
  	       srcJsDir + '/min/hotplace.database.min.js',
  	       srcJsDir + '/min/hotplace.dom.min.js',
  	       srcJsDir + '/min/hotplace.search.min.js',
  	       srcJsDir + '/min/hotplace.streetview.min.js'])
	       .pipe(concat('hotplace-all.min.js'))
	       .pipe(gulp.dest(distJsDir));
});


gulp.task('info_concat_min', function() {
	return gulp.src([
           srcJsDir + '/min/acceptbuilding.min.js',
  	       srcJsDir + '/min/bosangpyeonib.min.js',
  	       srcJsDir + '/min/gongmae.min.js',
  	       srcJsDir + '/min/gyeongmae.min.js',
  	       srcJsDir + '/min/silgeolae.min.js',
  	       srcJsDir + '/min/sujibunseog.min.js'])
	       .pipe(concat('info-all.min.js'))
	       .pipe(gulp.dest(distJsDir));
});

gulp.task('css_min', function() {
	return gulp.src([resourceDir + '/**/*.css', exVendorsDir])
		   .pipe(cssmin())
		   .pipe(rename({suffix: '.min'}))
		   .pipe(gulp.dest(resourceDir));
});

gulp.task('img_min', function() {
	return gulp.src([resourceDir + '/img/**/*.*', exVendorsDir])
		   .pipe(imgmin())
		   .pipe(rename({suffix: '.m'}))
		   .pipe(gulp.dest(resourceDir + '/img'));
});

gulp.task('clean-all', function() {
	return del.sync([resourceDir + '/**/*.min.js', resourceDir + '/**/*.min.css', resourceDir + '/img/**/*.m.*', exVendorsDir]);
});

gulp.task('clean-js', function() {
	return del.sync([srcJsDir + '/min']);
});

gulp.task('clean_css', function() {
	return del.sync([resourceDir + '/**/*.min.css', exVendorsDir]);
});

gulp.task('clean_img', function() {
	return del.sync([resourceDir + '/img/**/*.m.*', exVendorsDir]);
});

gulp.task('watch', function() {
	livereload.listen();
	var watcher = {
		js     : gulp.watch([resourceDir + '/**/*.js', '!' + resourceDir + '/**/*.min.js','!' + resourceDir + '/**/gulpfile.js', exVendorsDir], ['clean_js' ,'js_min', 'reload']),
		css    : gulp.watch([resourceDir + '/**/*.css', '!' + resourceDir + '/**/*.min.css', exVendorsDir], ['clean_css', 'css_min', 'reload']), 
		images : gulp.watch([resourceDir + '/img/**/*.*', '!' + resourceDir + '/img/**/*.m.*', exVendorsDir], ['clean_img','img_min', 'reload']) 
	};
	
	var notify = function(event) {
		gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
	}
	
	for(var key in watcher) {
		watcher[key].on('change', notify);
	}
});

gulp.task('reload', function() {
	return  gulp.src([resourceDir + '/js/**/*.js', resourceDir + '/img/**/*.*', resourceDir + '/css/**/*.css', exVendorsDir])
			.pipe(livereload());
});

//gulp.task('default', ['clean', 'js_min', 'css_min', 'img_min', 'watch', 'reload']);
gulp.task('default', function() {
	runSequence('clean-all', ['map_min', 'info_min', 'js_min'], 'map_concat_min', 'info_concat_min', 'clean-js');
});

