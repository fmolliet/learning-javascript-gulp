const { series, parallel, src, dest, watch } = require('gulp');
// Dependencias para SASS
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso         = require('gulp-csso');
sass.compiler      = require('node-sass');
sass.sourcemaps    = require('gulp-sourcemaps');

// Dependencias Para TS
const { createProject } = require('gulp-typescript'); // https://www.npmjs.com/package/gulp-typescript
const tsProject         = createProject('tsconfig.json'); // npx tsc --init 
// Dependencias Para ES6 
const babel  = require('gulp-babel'); // https://github.com/babel/gulp-babel
const uglify = require('gulp-uglify');

// TODO: montar um cleaner 
// Multi propose compiler   ( https://gulpjs.com/docs/en/getting-started/creating-tasks )
exports.compile = series(
  parallel(
    sassCompile,
    series(typescriptTranspile, babelTranspile)
  ),
);

// compilação de Sass //
function sassCompile(){
  return src('./src/assets/styles/main.scss') // './src/assets/**/*.scss'
    .pipe(sass.sourcemaps.init())
    .pipe(sass({sourceMap: true, outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(csso())
    .pipe(dest('out/css'));
}

exports.sass = sassCompile;

// Compilação para typescript //
function typescriptTranspile() {
  const tsResult = src("src/**/*.ts") 
      .pipe(tsProject());

  return tsResult.js
    .pipe(uglify())
    .pipe(dest('out/release'));
}

exports.typescript = typescriptTranspile;

// Compilação para ES6 //
function babelTranspile() {
  return src('src/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('out/js'));
}

exports.babel = babelTranspile;

// TODO: realizar compilação do gulp ( https://gulpjs.com/docs/en/getting-started/watching-files )
exports.watch = function(){
    watch('src/js/*.js', 'babel')
}
