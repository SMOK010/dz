// Create a controller with name personsListController to bind to the grid section.
app.controller('usersListController', function ($scope, $rootScope, userService) {
    // Initialize required information: sorting, the first page to show and the grid options.
    $scope.sortInfo = {fields: ['username'], directions: ['asc']};
    $scope.users = {currentPage: 1};

    $scope.gridOptions = {
        data: 'users.list',
        useExternalSorting: true,
        sortInfo: $scope.sortInfo,

        columnDefs: [
            { field: 'username', displayName: 'Username' },
            { field: 'email', displayName: 'Email' },
            { field: 'firstName', displayName: 'First Name' },
            { field: 'lastName', displayName: 'Last Name' },
            { field: 'age', displayName: 'Age' },
            { field: 'gender', displayName: 'Gender' },
            { field: '', width: 30, cellTemplate: '<span class="glyphicon glyphicon-remove remove" ng-click="deleteRow(row)"></span>' }
        ],

        multiSelect: false,
        selectedItems: [],
        // Broadcasts an event when a row is selected, to signal the form that it needs to load the row data.
        afterSelectionChange: function (rowItem) {
            if (rowItem.selected) {
                $rootScope.$broadcast('userSelected', $scope.gridOptions.selectedItems[0].username);
            }
        }
    };

    // Refresh the grid, calling the appropriate rest method.
    $scope.refreshGrid = function () {
        var listUsersArgs = {
            page: $scope.users.currentPage,
            sortFields: $scope.sortInfo.fields[0],
            sortDirections: $scope.sortInfo.directions[0]
        };

        userService.get(listUsersArgs, function (data) {
            $scope.users = data;
        })
    };

    // Broadcast an event when an element in the grid is deleted. No real deletion is perfomed at this point.
    $scope.deleteRow = function (row) {
        $rootScope.$broadcast('deleteUser', row.entity.username);
    };

    // Watch the sortInfo variable. If changes are detected than we need to refresh the grid.
    // This also works for the first page access, since we assign the initial sorting in the initialize section.
    $scope.$watch('sortInfo.fields[0]', function () {
        $scope.refreshGrid();
    }, true);

    // Do something when the grid is sorted.
    // The grid throws the ngGridEventSorted that gets picked up here and assigns the sortInfo to the scope.
    // This will allow to watch the sortInfo in the scope for changed and refresh the grid.
    $scope.$on('ngGridEventSorted', function (event, sortInfo) {
        $scope.sortInfo = sortInfo;
    });

    // Picks the event broadcasted when a person is saved or deleted to refresh the grid elements with the most
    // updated information.
    $scope.$on('refreshGrid', function () {
        $scope.refreshGrid();
    });

    // Picks the event broadcasted when the form is cleared to also clear the grid selection.
    $scope.$on('clear', function () {
        $scope.gridOptions.selectAll(false);
    });
});

// Create a controller with name personsFormController to bind to the form section.
app.controller('usersFormController', function ($scope, $rootScope, userService) {
    // Clears the form. Either by clicking the 'Clear' button in the form, or when a successfull save is performed.
    $scope.clearForm = function () {
        $scope.user = null;
        // For some reason, I was unable to clear field values with type 'url' if the value is invalid.
        // This is a workaroud. Needs proper investigation.
        //document.getElementById('imageUrl').value = null;
        // Resets the form validation state.
        $scope.userForm.$setPristine();
        // Broadcast the event to also clear the grid selection.
        $rootScope.$broadcast('clear');
    };

    // Calls the rest method to save a person.
    $scope.updateUser = function () {
        userService.save($scope.user).$promise.then(
            function () {
                // Broadcast the event to refresh the grid.
                $rootScope.$broadcast('refreshGrid');
                // Broadcast the event to display a save message.
                $rootScope.$broadcast('userSaved');
                $scope.clearForm();
            },
            function () {
                // Broadcast the event for a server error.
                $rootScope.$broadcast('error');
            });
    };

    // Picks up the event broadcasted when the person is selected from the grid and perform the person load by calling
    // the appropiate rest service.
    $scope.$on('userSelected', function (event, username) {
        $scope.user = userService.get({username: username});
    });

    // Picks us the event broadcasted when the person is deleted from the grid and perform the actual person delete by
    // calling the appropiate rest service.
    $scope.$on('deleteUser', function (event, username) {
        userService.delete({username: username}).$promise.then(
            function () {
                // Broadcast the event to refresh the grid.
                $rootScope.$broadcast('refreshGrid');
                // Broadcast the event to display a delete message.
                $rootScope.$broadcast('userDeleted');
                $scope.clearForm();
            },
            function () {
                // Broadcast the event for a server error.
                $rootScope.$broadcast('error');
            });
    });
});

// Service that provides users operations
app.factory('userService', function ($resource) {
    return $resource('api/users/:username');
});

var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

app.directive("compareTo", compareTo);

