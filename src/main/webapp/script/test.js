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
						alert("tooo2");
						alert($scope.num);
						$scope.activity1.id = $scope.training.activities[1].id;
						alert("activity1.id");
						alert($scope.activity1.id);
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