const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');

function copyHtml() {
  return src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./build'));
};

function copyImg() {
  return src(['./src/images/**/*.{gif,jpg,png,svg}'])
    .pipe(dest('./build/images'));
}

function copyScc() {
  return src('./src/styles/**/*.scss')
    .pipe(sass({ sourceMap: false }).on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('main.css'))
    .pipe(dest('./build/styles'));
};

exports.build = parallel(copyHtml, copyScc, copyImg);
