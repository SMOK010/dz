
app.controller('trainingsListController', function ($scope, $rootScope, trainingsService, userService, $filter, $timeout) {
    // Initialize required information: sorting, the first page to show and the grid options.
	//$scope.format = 'dd-MMMM-yyyy';
	$scope.parseDate = null;
	
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };
	  
	  
	//grid loading data about actually logged in user trainings
    $scope.gridOptions = {
        data: 'trainings',
        useExternalSorting: true,
        refreshGrid: $scope.refreshGrid,
        //sortInfo: $scope.sortInfo,
        
        
        columnDefs: [
            { field: 'id', displayName: 'Id', width: '40px'  },
            { field: 'name', displayName: 'Nazwa', width: '250px'  },
            { field: 'trainingDate', displayName: 'Data', width: '160px', cellTemplate: "<span>{{row.getProperty(col.field)['year']}} - {{row.getProperty(col.field)['month']}} - {{row.getProperty(col.field)['dayOfMonth']}}</span>"},
            { field: 'description', displayName: 'Opis' },
            { field: 'duration', displayName: 'Czas trwania', width: '100px' },
            { field: '', width: 30, cellTemplate: '<span class="glyphicon glyphicon-remove remove" ng-click="deleteRow(row)"></span>' }
        ],

        multiSelect: false,
        selectedItems: [],
        // Broadcasts an event when a row is selected, to signal the form that it needs to load the row data.
        afterSelectionChange: function (rowItem) {
            if (rowItem.selected) {
                $rootScope.$broadcast('trainingSelected', $scope.gridOptions.selectedItems[0].id);
            }
        }
    };
    
    //grid of data about activities from checked training
    $scope.gridActivitiesOptions = {
            data: 'training.activities',
            useExternalSorting: true,
            refreshGrid: $scope.refreshActivitiesGrid,
            
            columnDefs: [
                { field: 'exercise.name', displayName: 'Ćwiczenie' },
                //{ field: '', width: 30, cellTemplate: '<span class="glyphicon glyphicon-remove remove" ng-click="deleteRow(row)"></span>' }
            ],

            multiSelect: false,
            selectedItems: [],
            // Broadcasts an event when a row is selected, to signal the form that it needs to load the row data.
            afterSelectionChange: function (rowItem) {
            	
                if (rowItem.selected) {
                	alert(rowItem.rowIndex);
                    $rootScope.$broadcast('trainingActSelected', rowItem.rowIndex);
                }
            }
        };
    
    //grid of data about series of actually checked exercise
    $scope.gridActivitiesNOptions = {
            data: 'actualActivity.series',
            useExternalSorting: true,
            refreshGrid: $scope.refreshActivitiesGrid,
            enableCellEditOnFocus: true,
            
            
            columnDefs: [
               { field: 'weight', displayName: 'Waga' },
                { field: 'repeats', displayName: 'Ciężar' },
                //{ field: '', width: 30, cellTemplate: '<span class="glyphicon glyphicon-remove remove" ng-click="deleteRow(row)"></span>' }
            ],

            multiSelect: false,
            selectedItems: [],
            // Broadcasts an event when a row is selected, to signal the form that it needs to load the row data.
            afterSelectionChange: function (rowItem) {
                if (rowItem.selected) {
                    $rootScope.$broadcast('trainingActSeriesSelected', $scope.gridOptions.selectedItems[0].id);
                }
            }
        };
    
  

    // Refresh the grid, calling the appropriate rest method.
    $scope.refreshGrid = function () {
    	$scope.username = $('#ctx').text();
    	//$rootScope.$broadcast('userRead', $scope.username);
    	
    	alert($scope.username);
		userService.get({username: $scope.username}, function (data) {
            //$scope.user = data;
			var i = 0;
			while(i < data.trainings.length){
				if(angular.equals(data.trainings[i]['type'], 1) ){
    				data.trainings.splice(i, 1);
    			}else{
    				i++;
    			}
			}
			
            $scope.trainings = data.trainings;
            $timeout( function() {
            	$rootScope.$broadcast('setMonthsBar', $scope.trainings);
            }, 500);
            
        });
    };
    
    $scope.refreshActivitiesGrid = function () {
    	alert("refresh");
    	//$scope.training = $scope.training;
    };
    
    $scope.$on('trainingSelected', function (event, id) {
        $scope.training = trainingsService.get({id: id});
        $scope.actualActivity = null;
    });
    
    $scope.$on('trainingActSelected', function (event, rowIndex) {
        $scope.actualActivity = $scope.training.activities[rowIndex];
        
    });
    

    // Broadcast an event when an element in the grid is deleted. No real deletion is perfomed at this point.
    $scope.deleteRow = function (row) {
        $rootScope.$broadcast('deleteTraining', row.entity.id);
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
    
    $scope.$on('refreshActivitiesGrid', function (training) {
    	$scope.training = training;
        //$scope.refreshActivitiesGrid();
    });

    // Picks the event broadcasted when the form is cleared to also clear the grid selection.
    $scope.$on('clear', function () {
        $scope.gridOptions.selectAll(false);
    });
});

