const { series, parallel, src, dest } = require('gulp');
// Dependencias Para TS
const { createProject } = require('gulp-typescript');
const tsProject = createProject('tsconfig.json'); // npx tsc --init 
// Dependencias Para ES6 
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


function clean(cb) {
  // body omitted
  cb();
}

function cssTranspile(cb) {
  // body omitted
  cb();
}

function cssMinify(cb) {
  // body omitted
  cb();
}

function jsTranspile(cb) {
  // body omitted
  cb();
}

function jsBundle(cb) {
  // body omitted
  cb();
}

function jsMinify(cb) {
  // body omitted
  cb();
}

exports.compile = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify)
);
// Compilação para type
exports.typescript = function() {
  var tsResult = src("src/**/*.ts") 
      .pipe(tsProject());

  return tsResult.js.pipe(dest('release'));
}
// Compilação para ES6
exports.babel = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('out/'));
}