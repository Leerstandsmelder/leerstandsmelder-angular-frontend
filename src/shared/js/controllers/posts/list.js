'use strict';

var PostsListController = function ($scope, $q,$mdDialog ,$translate, apiService, responseHandler, $location,  configuration, $filter) {
    $scope.urlbase = configuration.urlbase || '/';
    $scope.settings = {
        pagesize: 25000,
        resource: 'posts'
    };

    if($location.path().indexOf('static')>0) {
        $scope.settings.resource = 'posts/static';
    }

    var columnDefs = [
        {headerName: $filter('translate')("posts.title"), field: "title", width: 120, sort: 'asc'},
        {headerName: $filter('translate')("author.created"), field: "created", width: 90, cellRenderer: $scope.dateFormatter},
        {headerName: $filter('translate')("author.updated"), field: "updated", width: 90, cellRenderer: $scope.dateFormatter},
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
            return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " href="' + $scope.urlbase + 'admin/posts/' + params.value + '" aria-label="' + $filter('translate')("actions.edit") + '"><md-icon md-font-icon="fa-pencil" class="fa fa-pencil"></md-icon></a>';
        }
        },
        {headerName: "", field: "uuid", width: 60, suppressFilter: true, cellRenderer: function (params) {      // Function cell renderer
            return '<a class="md-icon-button md-table-button md-raised  md-fab  md-mini " ng-click="clickDeleteHandler(\'' + params.value + '\')" aria-label="' + $filter('translate')("actions.delete") + '"><md-icon md-font-icon="fa-trash" class="fa fa-trash"></md-icon></a>';
        }
        }
    ];

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
    $scope.query = {
        sort: $scope.settings.sort ? $scope.settings.sort : 'title',
        page: 1
    };

    var pageSize =  $scope.settings.pagesize;
    var resource = $scope.settings.resource + '?limit=' + pageSize +
        '&skip=' + ((( $scope.query.page) - 1) * pageSize) + '&sort=' + ( $scope.query.sort);
    apiService(resource).actions.all(function (err, results) {
        if (!err && results) {
            $scope.gridOptions.api.setRowData(results.results || results);
            $scope.gridOptions.api.sizeColumnsToFit();
            $scope.query.total = results.total;
        }
    });

    $scope.clickDeleteHandler = function (uuid) {
        var confirm = $mdDialog.confirm()
            .title($translate.instant('posts.remove_confirm_title'))
            .textContent($translate.instant('posts.remove_confirm_body'))
            .ariaLabel('posts.remove_confirm_title')
            .ok($translate.instant('actions.ok'))
            .cancel($translate.instant('actions.cancel'));
        $mdDialog.show(confirm).then(function () {
            var deferred = $q.defer();
            $scope.promise = deferred.promise;
            apiService('posts').actions.remove(uuid, function (err) {
                var msgs = {
                    success: 'posts.remove_success'
                };
                if (responseHandler.handleResponse(err, deferred, msgs)) {
                    window.document.location.reload();
                }
            });
        });
    };

};

PostsListController.$inject = ['$scope', '$q', '$mdDialog', '$translate', 'apiService', 'responseHandler', '$location', 'configuration', '$filter'];

module.exports = PostsListController;
