'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('jshint', function () {
    return gulp.src('public/**/*.js')
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', function () {
    var assets = $.useref.assets({searchPath: ['.', 'public']});
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
    return gulp.src('public/assets/img/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{cleanupIDs: false}]
        })))
        .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('serve', function () {
    browserSync.use(require('browser-sync-spa')({
        selector: "[ng-app]"
    }));
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: "public"
        },
        files:   "."
    });
    gulp.watch([
        'public/*.html',
        'public/views/**/*.html',
        'public/**/*.js',
        'public/assets/img/*',
        'public/assets/css/*.css',
        'app/**/*.js'
    ]).on('change', reload);
});

gulp.task('build', ['jshint', 'html', 'images'], function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});