// Create a controller with name personsFormController to bind to the form section.
app.controller('trainingsFormController', function ($window, $scope, $rootScope, trainingsService, bodyPartsService, activitiesService, userService, $timeout) {
    
	function setStart(){
		
	
	$scope.numSeries0 = 0;
	$scope.numSeries1 = 0;
	$scope.numSeries2 = 0;
	$scope.numSeries3 = 0;
	$scope.numSeries4 = 0;
	$scope.num = -1;
	$scope.activity0 = {
			"id" : null,
			"exercise" : null,
			"series" : [],
	};
	$scope.activity1 = {
			"id" : null,
			"exercise" : null,
			"series" : [],
	};
	$scope.activity2 = {
			"id" : null,
			"exercise" : null,
			"series" : [],
	};
	$scope.activity3 = {
			"id" : null,
			"exercise" : null,
			"series" : [],
	};
	$scope.activity4 = {
			"id" : null,
			"exercise" : null,
			"series" : [],
	};
	$scope.series00 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series01 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series02 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series03 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series04 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series10 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series11 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series12 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series13 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series14 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series20 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series21 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series22 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series23 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series24 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series30 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series31 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series32 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series33 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.series34 = {
			"id" : null,
			"weight" : null,
			"repeats" : null,
	}
	$scope.training = {
			"id" : null,
			"activities" : new Array(),
			"user" : null
	};
	$scope.activities = [];
	
	}
	
	setStart();
	
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
	}
	
	
	// Clears the form. Either by clicking the 'Clear' button in the form, or when a successfull save is performed.
    $scope.clearForm = function () {
    	 $timeout( function() {
    		 //$scope.training = null;
    		 $scope.trainingsForm.$setPristine();
    		 $scope.parseDate = null;
    		 $scope.num = 0;
    		 $rootScope.$broadcast("clearNum");
    		 setStart();
    	 }, 700);
        
//        $scope.activity = null;
//        $scope.activity0 = null;
//        $scope.activity1 = null;
//        $scope.activity2 = null;
//        $scope.activity3 = null;
//        $scope.activity4 = null;
//        
//        $scope.weight00 = null;
//        $scope.repeats00 = null;
//        $scope.weight01 = null;
//        $scope.repeats01 = null;
//        $scope.weight02 = null;
//        $scope.repeats02 = null;
//        $scope.weight03 = null;
//        $scope.repeats03 = null;
//        $scope.weight04 = null;
//        $scope.repeats04 = null;
//        
//        $scope.weight10 = null;
//        $scope.repeats10 = null;
//        $scope.weight11 = null;
//        $scope.repeats11 = null;
//        $scope.weight12 = null;
//        $scope.repeats12 = null;
//        $scope.weight13 = null;
//        $scope.repeats13 = null;
//        $scope.weight14 = null;
//        $scope.repeats14 = null;
//        
//        $scope.weight20 = null;
//        $scope.repeats20 = null;
//        $scope.weight21 = null;
//        $scope.repeats21 = null;
//        $scope.weight22 = null;
//        $scope.repeats22 = null;
//        $scope.weight23 = null;
//        $scope.repeats23 = null;
//        $scope.weight24 = null;
//        $scope.repeats24 = null;
//        
//        $scope.weight30 = null;
//        $scope.repeats30 = null;
//        $scope.weight31 = null;
//        $scope.repeats31 = null;
//        $scope.weight32 = null;
//        $scope.repeats32 = null;
//        $scope.weight33 = null;
//        $scope.repeats33 = null;
//        $scope.weight34 = null;
//        $scope.repeats34 = null;
//        
//        $scope.bodyPart0 = null;
//        $scope.exercise0 = null;
//        $scope.bodyPart1 = null;
//        $scope.exercise1 = null;
//        $scope.bodyPart2 = null;
//        $scope.exercise2 = null;
//        $scope.bodyPart3 = null;
//        $scope.exercise3 = null;
//        $scope.num = -1;
//        $scope.numSeries0 = 0;
//        $scope.numSeries1 = 0;
//        $scope.numSeries2 = 0;
//        $scope.numSeries3 = 0;
//        $scope.numSeries4 = 0;
//        
//        $scope.trainingType = 0;
//        
//        $scope.activities = [];
        $('#actRow0').addClass("hidden");
        $('#actRow1').addClass("hidden");
        $('#actRow2').addClass("hidden");
        $('#actRow3').addClass("hidden");
        
        addHiddenClass($('#seriesBlock00'), $('#seriesBlock01'), $('#seriesBlock02'), $('#seriesBlock03'), $('#seriesBlock04'));
        addHiddenClass($('#seriesBlock10'), $('#seriesBlock11'), $('#seriesBlock12'), $('#seriesBlock13'), $('#seriesBlock14'));
        addHiddenClass($('#seriesBlock20'), $('#seriesBlock21'), $('#seriesBlock22'), $('#seriesBlock23'), $('#seriesBlock24'));
        addHiddenClass($('#seriesBlock30'), $('#seriesBlock31'), $('#seriesBlock32'), $('#seriesBlock33'), $('#seriesBlock34'));
        
        // For some reason, I was unable to clear field values with type 'url' if the value is invalid.
        // This is a workaroud. Needs proper investigation.
        //document.getElementById('imageUrl').value = null;
        // Resets the form validation state.
        $scope.trainingsForm.$setPristine();
        // Broadcast the event to also clear the grid selection.
        //$rootScope.$broadcast('clear');
        //$rootScope.$broadcast('clearNum');
        
        
    };
    
    function addHiddenClass(block0, block1, block2, block3, block4){
    	block0.addClass("hidden");
    	block1.addClass("hidden");
    	block2.addClass("hidden");
    	block3.addClass("hidden");
    	block4.addClass("hidden");
    	
    };
   

    // Calls the rest method to save a person.
    $scope.updateTraining = function () {
    	
    	$scope.updateTraining2();
    	$scope.clearForm();
    };
    
    
 // Calls the rest method to save a person.
    $scope.updateTraining2 = function () {
    	
    	$scope.trainingType = $('#trainingType').text();
    	alert($scope.trainingType);
    	
    	$scope.activities = [];
    	
    	alert('zapis');
    	if($scope.num > -1){
    		if($scope.num >= 0){
    			$scope.series00.weight = $scope.weight00;
    			$scope.series00.repeats = $scope.repeats00;
    			$scope.series01.weight = $scope.weight01;
    			$scope.series01.repeats = $scope.repeats01;
    			$scope.series02.weight = $scope.weight02;
    			$scope.series02.repeats = $scope.repeats02;
    			$scope.series03.weight = $scope.weight03;
    			$scope.series03.repeats = $scope.repeats03;
    			$scope.series04.weight = $scope.weight04;
    			$scope.series04.repeats = $scope.repeats04;
				alert("dlugosc aktywnosci");
				alert($scope.training.activities.length);
				if($scope.training.activities.length > 0){
					alert("tooo");
					alert($scope.num);
					$scope.activity0.id = $scope.training.activities[0].id;
					alert("activity0.id");
					alert($scope.activity0.id);
					if($scope.training.activities[0].series.length > 0){
						$scope.series00.id = $scope.training.activities[0].series[0].id;
						if($scope.training.activities[0].series.length > 1){
							$scope.series01.id = $scope.training.activities[0].series[1].id;
							if($scope.training.activities[0].series.length > 2){
								$scope.series02.id = $scope.training.activities[0].series[2].id;
								if($scope.training.activities[0].series.length > 3){
									$scope.series03.id = $scope.training.activities[0].series[3].id;
									if($scope.training.activities[0].series.length > 4){
										$scope.series04.id = $scope.training.activities[0].series[4].id;
						    		}
								}
							}
						}
						
					}
				}
				$scope.activity0.series = [];
				alert("numSeries0");
				alert($scope.numSeries0);
				if($scope.numSeries0 > 0){
					$scope.activity0.series.push($scope.series00);
					if($scope.numSeries0 > 1){
						$scope.activity0.series.push($scope.series01);
						if($scope.numSeries0 > 2){
							$scope.activity0.series.push($scope.series02);
							if($scope.numSeries0 > 3){
								$scope.activity0.series.push($scope.series03);
								if($scope.numSeries0 > 4){
									$scope.activity0.series.push($scope.series04);
						    	}
							}
						}
					}
				}
				
				$scope.activities.push($scope.activity0);
    			
    			//druga aktywność w treningu
		    	if($scope.num >= 1){
		    		$scope.series10.weight = $scope.weight10;
	    			$scope.series10.repeats = $scope.repeats10;
	    			$scope.series11.weight = $scope.weight11;
	    			$scope.series11.repeats = $scope.repeats11;
	    			$scope.series12.weight = $scope.weight12;
	    			$scope.series12.repeats = $scope.repeats12;
	    			$scope.series13.weight = $scope.weight13;
	    			$scope.series13.repeats = $scope.repeats13;
	    			$scope.series14.weight = $scope.weight14;
	    			$scope.series14.repeats = $scope.repeats14;
	    			
					if($scope.training.activities.length > 1){
						
						$scope.activity1.id = $scope.training.activities[1].id;
						
						if($scope.training.activities[1].series.length > 0){
							$scope.series10.id = $scope.training.activities[1].series[0].id;
							alert("serie10.id");
							alert($scope.series10.id);
							if($scope.training.activities[1].series.length > 1){
								$scope.series11.id = $scope.training.activities[1].series[1].id;
								if($scope.training.activities[1].series.length > 2){
									$scope.series12.id = $scope.training.activities[1].series[2].id;
									if($scope.training.activities[1].series.length > 3){
										$scope.series13.id = $scope.training.activities[1].series[3].id;
										if($scope.training.activities[1].series.length > 4){
											$scope.series14.id = $scope.training.activities[1].series[4].id;
							    		}
									}
								}
							}
							
						}
					}
					$scope.activity1.series = [];
					alert("numSeries1");
					alert($scope.numSeries1);
					if($scope.numSeries1 > 0){
						$scope.activity1.series.push($scope.series10);
						if($scope.numSeries1 > 1){
							$scope.activity1.series.push($scope.series11);
							if($scope.numSeries1 > 2){
								$scope.activity1.series.push($scope.series12);
								if($scope.numSeries1 > 3){
									$scope.activity1.series.push($scope.series13);
									if($scope.numSeries1 > 4){
										$scope.activity1.series.push($scope.series14);
							    	}
								}
							}
						}
					}
					alert("aktivity1");
					alert($scope.activity1.exercise.id);
					$scope.activities.push($scope.activity1);
	    			
		    		
		    		//3 aktywność w treningu
		        	if($scope.num >= 2){
		        		$scope.series20.weight = $scope.weight20;
		    			$scope.series20.repeats = $scope.repeats20;
		    			$scope.series21.weight = $scope.weight21;
		    			$scope.series21.repeats = $scope.repeats21;
		    			$scope.series22.weight = $scope.weight22;
		    			$scope.series22.repeats = $scope.repeats22;
		    			$scope.series23.weight = $scope.weight23;
		    			$scope.series23.repeats = $scope.repeats23;
		    			$scope.series24.weight = $scope.weight24;
		    			$scope.series24.repeats = $scope.repeats24;
		    			
						if($scope.training.activities.length > 2){
							
							$scope.activity2.id = $scope.training.activities[2].id;
							
							if($scope.training.activities[2].series.length > 0){
								$scope.series20.id = $scope.training.activities[2].series[0].id;
								
								if($scope.training.activities[2].series.length > 1){
									$scope.series21.id = $scope.training.activities[2].series[1].id;
									if($scope.training.activities[2].series.length > 2){
										$scope.series22.id = $scope.training.activities[2].series[2].id;
										if($scope.training.activities[2].series.length > 3){
											$scope.series23.id = $scope.training.activities[2].series[3].id;
											if($scope.training.activities[2].series.length > 4){
												$scope.series24.id = $scope.training.activities[2].series[4].id;
								    		}
										}
									}
								}
								
							}
						}
						$scope.activity2.series = [];
						
						if($scope.numSeries2 > 0){
							$scope.activity2.series.push($scope.series20);
							if($scope.numSeries2 > 1){
								$scope.activity2.series.push($scope.series21);
								if($scope.numSeries2 > 2){
									$scope.activity2.series.push($scope.series22);
									if($scope.numSeries2 > 3){
										$scope.activity2.series.push($scope.series23);
										if($scope.numSeries2 > 4){
											$scope.activity2.series.push($scope.series24);
								    	}
									}
								}
							}
						}
						
						$scope.activities.push($scope.activity2);
		        		
    							if($scope.num >= 3){
    								$scope.series30.weight = $scope.weight30;
    				    			$scope.series30.repeats = $scope.repeats30;
    				    			$scope.series31.weight = $scope.weight31;
    				    			$scope.series31.repeats = $scope.repeats31;
    				    			$scope.series32.weight = $scope.weight32;
    				    			$scope.series32.repeats = $scope.repeats32;
    				    			$scope.series33.weight = $scope.weight33;
    				    			$scope.series33.repeats = $scope.repeats33;
    				    			$scope.series34.weight = $scope.weight34;
    				    			$scope.series34.repeats = $scope.repeats34;
    				    			
    								if($scope.training.activities.length > 3){
    									
    									$scope.activity3.id = $scope.training.activities[3].id;
    									
    									if($scope.training.activities[3].series.length > 0){
    										$scope.series30.id = $scope.training.activities[3].series[0].id;
    										
    										if($scope.training.activities[3].series.length > 1){
    											$scope.series31.id = $scope.training.activities[3].series[1].id;
    											if($scope.training.activities[3].series.length > 2){
    												$scope.series32.id = $scope.training.activities[3].series[2].id;
    												if($scope.training.activities[3].series.length > 3){
    													$scope.series33.id = $scope.training.activities[3].series[3].id;
    													if($scope.training.activities[3].series.length > 4){
    														$scope.series34.id = $scope.training.activities[3].series[4].id;
    										    		}
    												}
    											}
    										}
    										
    									}
    								}
    								$scope.activity3.series = [];
    								
    								if($scope.numSeries3 > 0){
    									$scope.activity3.series.push($scope.series30);
    									if($scope.numSeries3 > 1){
    										$scope.activity3.series.push($scope.series31);
    										if($scope.numSeries3 > 2){
    											$scope.activity3.series.push($scope.series32);
    											if($scope.numSeries3 > 3){
    												$scope.activity3.series.push($scope.series33);
    												if($scope.numSeries3 > 4){
    													$scope.activity3.series.push($scope.series34);
    										    	}
    											}
    										}
    									}
    								}
    								
    								$scope.activities.push($scope.activity3);
    				        	}
		        	}
		    	}
    		}
    	}
    	$scope.training.activities = [];
    	$scope.training.activities = $scope.activities;
    	$scope.username = $('#ctx').text();
    	
    		$scope.user.username = $scope.username;
    		$scope.training.user = $scope.user;
        	
    	$scope.parseDate.setDate($scope.parseDate.getDate() + 1);
    	
    	alert($scope.parseDate);
    	console.log($scope.parseDate);
    	$scope.training.trainingDate = $scope.parseDate.toISOString().split("T")[0];
    	
    	console.log($scope.training.trainingDate);
    	//console.log($scope.training.trainingDate.month);
    	
    	$scope.training.type = $scope.trainingType;
    	
    	trainingsService.save($scope.training).$promise.then(
            function (training) {
                // Broadcast the event to display a save message.
            	$scope.training = training;
            	
            	//$rootScope.$broadcast('trainingSavedSet', training);
                $rootScope.$broadcast('trainingSaved');
                
            },
            function () {
                // Broadcast the event for a server error.
                $rootScope.$broadcast('error');
            });
    };
    
    /*$scope.$on('trainingSavedSet', function (training) {
    	$scope.training = training
    	console.log($scope.training.id);
    });*/
     
    $scope.$on('changeBodyPart', function (bodyPart) {
    	alert(bodyPart.name);
    });
    
    $scope.$on('addNextExerciseClEv', function (event, bodyPart, exercise, num) {
    	$scope.num = num;
    	alert(num);
    	if(num == 0){
    		$('#actRow0').removeClass("hidden");
    		$scope.activity0.series = [];
	    	$scope.bodyPart0 = bodyPart;
	    	$scope.exercise0 = exercise;
	    		$scope.activity0.exercise = $scope.exercise0;
	    		
    	}
    	if(num == 1){
    		$('#actRow1').removeClass("hidden");
    		$scope.activity1.series = [];
	    	$scope.bodyPart1 = bodyPart;
	    	$scope.exercise1 = exercise;
		    	$scope.activity1.exercise = $scope.exercise1;
	    		
    	}
    	if(num == 2){
    		$('#actRow2').removeClass("hidden");
    		$scope.activity2.series = [];
	    	$scope.bodyPart2 = bodyPart;
	    	$scope.exercise2 = exercise;
		    	$scope.activity2.exercise = $scope.exercise2;
	    		
    	}
    	if(num == 3){
    		$('#actRow3').removeClass("hidden");
    		$scope.activity3.series = [];
	    	$scope.bodyPart3 = bodyPart;
	    	$scope.exercise3 = exercise;
		    	$scope.activity3.exercise = $scope.exercise3;
	    		
    	}
    });
    
    $scope.$on('addMoreSeries0Ev', function (event, numSeries0) {
    	removeSeriesClass($('#seriesBlock00'), $('#seriesBlock01'), $('#seriesBlock02'), $('#seriesBlock03'), $('#seriesBlock04'), numSeries0);
    });
    $scope.$on('addMoreSeries1Ev', function (event, numSeries1) {
    	removeSeriesClass($('#seriesBlock10'), $('#seriesBlock11'), $('#seriesBlock12'), $('#seriesBlock13'), $('#seriesBlock14'), numSeries1);
    });
    $scope.$on('addMoreSeries2Ev', function (event, numSeries2) {
    	removeSeriesClass($('#seriesBlock20'), $('#seriesBlock21'), $('#seriesBlock22'), $('#seriesBlock23'), $('#seriesBlock24'), numSeries2);
    });
    $scope.$on('addMoreSeries3Ev', function (event, numSeries3) {
    	removeSeriesClass($('#seriesBlock30'), $('#seriesBlock31'), $('#seriesBlock32'), $('#seriesBlock33'), $('#seriesBlock34'), numSeries3);
    });
    
    
    function removeSeriesClass(block0, block1, block2, block3, block4, numSeries){
    	if(numSeries == 0){
    		block0.removeClass("hidden");
    	}
    	if(numSeries == 1){
    		block1.removeClass("hidden");
    	}
    	if(numSeries == 2){
    		block2.removeClass("hidden");
    	}
    	if(numSeries == 3){
    		block3.removeClass("hidden");
    	}
    	if(numSeries == 4){
    		block4.removeClass("hidden");
    	}
    }
    
    function pushActivity(series00, series01, series02, series03, series04,
			weight00, weight01, weight02, weight03, weight04,
			repeats00, repeats01, repeats02, repeats03, repeats04,
			activity0, training, numSeries0, activities, num){
				series00.weight = weight00;
				series00.repeats = repeats00;
				series01.weight = weight01;
				series01.repeats = repeats01;
				series02.weight = weight02;
				series02.repeats = repeats02;
				series03.weight = weight03;
				series03.repeats = repeats03;
				series04.weight = weight04;
				series04.repeats = repeats04;
				alert("dlugosc");
				alert($scope.training.activities.length);
				if($scope.training.activities.length > 0){
					alert("tooo");
					alert(num);
					activity0.id = $scope.training.activities[num].id;
					if($scope.training.activities[num].series.length > 0){
					series00.id = $scope.training.activities[num].series[0].id;
						if($scope.training.activities[num].series.length > 1){
							series01.id = $scope.training.activities[num].series[1].id;
							if($scope.training.activities[num].series.length > 2){
								series02.id = $scope.training.activities[num].series[2].id;
								if($scope.training.activities[num].series.length > 3){
									series03.id = $scope.training.activities[num].series[3].id;
									if($scope.training.activities[num].series.length > 4){
						    			series04.id = $scope.training.activities[num].series[4].id;
						    		}
								}
							}
						}
						
					}
				}
				activity0.series = [];
				if(numSeries0 > 0){
					activity0.series.push(series00);
					if(numSeries0 > 1){
						activity0.series.push(series01);
						if(numSeries0 > 2){
							activity0.series.push(series02);
							if(numSeries0 > 3){
								activity0.series.push(series03);
								if(numSeries0 > 4){
						    		activity0.series.push(series04);
						    	}
							}
						}
					}
				}
				
				$scope.activities.unshift(activity0);
	};
    
	
    
    $scope.$on('trainingTest', function(event){
    	alert($scope.training.activities[0].id);
    	alert($scope.trainings.length);
    });
	
    //checkboxes click functions:
    
    $scope.addTrainingCheckBox001ClickFunction = function () {
    	setTimeout(function(){
    	$rootScope.$broadcast('addTrainingCheckBox001ClickFunction');
    	}, 100);
    };
    
    $scope.$on('addTrainingCheckBox001ClickFunction', function(event){
    	var checkBox1 = $( this );
    	var par = checkBox1.parent().parent();
    	//getByTag
    	var checkBox2 = par.find(".addTrainingCheckBox002");
    	var weight1 = par.find(".addTrainingWeightSeries001");
    	var weight2 = par.find(".addTrainingWeightSeries002");
    	var repeats1 = par.find(".addTrainingRepeatsNumber001");
    	var repeats2 = par.find(".addTrainingRepeatsNumber002");
    	alert(checkBox2.parent().className);
    	//checkBox1[0].disabled = true;
    	if(checkBox1.is(':checked'))
    	{
    		alert(checkBox1.is(':checked'));
    		$( weight1 ).attr('disabled', false);
    		$( repeats1 ).attr('disabled', false);
    		checkBox2.disabled = false;
    		$( checkBox2 ).attr('checked', true);
    	}
    	else
    	{
    		$( weight1 ).attr('disabled', true);
    		$( repeats1 ).attr('disabled', true);
    		//$( checkBox2 ).attr('disabled', true);
    		$( weight2 ).attr('disabled', true);
    		$( repeats2 ).attr('disabled', true);
    	}
    });
    
    $scope.addMoreSeries0 = function () {
    	$rootScope.$broadcast('addMoreSeries0');
    	
    };
    $scope.$on('addMoreSeries0', function (event) {
    	$rootScope.$broadcast('addMoreSeries0Ev', $scope.numSeries0);
    	$scope.numSeries0++;
    });
    
    $scope.addMoreSeries1 = function () {
    	$rootScope.$broadcast('addMoreSeries1');
    	
    };
    $scope.$on('addMoreSeries1', function (event) {
    	$rootScope.$broadcast('addMoreSeries1Ev', $scope.numSeries1);
    	$scope.numSeries1++;
    });
    
    $scope.addMoreSeries2 = function () {
    	$rootScope.$broadcast('addMoreSeries2');
    	
    };
    $scope.$on('addMoreSeries2', function (event) {
    	$rootScope.$broadcast('addMoreSeries2Ev', $scope.numSeries2);
    	$scope.numSeries2++;
    });
    
    $scope.addMoreSeries3 = function () {
    	$rootScope.$broadcast('addMoreSeries3');
    	
    };
    $scope.$on('addMoreSeries3', function (event) {
    	$rootScope.$broadcast('addMoreSeries3Ev', $scope.numSeries3);
    	$scope.numSeries3++;
    });
    
    $scope.$on('trainingSelected', function (event, id) {
        $scope.training = trainingsService.get({id: id});
        $timeout( function() {
        	
        	$rootScope.$broadcast('testDaty');
        	//$rootScope.$broadcast('refreshActivitiesGrid', $scope.training);

        }, 500)
        
    });
    $scope.$on('testDaty', function (event) {
    	var input = $scope.training.trainingDate;
        if(input != null){
        	var day = input.dayOfMonth;
            var month = input.monthValue - 1; // Month is 0-indexed
            var year = input.year;

            $scope.parseDate = new Date(Date.UTC(year, month, day));
            console.log($scope.parseDate);
        	$scope.parseDate = $scope.parseDate;
        }
    });
    
    $scope.$on('deleteTraining', function (event, id) {
        trainingsService.delete({id: id}).$promise.then(
            function () {
                // Broadcast the event to refresh the grid.
                $rootScope.$broadcast('refreshGrid');
                // Broadcast the event to display a delete message.
                $rootScope.$broadcast('trainingDeleted');
                $scope.clearForm();
            },
            function () {
                // Broadcast the event for a server error.
                $rootScope.$broadcast('error');
            });
    });
    
});

