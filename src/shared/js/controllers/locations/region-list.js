'use strict';

var async = require('async');

var LocationsRegionListController = function ($scope, $q, $location, $mdDialog, $translate, responseHandler,
                                              apiService, regionService, $routeParams, configuration, $filter) {

    var deferred = $q.defer();
    $scope.promise = deferred.promise;
    $scope.urlbase = configuration.urlbase || '/';

    var columnDefs = [
        {headerName: $filter('translate')("locations.title"), field: "title", width: 120 },
        {headerName: $filter('translate')("locations.street"), field: "street", width: 90},
        {headerName: $filter('translate')("locations.postcode"), field: "postcode", width: 90},
        {headerName: $filter('translate')("author.created"), field: "created", width: 90, cellRenderer: $scope.dateFormatter},
        {headerName: $filter('translate')("author.updated"), field: "updated", width: 90, cellRenderer: $scope.dateFormatter, sort: 'desc'},
        {headerName: $filter('translate')("locations.hidden"), field: "hidden", width: 90, cellRenderer: $scope.booleanFormatter }, //
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
           return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " href="' + $scope.urlbase + (params.data.region ? params.data.region.slug : params.data.region_uuid)+ '/' + (params.data.slug || params.data.uuid) + '" aria-label="' + $filter('translate')("actions.view") + '"><md-icon md-font-icon="fa-eye" class="fa fa-eye"></md-icon></a>';
        }
        },
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
           return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " href="' + $scope.urlbase +  'locations/update/' + (params.data.slug || params.data.uuid) + '" aria-label="' + $filter('translate')("actions.edit") + '"><md-icon md-font-icon="fa-pencil" class="fa fa-pencil"></md-icon></a>';
        }
        },
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
           return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " ng-click="clickDeleteHandler(\'' + params.value + '\')" aria-label="' + $filter('translate')("actions.delete") + '"><md-icon md-font-icon="fa-trash" class="fa fa-trash"></md-icon></a>';
        }
        },
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
           return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " ng-click="commentHandler(\'' + params.value + '\',' + params.rowIndex + ')" aria-label="' + $filter('translate')("actions.delete") + '"><md-icon md-font-icon="fa-trash" class="fa fa-trash"></md-icon></a>';
        }
        }
    ];

    if ($routeParams.region_uuid) {
        $scope.listHeadline = 'locations.locations_by_region';
    } else {
        $scope.listHeadline = 'locations.my_locations';
    }

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: null,
        rowHeight: 58,
        rowClassRules: {
            'hidden-warning': 'data.hidden'
        },
        enableSorting: true,
        enableFilter: true,
        enableColResize: true,
        animateRows: true,
        angularCompileRows: true,
        getRowNodeId: function(data) { return data.uuid; },
        onGridReady: function() {
            setTimeout(function() {
                $scope.gridOptions.api.sizeColumnsToFit();
            }, 600);
        }
    };

    $scope.filterGrid = function() {
        $scope.gridOptions.api.setQuickFilter($scope.filterStr);
    };
    regionService.setCurrentRegion($routeParams.region_uuid, function () {
        $scope.currentRegion = regionService.currentRegion.title;
    });

    async.waterfall([
        function (cb) {
            if ($routeParams.region_uuid) {
                apiService('regions').actions.find($routeParams.region_uuid, cb);
            } else {
                apiService('regions?sort=title').actions.all(cb);
            }
        },
        function (regions, cb) {
            var regionData = regions.results || regions;
            if (Array.isArray(regionData)) {
                $scope.data = regionData.results || regionData;
                $scope.gridOptions.api.setRowData($scope.data);
                $scope.gridOptions.api.sizeColumnsToFit();
                cb();
            } else {
                $scope.region = regionData;
                apiService('regions/' + regionData.uuid + '/locations').actions.all(cb);
            }
        }
    ], function (err, locations) {
        if (locations) {
            $scope.listHeadline = $translate.instant('locations.locations_by_region') + ': ' +
                ($scope.region ? $scope.region.title : null);
            $scope.data = locations.results || locations;
            $scope.gridOptions.api.setRowData($scope.data);
            $scope.gridOptions.api.sizeColumnsToFit();
        } else {
            $scope.listHeadline = $translate.instant('locations.locations_by_region');
        }
        responseHandler.handleResponse(err, deferred);
    });
    $scope.commentHandler = function (/* uuid */) {

    };

    $scope.clickDeleteHandler = function (uuid) {
        var confirm = $mdDialog.confirm()
            .title($translate.instant('locations.remove_confirm_title'))
            .textContent($translate.instant('locations.remove_confirm_body'))
            .ariaLabel('locations.remove_confirm_title')
            .ok($translate.instant('actions.ok'))
            .cancel($translate.instant('actions.cancel'));
        $mdDialog.show(confirm).then(function () {
            var deferred = $q.defer();
            $scope.promise = deferred.promise;

            apiService('locations').actions.remove(uuid, function (err) {
                var msgs = {
                    success: 'locations.remove_success'
                };
                if (responseHandler.handleResponse(err, deferred, msgs)) {
                    $scope.gridOptions.api.updateRowData({remove: [{'uuid':uuid}]});
                }
            });
        });
    };
};

LocationsRegionListController.$inject = ['$scope', '$q', '$location', '$mdDialog', '$translate', 'responseHandler',
    'apiService', 'regionService', '$routeParams', 'configuration', '$filter'];

module.exports = LocationsRegionListController;
