/* jshint -W100 */

'use strict';

var lang_de = require('../../shared/js/lang/de'),
  lang_en = require('../../shared/js/lang/en'),
  routes = require('./routes'),
  angular = global.angular,
  agGrid = global.agGrid;

agGrid.initialiseAgGridWithAngular1(angular);

var app = angular.module('leerstandsmelder', [
  require('angular-animate'),
  require('angular-messages'),
  require('angular-translate'),
  require('angular-translate-storage-cookie'),
  require('angular-translate-storage-local'),
  require('angular-translate-loader-static-files'),
  require('ng-file-upload'),
  require('angular-busy2'),
  require('angular-aria'),
  require('angular-cookies'),
  require('angular-route'),
  require('angular-sanitize'),
  require('angular-marked'),
  'agGrid',
  'ngMaterial',
  'thatisuday.ng-image-gallery',
  'ngCordova'
]);

require('../../shared/js/controllers');
require('../../shared/js/directives');
require('../../shared/js/filters');
require('../../shared/js/services');

require('../../mobile/js/filters');
require('../../mobile/js/directive');

app.provider('PubSub', require('angular-pubsub'));

app.factory('assetPath', require('./services/assetpath'));
app.factory('DeviceReadyService', require('./services/deviceready'));
app.factory('GeolocationService', require('./services/geolocation'));
app.factory('CameraService', require('./services/camera'));
app.factory('uploadService', require('./services/upload'));

app.constant("configuration", {
  'urlbase': '#!/'
});
app.config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);
app.config([
  '$routeProvider',
  '$locationProvider',
  '$animateProvider',
  '$translateProvider',
  '$mdThemingProvider',
  '$compileProvider',
  '$mdGestureProvider',
  'markedProvider',
  function ($routeProvider, $locationProvider, $animateProvider, $translateProvider, $mdThemingProvider, $compileProvider, $mdGestureProvider, markedProvider) {
    markedProvider.setOptions({gfm: true});

    // this should stop the clickjacker
    $mdGestureProvider.skipClickHijack();

    // this is supposed to speed up render times.
    $compileProvider.debugInfoEnabled(false);
    var whiteMap = $mdThemingProvider.extendPalette('grey', {
      '500': '#dddddd',
      'contrastDefaultColor': 'dark'
    });
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|fi‌​le|blob|cdvfile|cont‌​ent):|data:image/);

    $mdThemingProvider.definePalette('white', whiteMap);

    // added the leerstand color to the palette

    var leerstandMap = $mdThemingProvider.extendPalette('white', {
      '500': 'ed1c24'
    });
    $mdThemingProvider.definePalette('leerstand', leerstandMap);

    // TODO: abstract this theme style out to config
    $mdThemingProvider.theme('default')
      .primaryPalette('leerstand')
      .accentPalette('deep-orange')
      .warnPalette('red');

    $mdThemingProvider.theme("success-toast");
    $mdThemingProvider.theme("error-toast");

    // TODO: check user preference with custom pref
    // see: http://angular-translate.github.io/docs/en/#/guide/11_custom-storages
    $translateProvider
      .determinePreferredLanguage()
      .useLocalStorage()
      .useSanitizeValueStrategy('escaped')
      .preferredLanguage('de')
      .usePostCompiling(true)
      .translations('en', lang_en)
      .translations('de', lang_de);

    $animateProvider.classNameFilter(/animate-/);

    $locationProvider.html5Mode({
      enabled: false
    });

    for (var i in routes) {
      if (routes[i] instanceof Object) {
        $routeProvider.when(routes[i].route, {
          templateUrl: routes[i].templateUrl,
          controller: routes[i].controller
        });
      }
    }

    $routeProvider.otherwise({redirectTo: '/'});
  }]);

angular.element(function () {
  angular.bootstrap(document, ['leerstandsmelder']);
});
