var Promise = require('bluebird'),
    gulp = require('gulp-param')(require('gulp'), process.argv),
    fs = require('fs'),
    header = require('gulp-header'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    requirejsOptimize = require('gulp-requirejs-optimize'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    pkg = require('./package.json'),
    config = require('./config.json');

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

function streamToPromise(stream) {
    return new Promise(function(resolve, reject) {
        stream.on("end", resolve);
        stream.on("error", reject);
    });
}

function getPathsForEnv(env, pathAdd) {
    let dest = [];
    if (!env || env == 'web') {
        dest.push('./dist/web/' + pathAdd);
    }
    if (!env || env == 'mobile') {
        dest.push('./dist/mobile/' + pathAdd);
    }
    return dest;
}

function copySrcDest(src, dest) {
    return Promise.map(dest, function (dst) {
        let stream = gulp.src(src);
        stream.pipe(gulp.dest(dst));
        return streamToPromise(stream);
    });
}



//
//
// Dependencies

gulp.task('deps', [
    'deps:js',
    'deps:css'
]);

gulp.task('deps:js', function (env) {
    return Promise.map(getPathsForEnv(env, 'js/'), function (dest) {
        let stream = gulp.src([
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
                'bower_components/angular-material-data-table/dist/md-data-table.min.js',
                'bower_components/showdown/compressed/Showdown.min.js',
                'bower_components/angular-markdown-directive/markdown.js',
                'bower_components/codemirror/lib/codemirror.js',
                'bower_components/codemirror-spell-checker/dist/spell-checker.min.js',
                'bower_components/simplemde/dist/simplemde.min.js',
                'bower_components/async/dist/async.min.js',
                'bower_components/bluebird/js/browser/bluebird.min.js',
                'bower_components/ng-file-upload/ng-file-upload.min.js',
                'bower_components/angular-pubsub/dist/angular-pubsub.js',
                'bower_components/leaflet/dist/leaflet.js',
                'bower_components/PruneCluster/dist/PruneCluster.js',
                'bower_components/leaflet-minimap/dist/Control.MiniMap.min.js',
                'bower_components/L.GeoSearch/src/js/l.control.geosearch.js',
                'bower_components/L.GeoSearch/src/js/l.geosearch.provider.openstreetmap.js',
                'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
                'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
                'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'bower_components/airbrake-js-client/dist/client.min.js'
            ])
            .pipe(concat('leerstandsmelder-angular-dependencies.min.js'))
            .pipe(header(banner, {pkg: pkg}));
        stream.pipe(gulp.dest(dest));
        return streamToPromise(stream);
    });
});

gulp.task('deps:css', function (env) {
    return Promise.map(getPathsForEnv(env, 'css/'), function (dest) {
        let stream = gulp.src([
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
            .pipe(header(banner, {pkg: pkg}));
        stream.pipe(gulp.dest(dest));
        return streamToPromise(stream);
    });
});



//
//
// JS

gulp.task('js', function (env) {
    let srcDest = [];
    if (!env || env == 'web') {
        srcDest.push({src: 'src/web/js/app.build.js', dest: 'dist/web/js/'});
    }
    if (!env || env == 'mobile') {
        srcDest.push({src: 'src/mobile/js/main.js', dest: 'dist/mobile/js/'});
    }
    return Promise.map(srcDest, (sd) => {
        let stream = gulp.src(sd.src)
            .pipe(sourcemaps.init())
            .pipe(requirejsOptimize())
            .pipe(header(banner, {pkg: pkg}))
            .pipe(rename('leerstandsmelder-angular-frontend.min.js'))
            .pipe(sourcemaps.write());
        stream.pipe(gulp.dest(sd.dest));
        return streamToPromise(stream);
    });
});

gulp.task('js:copy', ['js:config'], function (env) {
    return copySrcDest(['./src/**/*.js'], getPathsForEnv(env, 'src/'));
});

gulp.task('js:config', function (env) {
    return copySrcDest(['./configuration.js'], getPathsForEnv(env, 'js/'));
});



//
//
// CSS

function cssPipe(src) {
    return src.pipe(less())
        .pipe(minify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({
            basename: 'leerstandsmelder-frontend'
        }));
}

gulp.task('css', function (env) {
    return Promise.resolve()
        .then(() => {
            if (!env || env == 'web') {
                let stream = cssPipe(gulp.src('./src/web/less/web.less'));
                stream.pipe(gulp.dest('./dist/web/css/'));
                return streamToPromise(stream);
            }
        })
        .then(() => {
            if (!env || env == 'mobile') {
                let stream = cssPipe(gulp.src('./src/mobile/less/mobile.less'));
                stream.pipe(gulp.dest('./dist/mobile/css/'));
                return streamToPromise(stream);
            }
        });
});



//
//
// HTML

gulp.task('html', function (env) {
    return Promise.resolve()
        .then(() => {
            if (!env || env == 'web') {
                let stream = gulp.src(['./src/shared/jade/**/*.jade', './src/web/jade/**/*.jade']);
                stream.pipe(jade()).pipe(gulp.dest('./dist/web/'));
                return streamToPromise(stream);
            }
        })
        .then(() => {
            if (!env || env == 'mobile') {
                let stream = gulp.src(['./src/shared/jade/**/*.jade', './src/mobile/jade/**/*.jade']);
                stream.pipe(jade()).pipe(gulp.dest('./dist/mobile/'));
                return streamToPromise(stream);
            }
        });
});



//
//
// Assets

gulp.task('assets', function (env) {
    return Promise.map(getPathsForEnv(env), (destBase) => {
        Promise.resolve()
            .then(() => {
                let stream = gulp.src([
                    './bower_components/PruneCluster/dist/PruneCluster.js.map',
                    './bower_components/leerstandsmelder-apiclient/dist/leerstandsmelder-apiclient-web.js',
                    './bower_components/requirejs/require.js'
                ]);
                stream.pipe(gulp.dest(destBase + 'js/'));
                return streamToPromise(stream);
            })
            .then(() => {
                let stream = gulp.src([
                    './assets/images/*',
                    './bower_components/leaflet/dist/images/*',
                    './bower_components/leaflet-minimap/dist/images/*'
                ]);
                stream.pipe(gulp.dest(destBase + 'images/'));
                return streamToPromise(stream);
            })
            .then(() => {
                let stream = gulp.src([
                    './bower_components/font-awesome/fonts/*',
                    './assets/fonts/*'
                ]);
                stream.pipe(gulp.dest(destBase + 'fonts/'));
                return streamToPromise(stream);
            })
            .then(() => {
                let stream = gulp.src(['./src/shared/static/md/*.md']);
                stream.pipe(gulp.dest(destBase + 'static/'));
                return streamToPromise(stream);
            });
    });
});



//
//
// Dev

gulp.task('dev', [
    'serve',
    'watch'
]);

gulp.task('watch', function () {
    watch(['src/web/js/**/*.js', 'src/mobile/js/**/*.js', 'src/shared/js/**/*.js', 'configuration.js'], function () {
        return streamToPromise(gulp.start('js:copy')).then(connect.reload);
    });
    watch(['src/web/less/**/*.less', 'src/mobile/less/**/*.less','src/shared/less/**/*.less'], function () {
        return streamToPromise(gulp.start('css')).then(connect.reload);
    });
    watch(['src/web/jade/**/*.jade', 'src/mobile/jade/**/*.jade', 'src/shared/jade/**/*.jade'], function () {
        return streamToPromise(gulp.start('html')).then(connect.reload);
    });
    watch(['./assets/**/*', './src/shared/static/md/*.md'], function () {
        return streamToPromise(gulp.start('assets')).then(connect.reload);
    });
});

gulp.task('serve', function (env) {
    return Promise.resolve()
        .then(() => {
            if (env && env != 'web') return;
            return connect.server({
                name: 'Web App',
                port: 8080,
                root: 'dist/web',
                livereload: true,
                fallback: 'index.html',
                middleware: function (conn, opts) {
                    return [
                        conn.static(opts.root),
                        conn.directory(opts.root),
                        function (req, res) { fs.readFile("#{opts.root}/index.html", function (err, html) { res.end(html); }) }
                    ];
                }
            });
        })
        .then(() => {
            if (env && env != 'mobile') return;
            return connect.server({
                name: 'Mobile App',
                port: 8090,
                root: 'dist/mobile',
                livereload: true
            });
        });
});



//
//
// Build

gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false}).pipe(clean());
});

