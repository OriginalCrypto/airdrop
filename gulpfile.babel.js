const gulp            = require('gulp'),
      babelify        = require('babelify'),
      browserify      = require('browserify'),
      buffer          = require('vinyl-buffer'),
      cache           = require('gulp-cache'),
      defmod          = require('gulp-define-module'),
      del             = require('del'),
      file            = require('gulp-file'),
      imagemin        = require('gulp-imagemin'),
      minify          = require('gulp-minify'),
      browserSync     = require('browser-sync').create(),
      rename          = require('gulp-rename'),
      runSequence     = require('run-sequence'),
      size            = require('gulp-size'),
      plumber         = require('gulp-plumber'),
      watch           = require('gulp-watch'),
      source          = require('vinyl-source-stream'),
      config = {
          name: 'airdrop',
          fileTypes: {
            all: '**/*',
            html: '**/*.html',
            css: '**/*.css',
            images: '**/*.+(png|jpg|jpeg|gif|svg)',
            js: 'js/**/*.js',
            contracts: 'contracts/*.json',
            main: 'js/loader.js'
          },
          source: {
            baseDir: 'src',
            images: 'images'
          },
          staging: {
            baseDir: 'staging',
            javascript: 'js',
            contracts: 'contracts'
          },
          distribution: {
            baseDir: 'dist',
            javascript: 'js',
            images: 'images',
            contracts: 'contracts'
          }
        };

gulp.task('clean', function (callback) {
  runSequence('clean:dist', 'clean:stage', callback);
});

gulp.task('clean:stage', function () {
  let stagingDir = `${config.staging.baseDir}/${config.fileTypes.all}`;
  return del.sync(stagingDir);
});

gulp.task('clean:dist', function () {
  let distributionDir = `${config.distribution.baseDir}/${config.fileTypes.all}`;
  return del.sync(distributionDir);
});

gulp.task('stage:contracts', function () {
  let sourceDir  = `${config.source.baseDir}/${config.fileTypes.contracts}`,
      stagingDir = `${config.staging.baseDir}/${config.staging.contracts}`;
  return gulp.src(sourceDir)
  .pipe(gulp.dest(stagingDir));
});

gulp.task('stage:config', function () {
  let stagingDir = `${config.staging.baseDir}/${config.staging.javascript}`,
      environment = 'export default { ',
      indexOfNetworkOption = process.argv.indexOf('--network'),
      optionValue,
      repeatCounter = 2;
      
  if (indexOfNetworkOption> -1) {
     optionValue = process.argv[indexOfNetworkOption + 1];
    environment += `environment: \"${optionValue}\" }\n`; 
  } else {
    environment += '}\n';
  }

  return file('config.js', environment, { src: true })
    .pipe(gulp.dest(stagingDir));

});

gulp.task('stage:javascript', function () {
  let sourceDir  = `${config.source.baseDir}/${config.fileTypes.js}`,
      stagingDir = `${config.staging.baseDir}/${config.staging.javascript}`;
  return gulp.src(sourceDir)
  .pipe(gulp.dest(stagingDir));
});


gulp.task('stage:images', function () {
  let sourceDir  = `${config.source.baseDir}/${config.source.images}/${config.fileTypes.images}`,
      distributionDir = `${config.distribution.baseDir}/${config.distribution.images}`;
  return gulp.src(sourceDir)
    // caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest(distributionDir));
});
    
gulp.task('stage:html', function () {
  let htmlFiles = `${config.source.baseDir}/${config.fileTypes.html}`;
  return gulp.src(htmlFiles)
  .pipe(gulp.dest(config.distribution.baseDir));
});

gulp.task('stage:css', function () {
  let cssFiles = `${config.source.baseDir}/${config.fileTypes.css}`;
  return gulp.src(cssFiles)
  .pipe(gulp.dest(config.distribution.baseDir));
});

gulp.task('bundle', ['stage:javascript', 'stage:contracts', 'stage:config'], function () {
  let mainFile = `${config.staging.baseDir}/${config.fileTypes.main}`,
      distributionDir = `${config.distribution.baseDir}/${config.distribution.javascript}`;
  return browserify(mainFile)
      .transform(babelify, {
        presets: ['env', 'react'],
        plugins: ['react-html-attrs', 'transform-class-properties' ]
        })
      .bundle()
    .pipe(plumber())
    .pipe(source(config.name + '.js'))
    .pipe(buffer())
    .pipe(minify())
    .pipe(size())
    .pipe(plumber.stop())
    .pipe(gulp.dest(distributionDir));
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'clean:stage', ['stage:html', 'stage:css', 'stage:images', 'bundle'],
    callback);
});

gulp.task('browser-sync', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: './dist',
    }
  });
});
 
gulp.task('default', ['browser-sync'], function () {
  let jsFiles = `${config.distribution.baseDir}/${config.fileTypes.js}`;
  return watch(jsFiles, browserSync.reload);
});