app.controller('bodyPartsController', function ($scope, $rootScope, bodyPartsService, exercisesService, trainingsService) {
	
	$scope.refreshGrid = function () {
    	setTimeout(function(){
    		$rootScope.$broadcast('refreshGrid');
    	}, 100);
        
    };
	$scope.num = 0;
	
	$scope.trainingDefault = null;
	$scope.bodyPartDefault = null;
	$scope.bodyPart = {
			'id' : null,
			'exercise' : null
	};
	$scope.exercise = null;
	
	$scope.options = {
		    'optionName1': 'aerobowe',
		    'optionName2': 'kondycyjne',
		    'optionName3': 'silowe',
		};
	
	$scope.changeExerciseType = function (exerciseType) {
        alert(exerciseType);
        if(angular.equals(exerciseType, "silowe") && $("#bodyPartDiv").hasClass("hidden")){
        	$("#bodyPartDiv").removeClass("hidden");
        }else{
        	if(!$("#bodyPartDiv").hasClass("hidden")){
        		$("#bodyPartDiv").addClass("hidden");
        	}
        }
        
        if(angular.equals(exerciseType, "aerobowe")){
        	exercisesService.query( function(data) {
        		var i = 0;
        		while(i < data.length){
    				if(!angular.equals(data[i]['type'], "aerobowe") ){
        				data.splice(i, 1);
        			}else{
        				i++;
        			}
    			}
        		$scope.bodyPart.exercises = data;
        	});
        }
        
        if(angular.equals(exerciseType, "kondycyjne")){
        	exercisesService.query( function(data) {
        		var i = 0;
        		while(i < data.length){
    				if(!angular.equals(data[i]['type'], "kondycyjne") ){
        				data.splice(i, 1);
        			}else{
        				i++;
        			}
    			}
        		$scope.bodyPart.exercises = data;
        	});
        }
    };
	
	$scope.trainingTest = function () {
    	setTimeout(function(){
    		$rootScope.$broadcast('trainingTest');
    	}, 100);
    };
    
	$scope.loadBodyPartsOptions = function () {
        $rootScope.$broadcast('loadBodyPartsOptions');
    };
    $scope.$on('loadBodyPartsOptions', function (event) {
    	bodyPartsService.query(function (data) {
    		$scope.bodyPartsDef = data;
            $scope.bodyParts = data;
            
        });
    });
    $scope.$on('clearNum', function (event) {
    	$scope.num = 0;
    });
    
    
    $scope.changeBodyPart = function (bodyPart) {
        alert(bodyPart.name);
    };
    
    $scope.changeExercise = function (exercise) {
        alert(exercise.name);
        //$rootScope.$broadcast('cl', bodyPart.name);
    };
    
    $scope.changeBodyPartDef = function (bodyPartDefault) {
        alert(bodyPartDefault.name);
        
        trainingsService.query(function (data) {
            //$scope.user = data;
			angular.forEach(data, function(value, key) {
    			if(angular.equals(data[key]['type'], 0) ){
    				data.splice(key, 1);
    			}
    		});
            $scope.trainingsDefault = data;
        });
    };
    
    $scope.cl = function () {
    	$rootScope.$broadcast('cl');
    };
    $scope.$on('cl', function (event) {
    	$rootScope.$broadcast('clEv', $scope.bodyPart, $scope.exercise, $scope.num);
    	$scope.num++;
    });
    
    $scope.addNextExerciseCl = function () {
    	
    	$rootScope.$broadcast('addNextExerciseCl');
    	
    };
    $scope.$on('addNextExerciseCl', function (event) {
    	$rootScope.$broadcast('addNextExerciseClEv', $scope.bodyPart, $scope.exercise, $scope.num);
    	$scope.num++;
    });
    
    
    
    
    $scope.addNextExerciseMU = function () {
    	$rootScope.$broadcast('addNextExerciseMU');
    };
    $scope.$on('addNextExerciseMU', function (event) {
    	
    	
    	alert('mouseUp')
    	alert($scope.num);
    	$.post('nextExercise', {num : $scope.num},
				function(result){
    		
    		$( "#addTrainingForm" ).append(result);
    		/*alert(result);*/
				});
    	$scope.num++;
    	
    });
    
    
});

