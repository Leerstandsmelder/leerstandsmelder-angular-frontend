'use strict';

var ApplicationController = function ($scope, $rootScope, $translate, $location, $timeout, $q, apiService, authService, regionService, $mdSidenav, $window, $filter) {

    //We’re not actually assigning the currentUser object, we’re merely initializing the property on the scope so the currentUser can later be accessed throughout the application.
    $scope.userSession = null;
    $scope.api_key = null;

    $scope.setUserSession = function (user) {
        $scope.userSession = user;
    };
    $scope.setApiKey = function (key) {
        $scope.api_key = key;
    };

    //general helper functions
    $scope.back = function() {
        $window.history.back();
    };

    $scope.dateFormatter = function(params) {
      return $filter('date')(params.value, 'yyyy-MM-dd');
    };

    $scope.translateFormatter = function(params) {
      if(params.value) {
          return $filter('translate')(params.value);
      } else {
          return '';
      }
    };

    $scope.booleanFormatter = function(params) {
        return (params.value ? $filter('translate')("generel.yes"):$filter('translate')("generel.no"));
    };

};

ApplicationController.$inject = ['$scope','$rootScope','$translate','$location','$timeout', '$q', 'apiService', 'authService', 'regionService', '$mdSidenav', '$window', '$filter'];

module.exports = ApplicationController;
