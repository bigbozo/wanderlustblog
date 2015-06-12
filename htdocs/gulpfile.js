//noinspection JSUnresolvedFunction
var gulp = require('gulp');
//noinspection JSUnresolvedFunction
var sass = require('gulp-sass');
//noinspection JSUnresolvedFunction
var concat = require('gulp-concat');
//noinspection JSUnresolvedFunction
var autoprefixer = require('gulp-autoprefixer');

var cssCompiledFile = 'style.css';

gulp.task('sass', function () {

    var intermediateFile = 'topo.joboland.de-styles.css';
    var tempPath = '/tmp/';
    try {

        gulp.src('./assets/scss/main.scss')
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(concat(intermediateFile))
            .pipe(gulp.dest(tempPath));

        gulp.src([
            tempPath + intermediateFile,
            '../openlayers/node_modules/openlayers/dist/ol.css'
        ])
            .pipe(concat('styles.css'))
            .pipe(gulp.dest('./public/style/'));
    } catch (e) {

    }
});

gulp.task('publish', function () {
    gulp.src('./assets/html/**/*')
        .pipe(gulp.dest('./public'));
});
gulp.task('scripts', function () {

    gulp.src([
        '../openlayers/node_modules/openlayers/dist/ol.js',
        './assets/script/initMap.js'
    ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./public/script/'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/script/**/*.js', ['scripts']);
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'scripts', 'publish', 'watch']);
gulp.task('deploy', ['sass', 'scripts', 'publish']);