app.controller("monthCtrl", function ($scope, $rootScope, $timeout) {
	
	function checkMonth(array, monthName){
		var trainingNumber = 0;
		angular.forEach(array, function(value, key) {
			if(array[key]['trainingDate'] != null){
				if(angular.equals(array[key]['trainingDate']['month'], monthName) ){
					trainingNumber++;
				}
			}
			
		})
		
		return trainingNumber;
	};
	
	$scope.labels = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
	  $scope.series = ['TRENINGI'];
	  
	$scope.$on('setMonthsBar', function (event, trainings) {
			var lists = trainings;
    		var array = angular.fromJson(lists);
    		var number2 = 0;
    		number2 = checkMonth(array, 'FEBRUARY');
    		angular.forEach($scope.data[0], function(value, key) {
    			$scope.data[0][key] = checkMonth(array, $scope.labels[key]);
    		});
    });
	
	  //var number = $scope.trainings.size();
	  var step  = 1;
	  var max   = 31
	  var start = 0;
	  $scope.chartOptions = {
			  scales: {
			      yAxes: [{
			        ticks: {
			          beginAtZero: true,
			          callback: function(value) {if (value % 1 === 0) {return value;}}
			        }
			      }]
			    }
	  };
	  $scope.data = [
	    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
	  ];
	});

