<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html ng-app="dziennik">
  <head>
    <title>Weekop</title>
    <jsp:include page="/WEB-INF/fragment/head.jspf"></jsp:include>
  </head>
 
  <body>
    <jsp:include page="/WEB-INF/fragment/navbar.jspf"></jsp:include>
      
<div class="container-fluid">
	     <!-- Specify a Angular controller script that binds Javascript variables to the grid.-->
	<div class="row">
		<div class="col-md-6 col-xs-12">
			<div class="grid" ng-controller="exercisesListController">
			    <div>
			        <h3>List Exercises</h3>
			    </div>
			    
			
			    <!-- Binds the grid component to be displayed. -->
			    <div class="gridStyle" ng-grid="gridOptions"></div>
			
			    <!--  Bind the pagination component to be displayed. -->
			    <pagination direction-links="true" boundary-links="true"
			                total-items="exercises.totalResults" items-per-page="exercises.pageSize"
			                ng-model="exercises.currentPage" ng-change="refreshGrid()">
			    </pagination>
			</div>
		</div>
		
		<div class="col-md-6 col-xs-12">
			<!-- Specify a Angular controller script that binds Javascript variables to the form.-->
			<div class="form" ng-controller="usersFormController">
			    <!-- Verify user, if there is no id present, that we are Adding a User -->
			    <div ng-if="exercises.id == null">
			        <h3>Add exercises</h3>
			    </div>
			    <!-- Otherwise it's an Edit -->
			    <div ng-if="exercises.id != null">
			        <h3>Edit exercises</h3>
			    </div>
			
			    <div>
			        <!-- Specify the function to be called on submit and disable HTML5 validation, since we're using Angular validation-->
			        <form name="exercisesForm" ng-submit="updateExercises()" novalidate>
			        <div class="row">
			
			            <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : exerciseForm.id.$invalid && exerciseForm.id.$dirty}">
			                <label for="id">Id:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : exerciseForm.id.$valid && exerciseForm.id.$dirty}"></span>
			
			                <input id="id" name="id" type="text" class="form-control" maxlength="50" disabled
			                       ng-model="exercise.id"
			                       required ng-minlength="2" ng-maxlength="50"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.username.$error.required && userForm.username.$dirty">Add id.</p>
			                <p class="help-block" ng-show="userForm.username.$error.minlength">Username must be at least 2 characters long.</p>
			                <p class="help-block" ng-show="userForm.username.$error.maxlength">Username cannot be longer than 50 characters.</p>
			            
			               </div>
			
			            <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : exerciseForm.name.$invalid && exerciseForm.name.$dirty}">
			                <label for="name">Name:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : exerciseForm.name.$valid && exerciseForm.name.$dirty}"></span>
			
			                <input id="name" name="name" type="name" class="form-control" maxlength="30"
			                       ng-model="exercise.name"
			                       required ng-minlength="5" ng-maxlength="30"/>
			
			                </div>
			            <div class="validation-messages col-md-12 col-xs-12">
			            	<!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="exerciseForm.name.$error.required && userForm.email.$dirty">Add email.</p>
			                <p class="help-block" ng-show="exerciseForm.name.$error.minlength">Email must be at least 5 characters long.</p>
			                <p class="help-block" ng-show="exerciseForm.name.$error.maxlength">Email cannot be longer than 100 characters.</p>
			            </div>
			
			            <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.firstName.$invalid && userForm.firstName.$dirty}">
			                <label for="firstName">First Name:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.firstName.$valid && userForm.firstName.$dirty}"></span>
			
			                <input id="firstName" name="firstName" type="text" class="form-control" maxlength="50"
			                       ng-model="user.firstName"
			                       required ng-minlength="5" ng-maxlength="30"/>
			
			                </div>
			            
			            <div class="validation-messages col-md-12 col-xs-12">
			            	<!-- Validation messages to be displayed on required and invalid. Type 'url' makes checks to a proper url format. -->
			                <p class="help-block" ng-show="userForm.firstName.$error.required && userForm.firstName.$dirty">Add First Name.</p>
			                <p class="help-block" ng-show="userForm.firstName.$error.minlength">First Name must be at least 5 characters long.</p>
			                <p class="help-block" ng-show="userForm.firstName.$error.maxlength">First Name cannot be longer than 100 characters.</p>
			                <p class="help-block" ng-show="userForm.firstName.$invalid && userForm.firstName.$dirty">Invalid firstName.</p>
			            
			            </div>
			            
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.lastName.$invalid && userForm.lastName.$dirty}">
			                <label for="lastName">Last Name:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.lastName.$valid && userForm.lastName.$dirty}"></span>
			
			                <input id="lastName" name="lastName" type="text" class="form-control" maxlength="50"
			                       ng-model="user.lastName"
			                       required ng-minlength="2" ng-maxlength="50"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.lastName.$error.required && userForm.lastName.$dirty">Add lastName.</p>
			                <p class="help-block" ng-show="userForm.lastName.$error.minlength">lastName must be at least 2 characters long.</p>
			                <p class="help-block" ng-show="userForm.lastName.$error.maxlength">lastName cannot be longer than 50 characters.</p>
			            
			               </div>
			               
			               <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.age.$invalid && userForm.age.$dirty}">
			                <label for="age">Age:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.age.$valid && userForm.age.$dirty}"></span>
			
			                <input id="age" name="age" type="number" class="form-control" maxlength="30"
			                       ng-model="user.age"
			                       required ng-minlength="1" ng-maxlength="10" ng-min="1"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.age.$error.required && userForm.age.$dirty">Add age.</p>
			                <p class="help-block" ng-show="userForm.age.$error.minlength">Age must be at least 2 characters long.</p>
			                <p class="help-block" ng-show="userForm.age.$error.maxlength">Age cannot be longer than 50 characters.</p>
			            	<p class="help-block" ng-show="userForm.age.$error.min">Age must be higher</p>
			               </div>
			               
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.gender.$invalid && userForm.type.$dirty}">
			                <label for="gender">Gender:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.gender.$valid && userForm.gender.$dirty}"></span>
			
			                <select class="selectList" 
			                		ng-model="user.gender" class="form-control" id="type" 	>
			                		<option>Male</option>
			                		<option>Female</option>
			                </select>
			            </div>
			            <div class="validation-messages col-md-12 col-xs-12">
			            	<!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.gender.$error.required && userForm.gender.$dirty">Add gender.</p>
			                <p class="help-block" ng-show="userForm.gender.$error.minlength">Gender must be at least 5 characters long.</p>
			                <p class="help-block" ng-show="userForm.gender.$error.maxlength">Gender cannot be longer than 30 characters.</p>
			            </div>
			            
			              
			               
			               
			               
			               
			
			            <!-- <div class="avatar" ng-if="person.imageUrl">
			                <img ng-src="{{person.imageUrl}}" width="400" height="250"/>
			            </div> -->
			
			            <!-- Form buttons. The 'Save' button is only enabled when the form is valid. -->
			            <div class="buttons">
			                <button type="button" class="btn btn-primary" ng-click="clearForm()">Clear</button>
			                <button type="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">Save</button>
			            </div>
			            </div>
			        </form>
			    </div>
			</div>
		</div>
	</div>
</div> 
     
    <jsp:include page="/WEB-INF/fragment/footer.jspf"></jsp:include>
	<script src="script/user.js"></script>
  </body>
</html>