<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html ng-app="dziennik">
  <head>
    <title>Użytkownicy</title>
    <jsp:include page="/WEB-INF/fragment/head.jspf"></jsp:include>
  </head>
 
  <body>
    <jsp:include page="/WEB-INF/fragment/navbar.jspf"></jsp:include>
      
<div class="container-fluid">
	     <!-- Specify a Angular controller script that binds Javascript variables to the grid.-->
	<div class="row">
		<div class="col-md-6 col-xs-12">
			<div class="grid" ng-controller="usersListController">
			    <div>
			        <h3>Lista użytkowników</h3>
			    </div>
			    
			
			    <!-- Binds the grid component to be displayed. -->
			    <div class="gridStyle" ng-grid="gridOptions"></div>
			
			    <!--  Bind the pagination component to be displayed. -->
			    <pagination direction-links="true" boundary-links="true"
			                total-items="users.totalResults" items-per-page="users.pageSize"
			                ng-model="users.currentPage" ng-change="refreshGrid()">
			    </pagination>
			</div>
		</div>
		
		<div class="col-md-6 col-xs-12">
			<!-- Specify a Angular controller script that binds Javascript variables to the form.-->
			<div class="form" ng-controller="usersFormController">
			    <!-- Verify user, if there is no id present, that we are Adding a User -->
			    <div >
			        <h3>Rejestracja użytkownika</h3>
			    </div>
			
			    <div>
			        <!-- Specify the function to be called on submit and disable HTML5 validation, since we're using Angular validation-->
			        <form name="userForm" ng-submit="updateRegisterUser()" novalidate>
			        <div class="row">
			
			            <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.name.$invalid && userForm.name.$dirty}">
			                <label for="username">Username:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.username.$valid && userForm.username.$dirty}"></span>
			
			                <input id="username" name="username" type="text" class="form-control" maxlength="50" ng-disabled="true"
			                       ng-model="user.username"
			                       required ng-minlength="2" ng-maxlength="50"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.username.$error.required && userForm.username.$dirty">Add Username.</p>
			                <p class="help-block" ng-show="userForm.username.$error.minlength">Username must be at least 2 characters long.</p>
			                <p class="help-block" ng-show="userForm.username.$error.maxlength">Username cannot be longer than 50 characters.</p>
			            
			               </div>
			
			            <!-- Form buttons. The 'Save' button is only enabled when the form is valid. -->
			            <div class="buttons">
			                <button type="button" class="btn btn-primary" ng-click="clearForm()">Wyczyść</button>
			                <button type="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">Zapisz</button>
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