app.controller("partCtrl", function ($scope, $rootScope, $timeout) {
	
	function checkMonth(array, monthName){
		var trainingNumber = 0;
		angular.forEach(array, function(value, key) {
			angular.forEach(array[key]['activities'], function(value, key1) {
				if(angular.equals(array[key]['activities'][key1]['trainingDate.month'], monthName) ){
					trainingNumber++;
				}
			})
		})
		
		return trainingNumber;
	};
	
	$scope.labels = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
	  $scope.series = ['TRENINGI'];
	  
	$scope.$on('setMonthsBar', function (event, trainings) {
			var lists = trainings;
    		var array = angular.fromJson(lists);
    		var number2 = 0;
    		number2 = checkMonth(array, 'FEBRUARY');
    		angular.forEach($scope.data[0], function(value, key) {
    			$scope.data[0][key] = checkMonth(array, $scope.labels[key]);
    		});
    });
	
	  
	  //var number = $scope.trainings.size();
	  var step  = 1;
	  var max   = 31
	  var start = 0;
	  $scope.chartOptions = {
			  scales: {
			      yAxes: [{
			        ticks: {
			          beginAtZero: true,
			          callback: function(value) {if (value % 1 === 0) {return value;}}
			        }
			      }]
			    }
	  };
	  $scope.data = [
	    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
	  ];
	});

