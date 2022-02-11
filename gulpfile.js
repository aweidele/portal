var gulp = require('gulp');
var sass = require('gulp-sass')(require('node-sass'));
var pxtorem = require('gulp-pxtorem');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var terser = require('gulp-terser');
var pump = require('pump');
var gcmq = require('gulp-group-css-media-queries');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
  };

var pxtoremOptions = {
    propList: [
        'font',
        'font-size',
        'line-height',
        'padding',
        'padding-top',
        'padding-left',
        'padding-right',
        'padding-bottom',
        'width',
        'height',
        'border',
        'border-radius',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-bottom-left-radius',
        'border-bottom-right-radius',
        'top',
        'left',
        'bottom',
        'right',
        'margin',
        'margin-left',
        'margin-right',
        'margin-top',
        'margin-bottom'
    ]
};

var jsQueue = [
    'src/js/*.js'
];

gulp.task('sass', function(){
    return gulp
      .src('src/sass/portal.scss')
      .pipe(sass(sassOptions).on('error', sass.logError))
      //.pipe(sourcemaps.write())
      .pipe(gcmq())
      .pipe(pxtorem(pxtoremOptions))
      .pipe(gulp.dest('assets/css/'))
  });

  gulp.task('compress', function() {
    return gulp.src(jsQueue)
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('assets/js'))
      .pipe(rename('portal.js'))
      .pipe(terser())
      .pipe(gulp.dest('assets/js'));
  });

  gulp.task('watch', function(){
    gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('compress'));
  });

  gulp.task('default', gulp.series('sass', 'compress', 'watch'));
  gulp.task('start', gulp.series('sass', 'compress', 'watch'));