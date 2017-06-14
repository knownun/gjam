const gulp = require('gulp');
const concat = require('gulp-concat');
const path = require('path');
const watch = require('gulp-watch');

const rootPath = __dirname;
const srcPath = path.join(__dirname, 'src');
const resourcesPath = path.join(__dirname, 'resources');
const jsFiles = [
  `${srcPath}/index.js`,
  `${srcPath}/**/*.module.js`,
  `${srcPath}/**/*.js`,
];
const indexFile = `${rootPath}/index.html`;
const resources = `${resourcesPath}/**/*`;
const buildFolder = path.join(__dirname, 'build');
const buildResourcesFolder = path.join(__dirname, 'build/resources');

gulp.task('build:js', function () {
  return gulp.src(jsFiles)
    .pipe(concat('index.js'))
    .pipe(gulp.dest(buildFolder));
});

gulp.task('copy:html', () => {
  return gulp
    .src([indexFile])
    .pipe(gulp.dest(buildFolder));
});

gulp.task('copy:resources', () => {
  return gulp
    .src(resources)
    .pipe(gulp.dest(buildResourcesFolder));
});

gulp.task('watch', function () {
  const watcher = gulp.watch(`${srcPath}/**/*.js`, ['build:js']);
  watcher.on('change', function (event) {
    console.log(`[JS] ${event.type} = ${event.path}`);
  });

  const htmlWatcher = gulp.watch(indexFile, ['copy:html']);
  htmlWatcher.on('change', function (event) {
    console.log(`[HTML] ${event.type} = ${event.path}`);
  });

  const recourcesWatcher = gulp.watch(resources, ['copy:resources']);
  recourcesWatcher.on('change', function (event) {
    console.log(`[RECOURCES] ${event.type} = ${event.path}`);
  });
});

gulp.task('default', function () {
  return gulp.run(['build:js', 'copy:html', 'copy:resources']);
});