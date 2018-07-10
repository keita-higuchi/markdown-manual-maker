import gulp from 'gulp'
import source from 'vinyl-source-stream'

import less from 'gulp-less'
import plumber from 'gulp-plumber'

import webpackStream from 'webpack-stream'
import webpack from 'webpack'

import webpackConfig from './webpack.config'


// 監視タスク
gulp.task('watch', () => {
  gulp.watch('./src/less/**/*.less', ['less'])
  gulp.watch('./src/js/**/*.js', ['build'])
});

gulp.task("build", () => {
    return gulp.src('')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest("dist/js"))
});


gulp.task('less', () => {
  gulp.src(['./src/less/**/*.less', '!./src/less/_*/*'])
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
});


gulp.task('default', ['watch']);


