const gulp            = require('gulp'),
      babelify        = require('babelify'),
      browserify      = require('browserify'),
      buffer          = require('vinyl-buffer'),
      cache           = require('gulp-cache'),
      defmod          = require('gulp-define-module'),
      del             = require('del'),
      file            = require('gulp-file'),
      handlebars      = require('gulp-handlebars'),
      imagemin        = require('gulp-imagemin'),
      minify          = require('gulp-minify'),
      rename          = require('gulp-rename'),
      runSequence     = require('run-sequence'),
      size            = require('gulp-size'),
      source          = require('vinyl-source-stream'),
      config = {
          name: 'airdrop',
          fileTypes: {
            all: '**/*',
            handlebars: {
              raw: '**/*.hbs',
              compiled: '**/*.chbs.js'
            },
            html: '**/*.html',
            images: '**/*.+(png|jpg|jpeg|gif|svg)',
            js: 'js/**/*.js',
            contracts: 'contracts/*.json',
            main: 'js/main.js'
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

gulp.task('contracts', function () {
  let sourceDir  = `${config.source.baseDir}/${config.fileTypes.contracts}`,
      stagingDir = `${config.staging.baseDir}/${config.staging.contracts}`;
  return gulp.src(sourceDir)
  .pipe(gulp.dest(stagingDir));
});

gulp.task('config', function () {
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

gulp.task('javascript', function () {
  let sourceDir  = `${config.source.baseDir}/${config.fileTypes.js}`,
      stagingDir = `${config.staging.baseDir}/${config.staging.javascript}`;
  return gulp.src(sourceDir)
  .pipe(gulp.dest(stagingDir));
});

gulp.task('handlebars', function () {
  let handlebarSource = `${config.source.baseDir}/${config.fileTypes.handlebars.raw}`,
      stagingDir = `${config.staging.baseDir}`;
  return gulp.src(handlebarSource)
  .pipe(handlebars())
  .pipe(defmod('node'))
  .pipe(rename({
    extname: '.chbs.js'
  }))
  .pipe(gulp.dest(stagingDir));
});

gulp.task('bundle:javascript', ['handlebars', 'javascript', 'contracts', 'config'], function () {
  let mainFile = `${config.staging.baseDir}/${config.fileTypes.main}`,
      distributionDir = `${config.distribution.baseDir}/${config.distribution.javascript}`;
  return browserify(mainFile)
  .transform(babelify, { presets: ['env'] })
  .bundle()
  .pipe(source(config.name + '.js'))
  .pipe(buffer())
  .pipe(minify())
  .pipe(size())
  .pipe(gulp.dest(distributionDir));
});

gulp.task('images', function () {
  let sourceDir  = `${config.source.baseDir}/${config.source.images}/${config.fileTypes.images}`,
      distributionDir = `${config.distribution.baseDir}/${config.distribution.images}`;
  return gulp.src(sourceDir)
    // caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest(distributionDir));
});
    
gulp.task('html', function () {
  let htmlFiles = `${config.source.baseDir}/${config.fileTypes.html}`;
  return gulp.src(htmlFiles)
  .pipe(gulp.dest(config.distribution.baseDir));
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'clean:stage', ['html', 'images', 'bundle:javascript'],
    callback);
});
 
