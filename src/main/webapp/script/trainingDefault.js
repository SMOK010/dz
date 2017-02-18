app.controller('trainingsFormController', function ($window, $scope, $rootScope, trainingsService, exercisesService, $timeout) {
   
	$scope.exercises = {
			"id" : null,
			"name" : null,
			
	};
	
	$scope.activity = {
			"id" : null,
			"exercise" : null
	};
	
	$scope.user = {
			age : null,
			username : null,
			email : null,
			firstName : null,
			lastName : null,
			gender : null,
			id : null,
			logs : null,
			password : null,
			roles : null,
			trainings : null
	};
	
	$scope.training = {
			"id" : null,
			"activities" : new Array(),
			"user" : null
	};
	$scope.activities = [];
	
	//grid loading data about actually logged in user trainings
    $scope.exercisesGrid = {
        data: 'exercises',
        useExternalSorting: true,
        refreshGrid: $scope.refreshGrid,
        //sortInfo: $scope.sortInfo,
        
        
        columnDefs: [
            { field: 'id', displayName: 'Id', width: '40px'  },
            { field: 'name', displayName: 'Nazwa', width: '250px'  },
            { field: 'type', displayName: 'Typ' }
            ],

        multiSelect: true,
        selectedItems: []
        // Broadcasts an event when a row is selected, to signal the form that it needs to load the row data.
        /*afterSelectionChange: function (rowItem) {
            if (rowItem.selected) {
                $rootScope.$broadcast('trainingSelected', $scope.gridOptions.selectedItems[0].id);
            }
        }*/
    };
    
 // Refresh the grid, calling the appropriate rest method.
    $scope.refreshGrid = function () {
		exercisesService.query(function (data) {
            $scope.exercises = data;
        });
    };
    
    $scope.$watch('sortInfo.fields[0]', function () {
        $scope.refreshGrid();
    }, true);
    
    $scope.$on('refreshGrid', function () {
        $scope.refreshGrid();
    });
	
	
    $scope.updateTraining = function() {
    	$scope.username = $('#ctx').text();
        $scope.trainingType = $('#trainingType').text();
        $scope.user.username = $scope.username;
		$scope.training.user = $scope.user;
		$scope.training.type = $scope.trainingType;
		
		angular.forEach($scope.exercisesGrid.selectedItems, function(value, key) {
			activity = {
					"id" : null,
					"exercise" : null
			};
			activity.exercise = $scope.exercisesGrid.selectedItems[key];
			$scope.activities.push(activity);
			
		});
		
		$scope.training.activities = $scope.activities;
		
		trainingsService.save($scope.training).$promise.then(
	            function (training) {
	                // Broadcast the event to display a save message.
	            	$scope.training = training;
	            	
	            	//$rootScope.$broadcast('trainingSavedSet', training);
	                $rootScope.$broadcast('trainingSaved');
	                $rootScope.$broadcast('clearForm');
	                
	            },
	            function () {
	                // Broadcast the event for a server error.
	                $rootScope.$broadcast('error');
	            });
    };
    
    $scope.$on('clearForm', function() {
    	alert('cosik');
    	$scope.training = null;
    	$scope.trainingsForm.$setPristine();
    	$scope.exercisesGrid.selectAll(false);
    	
    });
    
	
});

app.factory('trainingsService', function ($resource) {
    return $resource('api/trainings/:id');
});

//Service that provides exercises operations
app.factory('exercisesService', function ($resource) {
	return $resource('api/exercises/:id');
});