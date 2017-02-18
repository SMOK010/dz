// Create a controller with name personsFormController to bind to the form section.
app.controller('exercisesFormController', function ($scope, $rootScope, exercisesService, bodyPartsService, activitiesService) {
	$scope.options = {
		    'optionName1': 'aerobowe',
		    'optionName2': 'kondycyjne',
		    'optionName3': 'silowe',
		};
	
	$scope.num = -1;
	
	$scope.exercise = {
			"id" : null,
			"type" : null,
			"name" : null,
			"bodyPart" : null,
	}
	
	// Clears the form. Either by clicking the 'Clear' button in the form, or when a successfull save is performed.
    $scope.clearForm = function () {
        
        
       
        // For some reason, I was unable to clear field values with type 'url' if the value is invalid.
        // This is a workaroud. Needs proper investigation.
        //document.getElementById('imageUrl').value = null;
        // Resets the form validation state.
        $scope.trainingsForm.$setPristine();
        // Broadcast the event to also clear the grid selection.
        $rootScope.$broadcast('clear');
        //$rootScope.$broadcast('clearNum');
        
        
    };
   

    
    
 // Calls the rest method to save a person.
    $scope.updateTraining2 = function () {
    	
    	$scope.exercise.bodyPart = $scope.bodyPart0;
    	exercisesService.save($scope.exercise).$promise.then(
            function (exercise) {
                $rootScope.$broadcast('exerciseSaved');
                
            },
            function () {
                // Broadcast the event for a server error.
                $rootScope.$broadcast('error');
            });
    };
    
    $scope.$on('changeBodyPart', function (event, bodyPart) {
	    	$scope.bodyPart0 = bodyPart;
    });
    
    
});



app.controller('bodyPartsController', function ($scope, $rootScope, bodyPartsService, exercisesService) {
	$scope.num = 0;
	$scope.bodyPart = null;
	
	$scope.loadBodyPartsOptions = function () {
        $rootScope.$broadcast('loadBodyPartsOptions');
    };
    $scope.$on('loadBodyPartsOptions', function (event) {
    	bodyPartsService.query(function (data) {
            $scope.bodyParts = data;
        });
    });
    /*$scope.$on('clearNum', function (event) {
    	$scope.num = 0;
    });*/
    
    //action for change the selected value of body part, send it to exercise controller
    $scope.changeBodyPart = function (bodyPart) {
        $rootScope.$broadcast('changeBodyPart', $scope.bodyPart);
    };
});

// Service that provides exercises operations
app.factory('exercisesService', function ($resource) {
    return $resource('api/exercises/:id');
});

//Service that provides bodyParts Types operations
app.factory('bodyPartsService', function ($resource) {
	return $resource('api/bodyparts/:id');
});

//Service that provides activities Types operations
app.factory('activitiesService', function ($resource) {
	return $resource('api/activities/:id');
});