app.controller('trainingDefaultController', function ($scope, $rootScope, bodyPartsService, exercisesService, trainingsService) {

	$scope.trainingsDefault = null;
	$scope.trainingDefault = null;
	
	
	//grid of data about activities from checked training
    $scope.gridDefaultActivitiesOptions = {
            data: 'trainingDefault.activities',
            useExternalSorting: true,
            refreshGrid: $scope.refreshDefaultActivitiesGrid,
            
            columnDefs: [             
                { field: 'exercise.name', displayName: 'Ćwiczenia', width: "auto" }
               ],

            multiSelect: false,
            selectedItems: [],
            // Broadcasts an event when a row is selected, to signal the form that it needs to load the row data.
            afterSelectionChange: function (rowItem) {
            	
                if (rowItem.selected) {
                    $rootScope.$broadcast('trainingDefaultActivitySelected', $scope.gridDefaultActivitiesOptions.selectedItems[0]);
                }
            }
    };
    
    //grid of data about series of actually checked exercise
    $scope.gridDefaultActivitiesNOptions = {
            data: 'actualActivity.series',
            useExternalSorting: true,
            refreshGrid: $scope.refreshActivitiesGrid,
            
            
            columnDefs: [
               { field: 'weight', displayName: 'Waga', width: "auto"},
               { field: 'repeats', displayName: 'Ciężar', width: "auto"}
            ],

            multiSelect: false,
            selectedItems: [],
            // Broadcasts an event when a row is selected, to signal the form that it needs to load the row data.
            afterSelectionChange: function (rowItem) {
                if (rowItem.selected) {
                    $rootScope.$broadcast('trainingActSeriesSelected', $scope.gridOptions.selectedItems[0].id);
                }
            }
    };
    
	$scope.trainingsDefault = null;
	$scope.trainingDefault = null;
    
	$scope.loadTrainingsDefaultOptions = function () {
        $rootScope.$broadcast('loadTrainingsDefaultOptions');
    };
    $scope.$on('loadTrainingsDefaultOptions', function (event) {
    	trainingsService.query(function(data) {
    		var i = 0;
    		while(i < data.length){
				if(angular.equals(data[i]['type'], 0) ){
    				data.splice(i, 1);
    			}else{
    				i++;
    			}
			}
    		$scope.trainingsDefault = data;
    	});
    	
    });
    
    $scope.$on('trainingDefaultActivitySelected', function (event, activity) {
    	$scope.actualActivity = activity;
    	alert($scope.actualActivity.id);
    });
    
    
    $scope.changeTraining = function (trainingDefault) {
        $rootScope.$broadcast('refreshDefaultActivitiesGrid');
    };
});

// Service that provides products operations
app.factory('trainingsService', function ($resource) {
    return $resource('api/trainings/:id');
});

//Service that provides products Types operations
app.factory('bodyPartsService', function ($resource) {
	return $resource('api/bodyparts/:id');
});

//Service that provides exercises operations
app.factory('exercisesService', function ($resource) {
	return $resource('api/exercises/:id');
});

//Service that provides products Types operations
app.factory('activitiesService', function ($resource) {
	return $resource('api/activities/:id');
});

app.factory('userService', function ($resource) {
    return $resource('api/users/:username');
});

app.filter('appdate', function($filter) {
return function(input) {
    if (input == null) {
        return "";
    }
    var serrdate = input;
    var _date = $filter('date')(serrdate, 'MM dd yyyy');
    return _date.toUpperCase();
};});

app.filter('reverse', function() {
	  return function(input, uppercase) {
	    input = input || '';
	    var out = '';
	    for (var i = 0; i < input.length; i++) {
	      out = input.charAt(i) + out;
	    }
	    // conditional based on optional argument
	    if (uppercase) {
	      out = out.toUpperCase();
	    }
	    return out;
	  };
	});

