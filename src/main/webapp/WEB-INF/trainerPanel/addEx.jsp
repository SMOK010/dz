<div class="col-md-8 col-sm-8 col-xs-12">
			<!-- Specify a Angular controller script that binds Javascript variables to the form.-->
			<div class="form" ng-controller="exercisesFormController">
			    <!-- Verify product, if there is no id present, that we are Adding a product -->
			    <h1>Dodaj ćwiczenie</h1>
			
			    <div>
			        <!-- Specify the function to be called on submit and disable HTML5 validation, since we're using Angular validation-->
			        <form name="exercisesForm" ng-submit="updateExercise()" novalidate id="addExerciseForm">
			        <div class="row">
			               
			               <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : exercisesForm.name.$invalid && exercisesForm.name.$dirty}">
			                <label for="name">nazwa:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : exercisesForm.name.$valid && exercisesForm.name.$dirty}"></span>
			
			                <textarea id="name" name="name" type="text" class="form-control" maxlength="250" 
			                       ng-model="exercise.name"
			                       ng-minlength="2" ng-maxlength="30"></textarea>
			
			            </div>
		                <div class="validation-messages col-md-12 col-xs-12">
		               	  <!-- Validation messages to be displayed on required, minlength and maxlength -->
		                 <p class="help-block" ng-show="exercisesForm.name.$error.required">Dodaj nazwę ćwiczenia.</p>
		                 <p class="help-block" ng-show="exercisesForm.name.$error.minlength">Nazwa musi się skłądać co najmniej z 2 znaków.</p>
		                 <p class="help-block" ng-show="exercisesForm.name.$error.maxlength">Długość nazwy nie może być dłuższa niż 30 znaków.</p>
		                </div>
		               
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : exercisesForm.type.$invalid && exercisesForm.type.$dirty}">
			                <label for="type">Typ:</label>
			
			                <select class="selectList" ng-options="v for (k,v) in options"
			                		ng-model="exercise.type" id="type" >
			                </select>
		                </div>
			               
			               
			            <section ng-controller="bodyPartsController">
			            	<div class="form-group col-md-12 col-xs-12">
				                <label for="bodyPart">Partia:</label>
				
				                <select class="selectList" ng-options="item as item.name for item in bodyParts" 
				                		ng-model="bodyPart" ng-change="changeBodyPart(bodyPart)" id="bodyPart" 
				                		ng-init="loadBodyPartsOptions()" >
				                </select>
			                </div>
			                
			                
			                
			                <div class= "row buttons" >
								<button  type="button" class="btn btn-default col-md-8 col-md-offset-1" id="addMoreExerciseButton" ng-click="addNextExerciseCl()"  >Zapisz partie</button>
								<button type="button" class="btn btn-primary col-md-8 col-md-offset-1" ng-click="updateTraining2()">Zapisz</button>
							</div>
							</section>
			                
			            </div>
			            
			            <jsp:include page="/WEB-INF/fragment/moreExercisesContents.jspf"></jsp:include>
			            
			           
			        </form>
				</div> 
			</div>
</div>
			       