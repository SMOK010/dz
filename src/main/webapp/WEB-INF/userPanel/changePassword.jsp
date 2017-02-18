
    <jsp:include page="/WEB-INF/fragment/head.jspf"></jsp:include>
</head>

<body>
	<jsp:include page="/WEB-INF/fragment/navbar.jspf"></jsp:include>
    
  
    <!-- Specify a Angular controller script that binds Javascript variables to the form.-->
			<div class="form jumbotron" ng-controller="usersFormController">
			 <div class="col-md-5 col-xs-12">
			    <!-- Verify user, if there is no id present, that we are Adding a User -->
			    <div ng-if="user.id == null">
			        <h3>Click on list</h3>
			    </div>
			    <!-- Otherwise it's an Edit -->
			    <div ng-if="user.id != null">
			        <h3>Change password</h3>
			    </div>
			
			    <div>
			        <!-- Specify the function to be called on submit and disable HTML5 validation, since we're using Angular validation-->
			        <form name="userForm" ng-submit="updateUser()" novalidate>
			        <div class="row">
			
			            <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.username.$invalid && userForm.username.$dirty}">
			                <label for="username" class="input-group-addon" id="basic-addon1">Username:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.username.$valid && userForm.username.$dirty}"></span>
			
			                <input id="username" name="username" type="text" class="form-control" maxlength="50" ng-disabled="user.id != null"
			                       ng-model="user.username"
			                       required ng-minlength="2" ng-maxlength="50"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.username.$error.required && userForm.username.$dirty">Add Username.</p>
			                <p class="help-block" ng-show="userForm.username.$error.minlength">Username must be at least 2 characters long.</p>
			                <p class="help-block" ng-show="userForm.username.$error.maxlength">Username cannot be longer than 50 characters.</p>
			            
			               </div>
			
			               
			              <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.password.$invalid && userForm.password.$dirty}">
			                <label for="password">Password:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.password.$valid && userForm.password.$dirty}"></span>
			
			                <input id="password" name="password" type="password" class="form-control" maxlength="50"
			                       ng-model="oldPass" disable
			                       required ng-minlength="2" ng-maxlength="50"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.password.$error.required && userForm.password.$dirty">Add password.</p>
			                <p class="help-block" ng-show="userForm.password.$error.minlength">Password must be at least 2 characters long.</p>
			                <p class="help-block" ng-show="userForm.password.$error.maxlength">Password cannot be longer than 50 characters.</p>
			               </div>
			               
			               <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.confirmPassword.$invalid && userForm.confirmPassword.$dirty}">
			                <label for="password">Old password:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.confirmPassword.$valid && userForm.confirmPassword.$dirty}"></span>
			
			                <input id="password" name="confirmPassword" type="password" class="form-control" maxlength="50"
			                       ng-model="confirmPassword"
			                       compare-to="user.password"
			                       required ng-minlength="2" ng-maxlength="50"/>
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.confirmPassword.$error.required && userForm.confirmPassword.$dirty">Add lastName.</p>
			                <p class="help-block" ng-show="userForm.confirmPassword.$error.compare-to">Bad repeat!</p>
			                
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
 
    <jsp:include page="/WEB-INF/fragment/footer.jspf"></jsp:include>
     <script src="script/user.js"></script>
    
</body>
</html>