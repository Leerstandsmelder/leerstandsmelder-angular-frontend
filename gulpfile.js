var gulp = require('gulp'),
    header = require('gulp-header'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gulpCopy = require('gulp-copy'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    phonegapBuild = require('gulp-phonegap-build'),
    pkg = require('./package.json');

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

//
//
// JS building

gulp.task('js-deps', function () {
    return gulp.src([
        // TODO: think about if all this isn't a bit bloated...
        'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-busy/dist/angular-busy.min.js',
        'bower_components/angular-cookies/angular-cookies.min.js',
        'bower_components/angular-material/angular-material.min.js',
        'bower_components/angular-messages/angular-messages.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-translate/angular-translate.min.js',
        'bower_components/async/dist/async.min.js',
        'bower_components/bluebird/js/browser/bluebird.min.js',
        'bower_components/ng-file-upload/ng-file-upload.min.js',
        'bower_components/angular-pubsub/dist/angular-pubsub.js',
        'bower_components/leaflet/dist/leaflet.js',
        'bower_components/PruneCluster/dist/PruneCluster.js',
        'bower_components/leaflet-minimap/dist/Control.MiniMap.min.js',
        'bower_components/L.GeoSearch/src/js/l.control.geosearch.js',
        'bower_components/L.GeoSearch/src/js/l.geosearch.provider.openstreetmap.js',
        'bower_components/leerstandsmelder-apiclient/dist/leerstandsmelder-apiclient-web.min.js',
        'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
        'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
        'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js'
    ])
        .pipe(concat('leerstandsmelder-angular-dependencies.min.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('./dist/web/js/'))
        .pipe(gulp.dest('./dist/mobile/js/'));
});

function jsPipe(src, destPath) {
    return src.pipe(concat('leerstandsmelder-angular-frontend.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(destPath))
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(destPath));
}

gulp.task('js-web', function () {
    return jsPipe(gulp.src([
        'configuration.js',
        './src/modules/**/js/**/*.js',
        './src/shared/js/**/*.js',
        './src/web/js/**/*.js'
    ]), './dist/web/js/');
});

gulp.task('js-mobile', function () {
    return jsPipe(gulp.src([
        'configuration.js',
        './src/modules/**/js/**/*.js',
        './src/shared/js/**/*.js',
        './src/mobile/js/**/*.js'
    ]), './dist/mobile/js/');
});


//
//
// CSS building

gulp.task('css-deps', function () {
    return gulp.src([
            'bower_components/angular-material/angular-material.min.css',
            'bower_components/angular-busy/dist/angular-busy.min.css',
            'bower_components/font-awesome/css/font-awesome.min.css',
            'bower_components/leaflet/dist/leaflet.css',
            'bower_components/PruneCluster/dist/LeafletStyleSheet.css',
            //'bower_components/leaflet-control-geocoder/Control.Geocoder.css',
            'bower_components/leaflet-minimap/dist/Control.MiniMap.min.css',
            'bower_components/L.GeoSearch/src/css/l.geosearch.css'
        ])
        .pipe(concat('leerstandsmelder-frontend-dependencies.min.css'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('./dist/web/css/'))
        .pipe(gulp.dest('./dist/mobile/css/'));
});

function cssPipe(src, destPath) {
    return src.pipe(less())
        .pipe(minify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({
            basename: 'leerstandsmelder-frontend'
        }))
        .pipe(gulp.dest(destPath));
}

gulp.task('css-web', function () {
    return cssPipe(gulp.src('./src/web/less/site.less'), './dist/web/css/');
});

gulp.task('css-mobile', function () {
    return cssPipe(gulp.src('./src/mobile/less/app.less'), './dist/mobile/css/');
});


//
//
// HTML building

function htmlPipe(src, destPath) {
    return src.pipe(jade())
        .pipe(gulp.dest(destPath));
}

gulp.task('html-web', function () {
    return htmlPipe(gulp.src(['./src/shared/jade/**/*.jade', './src/web/jade/**/*.jade', 'src/modules/**/**/jade/*.jade','src/modules/**/jade/**/*.jade']), './dist/web/');

});

gulp.task('html-mobile', function () {
    return htmlPipe(gulp.src(['./src/shared/jade/**/*.jade', './src/mobile/jade/**/*.jade', './src/modules/**/jade/**/*.jade']), './dist/mobile/');
});


//
//
// Copy tasks

function copyPipe(src, destPath, prefix) {
    return src.pipe(gulpCopy(destPath, {prefix: prefix}));
}
gulp.task('copy-js', function () {
    return copyPipe(gulp.src(['./bower_components/PruneCluster/dist/PruneCluster.js.map']), './dist/web/js/', 3);
});

gulp.task('copy-requirejs', function () {
    return copyPipe(gulp.src(['./bower_components/requirejs/require.js']), './dist/web/js/', 2);
});

gulp.task('copy-js-src', function () {
    return copyPipe(gulp.src(['./src/**/*.js']), './dist/web/src/', 1);
});

gulp.task('copy-js-config', function () {
    return copyPipe(gulp.src(['./configuration.js']), './dist/web/js/');
});

gulp.task('copy-web', function () {
    copyPipe(gulp.src(['./bower_components/font-awesome/fonts/*','./assets/fonts/*']), './dist/web/fonts/', 3);
    copyPipe(gulp.src(['./bower_components/leaflet/dist/images/*']), './dist/web/', 3);
    copyPipe(gulp.src(['./bower_components/leaflet-minimap/dist/images/*']), './dist/web/');
});

gulp.task('copy-mobile', function () {
    copyPipe(gulp.src(['./bower_components/font-awesome/fonts/*','./assets/fonts/*']), './dist/mobile/fonts/', 3);
    copyPipe(gulp.src(['./bower_components/leaflet/dist/images/*']), './dist/mobile/', 3);
    copyPipe(gulp.src(['./bower_components/leaflet-minimap/dist/images/*']), './dist/web/');
});



//
//
// Watch tasks

gulp.task('watch-web', function () {
    watch(['src/web/js/**/*.js', 'src/shared/js/**/*.js', 'src/modules/**/js/*.js','src/modules/**/js/**/*.js', 'configuration.js'], function () {
        gulp.start('js-web');
    });
    watch(['src/web/less/*.less', 'src/web/less/**/*.less','src/shared/less/**/*.less', 'src/modules/**/less/*.less'], function () {
        gulp.start('css-web');
    });
    watch(['src/web/jade/**/*.jade', 'src/web/jade/**/*.jade', 'src/shared/jade/*.jade','src/shared/jade/**/*.jade', 'src/modules/**/jade/*.jade','src/modules/**/**/jade/*.jade','src/modules/**/jade/**/*.jade'], function () {
        gulp.start('html-web');
    });
});

gulp.task('watch-web-src', function () {
    watch(['src/web/js/**/*.js', 'src/shared/js/**/*.js', 'src/modules/**/js/*.js', 'src/modules/**/js/**/*.js', 'configuration.js'], function () {
        gulp.start('copy-js-src');
    });
});


//
//
// Phonegap build task

gulp.task('phonegap-build', function () {
    gulp.src('dist/mobile/**/*')
        .pipe(phonegapBuild({
            "isRepository": "false",
            "appId": "1234",
            "user": {
                "token": "asdf"
            }
        }));
});


//
//
// combined tasks

gulp.task('web', [
    'js-deps',
    'js-web',
    'copy-requirejs',
    'copy-web',
    'copy-js-config',
    'copy-js-src',
    'css-deps',
    'css-web',
    'html-web',
    'copy-web',
    'copy-js'
]);

gulp.task('mobile', [
    'js-deps',
    'js-mobile',
    'copy-requirejs',
    'copy-web',
    'copy-js-config',
    'copy-js-src',
    'css-deps',
    'css-mobile',
    'html-mobile',
    'copy-mobile',
    'copy-js'
]);

gulp.task('default', [
    'web',
    'mobile'
]);