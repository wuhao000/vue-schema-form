var fs        = require('fs');
var path      = require('path');
var gulp      = require('gulp');
var rename    = require('gulp-rename');
var VueModule = require('gulp-vue-module');

gulp.task('vue', function() {
  return gulp.src('./vue/**/*.vue')
      .pipe(VueModule({
        debug : true
      }))
      .pipe(rename({extname : ".js"}))
      .pipe(gulp.dest("./dist"));
});

gulp.task('default', ['vue']);
