var gulp = require('gulp'),
  sass = require('gulp-sass'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  gulpIf = require('gulp-if'),
  cssnano = require('gulp-cssnano'),
  svgstore = require('gulp-svgstore'),
  rename = require('gulp-rename'),
  svgmin = require('gulp-svgmin'),
  browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp
    .src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/jquery/dist/jquery.js',
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

gulp.task('svgstore', function() {
  return gulp
    .src('src/icons/*.svg', { base: 'src/icons' })
    .pipe(rename({ prefix: 'icono-' }))
    .pipe(
      svgmin({
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(svgstore())
    .pipe(gulp.dest('src/icons'));
});

gulp.task('useref', function() {
  return gulp
    .src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task(
  'serve',
  gulp.series(['sass'], function() {
    browserSync.init({
      server: './src',
    });

    gulp.watch(['src/scss/*.scss'], gulp.parallel(['sass']));
    gulp.watch(['src/*html']).on('change', browserSync.reload);
  })
);

gulp.task('build:prod', gulp.parallel(['sass', 'useref']));
gulp.task('build:dev', gulp.series(['serve']));