gulp.task('clean:cordova', function () {
    return gulp.src(['.cordova'], {read: false}).pipe(clean());
});

gulp.task('release', [
    'clean'
], function () {
    return gulp.start('build');
});

gulp.task('build', [
    'deps',
    'assets',
    //'js',
    'js:copy',
    'css',
    'html'
]);

gulp.task('build:android', ['clean:cordova'], function (release) {
    const create = require('gulp-cordova-create'),
        plugin = require('gulp-cordova-plugin'),
        android = require('gulp-cordova-build-android');
    let stream = gulp.src('dist/mobile').pipe(create({
            id: config.android.app_id,
            name: config.android.app_name
        }))
        .pipe(plugin({
            'org.apache.cordova.dialogs': 'latest',
            'org.apache.cordova.camera': 'latest',
            'org.apache.cordova.geolocation': 'latest',
            'org.apache.cordova.media': 'latest'
        }))
        .pipe(android({release: release}));
    stream.pipe(gulp.dest('dist/android'));
    return streamToPromise(stream);
});

gulp.task('build:ios', ['clean:cordova'], function () {
    const create = require('gulp-cordova-create'),
        plugin = require('gulp-cordova-plugin'),
        ios = require('gulp-cordova-build-ios');
    let stream = gulp.src('dist/mobile').pipe(create({
            id: config.ios.app_id,
            name: config.ios.app_name
        }))
        .pipe(plugin({
            'org.apache.cordova.dialogs': 'latest',
            'org.apache.cordova.camera': 'latest',
            'org.apache.cordova.geolocation': 'latest',
            'org.apache.cordova.media': 'latest'
        }));
    stream.pipe(ios());
    return streamToPromise(stream);
});
