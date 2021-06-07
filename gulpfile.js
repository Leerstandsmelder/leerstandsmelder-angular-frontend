'use strict';

var Promise = require('bluebird'),
    path = require('path'),
    gulp = require('gulp-param')(require('gulp'), process.argv),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    fs = require('fs'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    disc = require('disc'),
    jsdoc = require('gulp-jsdoc3'),
    gutil = require('gulp-util'),
    filesExist = require('files-exist'),
    pkg = require('./package.json');

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
    var dest = [];
    pathAdd = pathAdd ? pathAdd : '';
    if (!env || env === 'web') {
        dest.push('./dist/web/' + pathAdd);
    }
    if (!env || env === 'mobile') {
        dest.push('./dist/mobile/' + pathAdd);
    }
    return dest;
}

function filterSourceDestPairs(sd, env) {
    var srcDest = [];
    if (!env || env === 'web') {
        srcDest.push(sd[0]);
    }
    if (!env || env === 'mobile') {
        srcDest.push(sd[1]);
    }
    return srcDest;
}

function serveApp(config) {
    return Promise.promisify(function (cb) {
        var app = connect();
        if (config.livereload) {
            app.use(require('connect-livereload')({port: config.livereload}));
        }
        app.use(serveStatic(config.root, {'index': ['index.html']}));
        app.use(function(req, res){
            fs.readFile(config.root + '/index.html', function (err, data) {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        });
        console.log(config.name + ' listening on port', config.port);
        app.listen(config.port, cb);
    })();
}



//
//
// JS

gulp.task('js', function (env) {
    var srcDest = [
        {src: 'src/web/js/app-web.js', dest: 'dist/web/js/'},
        {src: 'src/mobile/js/app-mobile.js', dest: 'dist/mobile/js/'}
    ];

    return Promise.map(filterSourceDestPairs(srcDest, env), function (sd) {
        var b = browserify({
            entries: sd.src,
            debug: false
        });
        var stream = b.bundle()
            .pipe(source(path.basename(sd.src)))
            .pipe(buffer())
            //.pipe(sourcemaps.init({loadMaps: true}))
            .on('error', gutil.log)
            .pipe(header(banner, {pkg: pkg}))
            .pipe(uglify())
            .pipe(rename('leerstandsmelder-angular-frontend.min.js'))
            .pipe(gulp.dest(sd.dest));
            //.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../../../'}));
        return streamToPromise(stream);
    });
});

//
//
// JS

gulp.task('js:maps', function (env) {
    var srcDest = [
        {src: 'src/web/js/app-web.js', dest: 'dist/web/js/'},
        {src: 'src/mobile/js/app-mobile.js', dest: 'dist/mobile/js/'}
    ];

    return Promise.map(filterSourceDestPairs(srcDest, env), function (sd) {
        var b = browserify({
            entries: sd.src,
            debug: false
        });
        var stream = b.bundle()
            .pipe(source(path.basename(sd.src)))
            .pipe(buffer())
            .pipe(sourcemaps.init())
            .on('error', gutil.log)
            .pipe(header(banner, {pkg: pkg}))
            //.pipe(uglify())
            .pipe(rename('leerstandsmelder-angular-frontend.min.js'))
            .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../../../'}))
          .pipe(gulp.dest(sd.dest));
        return streamToPromise(stream);
    });
});

gulp.task('js:analyze', function (env) {
    var srcDest = [
        {src: __dirname + '/src/web/js/app-web.js', dest: __dirname + '/dist/disc_web.html'},
        {src: __dirname + '/src/mobile/js/app-mobile.js', dest:  __dirname + '/dist/disc_mobile.html'}
    ];

    return Promise.map(filterSourceDestPairs(srcDest, env), function (sd) {
        var b = browserify(sd.src, {
            entries: sd.src,
            fullPaths: true
        });
        var stream = b.bundle()
            .pipe(disc())
            .pipe(fs.createWriteStream(sd.dest));
        return streamToPromise(stream);
    });
});



//
//
// CSS

function cssPipe(sd) {
    var stream = gulp.src(filesExist(sd.src))
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(rename({
            basename: 'leerstandsmelder-frontend-' + path.basename(sd.src, '.less')
        }))
      .pipe(gulp.dest(sd.dest));
    return streamToPromise(stream);
}

gulp.task('css', [
    'css:main',
    'css:deps'
]);

gulp.task('css:main', function (env) {
    var srcDest = [
        {src: './src/web/less/web.less', dest: './dist/web/css/'},
        {src: './src/mobile/less/mobile.less', dest: './dist/mobile/css/'}
    ];
    return Promise.map(filterSourceDestPairs(srcDest, env), cssPipe);
});

gulp.task('css:deps', function (env) {
    var srcDest = [
        {src: './src/shared/less/deps.less', dest: './dist/web/css/'},
        {src: './src/shared/less/deps.less', dest: './dist/mobile/css/'}
    ];
    return Promise.map(filterSourceDestPairs(srcDest, env), cssPipe);
});



//
//
// HTML

gulp.task('html', function (env) {
    return Promise.resolve()
        .then(function () {
            if (!env || env === 'web') {
                var stream = gulp.src(filesExist(['./src/shared/pug/**/*.pug', './src/web/pug/**/*.pug']))
                  .pipe(pug()).pipe(gulp.dest('./dist/web/'));
                return streamToPromise(stream);
            }
        })
        .then(function () {
            if (!env || env === 'mobile') {
                var stream = gulp.src(filesExist(['./src/shared/pug/**/*.pug', './src/mobile/pug/**/*.pug']))
                  .pipe(pug()).pipe(gulp.dest('./dist/mobile/'));
                return streamToPromise(stream);
            }
        });
});



//
//
// Assets

gulp.task('assets', function (env) {
    return Promise.map(getPathsForEnv(env), function (destBase) {
        var files = [
          'node_modules/angular/angular.min.js',
          'node_modules/ng-cordova/dist/ng-cordova.min.js',
          'node_modules/leerstandsmelder-apiclient/dist/leerstandsmelder-apiclient-web.js',
          'node_modules/angular-material/angular-material.min.js',
          'node_modules/ag-grid/dist/ag-grid.min.js',
          'node_modules/marked/marked.min.js',
          'node_modules/simplemde/dist/simplemde.min.js',
          'node_modules/bluebird/js/browser/bluebird.min.js',
          'node_modules/leaflet/dist/leaflet.js',
          'node_modules/leaflet-minimap/dist/Control.MiniMap.min.js',
          'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
          'node_modules/ng-image-gallery/dist/ng-image-gallery.min.js'
        ];
        return Promise.resolve()
            .then(function () {
              var stream = gulp.src(filesExist(files)).pipe(gulp.dest(destBase + 'js/'));
              return streamToPromise(stream);
            })
            .then(function () {
              var stream = gulp.src(files.map(file => { return `${file}.map`; })).pipe(gulp.dest(destBase + 'js/'));
              return streamToPromise(stream);
            })
            .then(function () {
                var stream = gulp.src(filesExist([
                    './assets/images/**/*.*',
                    './node_modules/leaflet/dist/images/*',
                    './node_modules/leaflet-minimap/dist/images/*'
                ])).pipe(gulp.dest(destBase + 'images/'));
                return streamToPromise(stream);
            })
            .then(function () {
                var stream = gulp.src(filesExist([
                    './node_modules/font-awesome/fonts/*',
                    './assets/fonts/*'
                ])).pipe(gulp.dest(destBase + 'fonts/'));
                return streamToPromise(stream);
            })
            .then(function () {
                var stream = gulp.src(filesExist([
                    './assets/favicon/*'
                ])).pipe(gulp.dest(destBase + 'favicon/'));
                return streamToPromise(stream);
            })
            .then(function () {
                var stream = gulp.src(filesExist(['./src/shared/manifest.json']))
                  .pipe(gulp.dest(destBase));
                return streamToPromise(stream);
            })
            .then(function () {
                var stream = gulp.src(filesExist(['./src/shared/static/md/*.md']))
                  .pipe(gulp.dest(destBase + 'static/'));
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
    watch(['src/web/js/**/*.js', 'src/mobile/js/**/*.js', 'src/shared/js/**/*.js', 'config.json'], function () {
        return streamToPromise(gulp.start('js')).then(connect.reload);
    });
    watch(['src/web/less/**/*.less', 'src/mobile/less/**/*.less','src/shared/less/**/*.less'], function () {
        return streamToPromise(gulp.start('css:main')).then(connect.reload);
    });
    watch(['src/web/pug/**/*.pug', 'src/mobile/pug/**/*.pug', 'src/shared/pug/**/*.pug'], function () {
        return streamToPromise(gulp.start('html')).then(connect.reload);
    });
    watch(['./assets/**/*', './src/shared/static/md/*.md'], function () {
        return streamToPromise(gulp.start('assets')).then(connect.reload);
    });
});

gulp.task('serve', function (env) {
    return Promise.resolve()
        .then(function () {
            if (env && env !== 'web') {
                return;
            }
            serveApp({
                name: 'Web App',
                livereload: 35729,
                root: 'dist/web',
                port: 7888
            });
        })
        .then(function () {
            if (env && env !== 'mobile') {
                return;
            }
            serveApp({
                name: 'Mobile App',
                livereload: 35730,
                root: 'dist/mobile',
                port: 7070
            });
        });
});

gulp.task('serve:cordova', function () {
    serveApp({
        name: 'Cordova App',
        livereload: 35731,
        root: 'dist/cordova',
        port: 8090
    });
});

gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', [
    'build',
    'lint'
]);



//
//
// Build

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('release', [
    'clean'
], function () {
    return gulp.start('build');
});

gulp.task('build', [
    'assets',
    'js',
    'css',
    'html'
]);


// FIXME: build only works when cordova dir is removed, also runs through entire build for each update

gulp.task('build:android', function () {
    var config = require('./config.json');
    var icon = require('gulp-cordova-icon');
    var xml = require('gulp-cordova-xml');
    var author = require('gulp-cordova-author');
    var plugin = require('gulp-cordova-plugin');
    var android = require('gulp-cordova-build-android'),
        dst = gulp.dest('dist/android')
    return gulp.src('dist/mobile').pipe(require('gulp-cordova-create')({
            dir: 'dist/cordova',
            id: config.android.app_id,
            name: config.android.app_name
        }))
        .pipe(require('gulp-cordova-access')(config.android.access_origins))
        .pipe(require('gulp-cordova-preference')(config.android.prefs))
        .pipe(require('gulp-cordova-version')(pkg.version))
        .pipe(author(config.author.name,config.author.email,config.author.url))
        .pipe(require('gulp-cordova-description')(config.android.app_description))
        .pipe(plugin(config.android.plugins))
          .pipe(xml([
            '<splash src="www/images/splash/leerstandsmelder_splash.png"  />',
            '<preference name="BackupWebStorage" value="local" />'
          ]))
          .pipe(icon('www/images/icons/leerstandsmelder_icon.png', {errorHandlingStrategy: 'warn'}))
          .pipe(android({release: true}))
          .pipe(dst);
        // TODO: make release configurable
        //

    //'<splash src="www/images/Default@2x~iphone.png" width="640" height="960" />',
            // <!--
            //     ldpi    : 36x36 px
            //     mdpi    : 48x48 px
            //     hdpi    : 72x72 px
            //     xhdpi   : 96x96 px
            //     xxhdpi  : 144x144 px
            //     xxxhdpi : 192x192 px
            // -->
            //     <icon src="www/images/icons/android/drawable-ldpi/icon.png" density="ldpi" />
            //     <icon src="www/images/icons/android/drawable-mdpi/icon.png" density="mdpi" />
            //     <icon src="www/images/icons/android/drawable-hdpi/icon.png" density="hdpi" />
            //     <icon src="www/images/icons/android/drawable-xhdpi/icon.png" density="xhdpi" />
            //     <icon src="www/images/icons/android/drawable-xxhdpi/icon.png" density="xxhdpi" />
            //     <icon src="www/images/icons/android/drawable-xxxhdpi/icon.png" density="xxxhdpi" />
            //
       // src.pipe(android({storeFile: '../keys', keyAlias: 'leerstandsmelder'}));
    // return streamToPromise(src.pipe(dst));
});

gulp.task('build:ios', function () {
    var config = require('./config.json');
    var icon = require('gulp-cordova-icon');
    var xml = require('gulp-cordova-xml');
    var author = require('gulp-cordova-author');
    var plugin = require('gulp-cordova-plugin');
    var dst = require('gulp-cordova-build-ios')()
    return gulp.src('dist/mobile').pipe(require('gulp-cordova-create')({
            dir: 'dist/cordova',
            id: config.ios.app_id,
            name: config.ios.app_name
        }))
        .pipe(require('gulp-cordova-description')(config.android.app_description))
        .pipe(author(config.author.name,config.author.email,config.author.url))
        .pipe(require('gulp-cordova-version')(pkg.version))
        .pipe(plugin(config.ios.plugins))
        .pipe(xml([
            '<splash src="www/images/splash/ios/Default~iphone.png" width="320" height="480"/>',
            '<splash src="www/images/splash/ios/Default@2x~iphone.png" width="640" height="960"/>',
            '<splash src="www/images/splash/ios/Default-Portrait~ipad.png" width="768" height="1024"/>',
            '<splash src="www/images/splash/ios/Default-Portrait@2x~ipad.png" width="1536" height="2048"/>',
            '<splash src="www/images/splash/ios/Default-Landscape~ipad.png" width="1024" height="768"/>',
            '<splash src="www/images/splash/ios/Default-Landscape@2x~ipad.png" width="2048" height="1536"/>',
            '<splash src="www/images/splash/ios/Default-568h@2x~iphone.png" width="640" height="1136"/>',
            '<splash src="www/images/splash/ios/Default-667h.png" width="750" height="1334"/>',
            '<splash src="www/images/splash/ios/Default-736h.png" width="1242" height="2208"/>',
            '<splash src="www/images/splash/ios/Default-Landscape-736h.png" width="2208" height="1242"/>',
            '<splash src="www/images/splash/ios/Default@2x~universal~anyany.png" />',
            '<preference name="BackupWebStorage" value="local" />',
            '<preference name="Orientation" value="all" />'
        ]))
        .pipe(icon('www/images/icons/leerstandsmelder_icon.png', { errorHandlingStrategy: 'warn' }))
      .pipe(dst);

//    return src;
});



//
//
// Docs

gulp.task('doc', function () {
    return gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc());
});
