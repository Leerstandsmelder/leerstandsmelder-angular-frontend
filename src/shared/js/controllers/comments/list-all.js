'use strict';

var async = require('async');

var CommentsListAllController = function ($scope, $q, apiService, responseHandler, $mdDialog, $translate , $routeParams, $filter, configuration) {

    var deferred = $q.defer();
    $scope.promise = deferred.promise;
    $scope.urlbase = configuration.urlbase || '/';

    function getNodeChildDetails(rowItem) {
        if (rowItem.comments) {
            return {
                group: true,
                expanded: true,
                // provide ag-Grid with the children of this group
                children: rowItem.comments,
                // the key is used by the default group cellRenderer
                key: rowItem.title
            };
        } else {
            return null;
        }
    }

    var columnDefs = [
        {headerName: $filter('translate')("locations.location"), field: "title", width: 90, cellRenderer: 'group'},
        {headerName: $filter('translate')("comments.body"), field: "body", width: 120},
        {headerName: $filter('translate')("author.author"), field: "user_uuid", width: 90},
        {headerName: $filter('translate')("comments.created"), field: "created", width: 90, cellRenderer: $scope.dateFormatter},
        {headerName: $filter('translate')("author.updated"), field: "updated", width: 90, cellRenderer: $scope.dateFormatter, sort: 'desc'},
        {headerName: $filter('translate')("locations.hidden"), field: "hidden", width: 90, cellRenderer: $scope.booleanFormatter }, //
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
            if(params.node.data && !params.node.data.user_uuid) {
                return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " href="' + $scope.urlbase +  'locations/' + params.value + '" aria-label="' + $filter('translate')("actions.edit") + '"><md-icon md-font-icon="fa-eye" class="fa fa-eye"></md-icon></a>';
            } else { return '';}
        }
        },
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
            if(params.node.data && params.node.data.user_uuid) {
                return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " href="' + $scope.urlbase + 'admin/comments/' + params.value + '" aria-label="{{ \'actions.edit\' | translate }}"><md-icon md-font-icon="fa-pencil" class="fa fa-pencil"></md-icon></a>';
            } else { return '';}
        }
        },
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
            if(params.node.data && params.node.data.user_uuid) {
                return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " ng-click="clickDeleteHandler(\'' + params.value + '\')" aria-label="' + $filter('translate')("actions.delete") + '"><md-icon md-font-icon="fa-trash" class="fa fa-trash"></md-icon></a>';
            } else { return '';}
        }
        }
    ];

    var columnDefsRegions = [
        {headerName: $filter('translate')("regions.title"), field: "title", width: 90, cellRenderer: 'group'},
        {headerName: $filter('translate')("comments.created"), field: "created", width: 90, cellRenderer: $scope.dateFormatter},
        {headerName: $filter('translate')("author.updated"), field: "updated", width: 90, cellRenderer: $scope.dateFormatter, sort: 'desc'},
        {headerName: $filter('translate')("locations.hidden"), field: "hidden", width: 90, cellRenderer: $scope.booleanFormatter }, //
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
          return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " href="' + $scope.urlbase +  'admin/regions/' + params.value + '/comments" aria-label="' + $filter('translate')("actions.edit") + '"><md-icon md-font-icon="fa-eye" class="fa fa-eye"></md-icon></a>';
        }
        },
    ];


    if ($routeParams.region_uuid) {
        $scope.listHeadline = 'comments.comments_by_region';
    } else {
        $scope.listHeadline = 'comments.my_comments';
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
        animateRows: true,
        enableColResize: true,
        angularCompileRows: true,
        //getRowNodeId: function(data) { return data.uuid; },
        //getNodeChildDetails: getNodeChildDetails,
        onGridReady: function() {
            setTimeout(function() {
                $scope.gridOptions.api.sizeColumnsToFit();
            }, 600);
        }
    };

    $scope.filterGrid = function() {
      $scope.gridOptions.api.setQuickFilter($scope.filterStr);
    };

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
                $scope.gridOptions.api.setColumnDefs( columnDefsRegions );
                $scope.gridOptions.api.setRowData($scope.data);
                $scope.gridOptions.api.sizeColumnsToFit();
                cb();
            } else {
                $scope.region = regionData;
                apiService('regions/' + regionData.uuid + '/comments?flat=true').actions.all(cb);
            }
        }
    ], function (err, comments) {
        if (comments) {
            $scope.listHeadline = $translate.instant('comments.comments_by_region') + ': ' +
                ($scope.region ? $scope.region.title : null);
            $scope.data = comments.results || comments;
            console.log('data', $scope.data);
            $scope.gridOptions.api.setRowData($scope.data);
            $scope.gridOptions.api.sizeColumnsToFit();
        } else {
            $scope.listHeadline = $translate.instant('locations.locations_by_region');
        }
        responseHandler.handleResponse(err, deferred);
    });

    $scope.clickDeleteHandler = function (uuid) {
        var confirm = $mdDialog.confirm()
            .title($translate.instant('comments.remove_confirm_title'))
            .textContent($translate.instant('comments.remove_confirm_body'))
            .ariaLabel('comments.remove_confirm_title')
            .ok($translate.instant('actions.ok'))
            .cancel($translate.instant('actions.cancel'));
        $mdDialog.show(confirm).then(function () {
            var deferred = $q.defer();
            $scope.promise = deferred.promise;

            apiService('comments').actions.remove(uuid, function (err) {
                var msgs = {
                    success: 'comments.remove_success'
                };
                if (responseHandler.handleResponse(err, deferred, msgs)) {
                    $scope.gridOptions.api.updateRowData({remove: [{'uuid':uuid}]});
                }
            });
        });
    };



};

CommentsListAllController.$inject = ['$scope', '$q', 'apiService', 'responseHandler', '$mdDialog', '$translate', '$routeParams', '$filter', 'configuration'];

module.exports = CommentsListAllController;
