/* global async,console,angular,define,SimpleMDE,LEERSTANDSMELDER_API_HOST */

define([
    'json!../../../../js/config.json!bust',
    'services_api',
    'services_auth'
], function (config) {
    return angular.module('lsm.directives.helpers', [
            'lsm.services.api',
            'lsm.services.auth'
        ])
        .directive('checkLogin', ['apiService', 'authService', function (apiService, authService) {
            return {
                link: function (scope) {
                    scope.$parent.$on('currentUser:updated', function () {
                        scope.updateUser();
                    });
                    scope.updateUser = function () {
                        if (authService.access_token) {
                            async.waterfall([
                                function (cb) {
                                    apiService('users').actions.find('me', cb);
                                },
                                function (user, cb) {
                                    scope.userSession = user;
                                    apiService('users/me/api_keys').actions.all(cb);
                                },
                                function (api_keys, cb) {
                                    if (api_keys.length > 0) {
                                        scope.api_key = api_keys[0];
                                        scope.admin_regions = [];
                                        async.eachSeries(scope.api_key.scopes, function (item, next) {
                                            if (item.indexOf('region-') === 0) {
                                                var region_uuid = item.replace('region-', '');
                                                apiService('regions').actions.find(region_uuid, function (err, region) {
                                                    if (!err) {
                                                        scope.admin_regions.push(region);
                                                    }
                                                    next();
                                                });
                                            } else {
                                                next();
                                            }
                                        }, cb);
                                    } else {
                                        cb();
                                    }
                                }
                            ], function (err) {
                                if (err) {
                                    console.log('error fetching user', err.message);
                                    scope.userSession = null;
                                    return;
                                }
                                scope.$apply();
                            });
                        }
                    };
                    scope.updateUser();
                }
            };
        }])
        .directive('captcha', function () {
            return {
                link: function (scope, elem, attrs) {
                    scope.$parent.$on('captcha:update', function () {
                        attrs.$set('src', '');
                        attrs.$set('reset', false);
                        attrs.$set('src', config.global.api_url + '/captchas.png?r=' + Date.now());
                    });
                    attrs.$set('src', config.global.api_url + '/captchas.png?r=' + Date.now());
                }
            };
        })
        .directive('lightbox', ['$mdDialog', function ($mdDialog) {
            return {
                link: function (scope, elem, attrs) {
                    elem.addClass('image-click');
                    elem.on('click', function () {
                        var dialog = $mdDialog.confirm({
                            templateUrl: '/partials/_lightbox.html',
                            clickOutsideToClose: true,
                            controller: function controller(scope, $mdDialog) {
                                scope.image = attrs.src;
                                scope.cancel = function () {
                                    $mdDialog.cancel();
                                };
                            }
                        });
                        $mdDialog.show(dialog);
                    });
                }
            };
        }])
        .directive('markdownEditor', function () {
            return {
                link: function (scope, elem, attrs) {
                    scope.editor = new SimpleMDE({element: elem[0]});
                    scope.$watch(attrs.ngModel, function () {
                        var ngModel = scope.$eval(attrs.ngModel);
                        if (ngModel) {
                            scope.editor.value(ngModel);
                        }
                    });
                }
            };
        });
});