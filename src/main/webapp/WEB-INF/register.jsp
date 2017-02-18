
    <jsp:include page="/WEB-INF/fragment/head.jspf"></jsp:include>
</head>

<body>
	<jsp:include page="/WEB-INF/fragment/navbar.jspf"></jsp:include>
    
  
    <!-- Specify a Angular controller script that binds Javascript variables to the form.-->
			<div class="form jumbotron" ng-controller="usersFormController">
			 <div class="col-md-5 col-xs-12">
			    <!-- Verify user, if there is no id present, that we are Adding a User -->
			    <div ng-if="user.id == null">
			        <h3>Rejestracja</h3>
			    </div>
			    <!-- Otherwise it's an Edit -->
			    <div ng-if="user.id != null">
			        <h3>Rejestracja</h3>
			    </div>
			
			    <div>
			        <!-- Specify the function to be called on submit and disable HTML5 validation, since we're using Angular validation-->
			        <form name="userForm" ng-submit="updateUser()" novalidate>
			        <div class="row">
			
			            <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.username.$invalid && userForm.username.$dirty}">
			                <label for="username" >Login:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.username.$valid && userForm.username.$dirty}"></span>
			
			                <input id="username" name="username" type="text" class="form-control" maxlength="50" ng-disabled="user.id != null"
			                       ng-model="user.username"
			                       required ng-minlength="2" ng-maxlength="50"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.username.$error.required && userForm.username.$dirty">Wpisz login.</p>
			                <p class="help-block" ng-show="userForm.username.$error.minlength">Login musi posiadać co najmniej 2 znaki.</p>
			                <p class="help-block" ng-show="userForm.username.$error.maxlength">Login nie mo</p>
			            
			               </div>
			
			            <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.email.$invalid && userForm.email.$dirty}">
			                <label for="email">Email:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.email.$valid && userForm.email.$dirty}"></span>
			
			                <input id="email" name="email" type="email" class="form-control" maxlength="30"
			                       ng-model="user.email"
			                       required ng-minlength="5" ng-maxlength="30"/>
			
			                </div>
			            <div class="validation-messages col-md-12 col-xs-12">
			            	<!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.email.$error.required && userForm.email.$dirty">Dodaj email.</p>
			                <p class="help-block" ng-show="userForm.email.$error.minlength">Email musi się składać co najmniej z 5 znaków.</p>
			                <p class="help-block" ng-show="userForm.email.$error.maxlength">Email cannot be longer than 100 characters.</p>
			            </div>
			
			            <!-- Display an error if the input is invalid and is dirty (only when someone changes the value) -->
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.firstName.$invalid && userForm.firstName.$dirty}">
			                <label for="firstName">Imię:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.firstName.$valid && userForm.firstName.$dirty}"></span>
			
			                <input id="firstName" name="firstName" type="text" class="form-control" maxlength="50"
			                       ng-model="user.firstName"
			                       required ng-minlength="2" ng-maxlength="30"/>
			
			                </div>
			            
			            <div class="validation-messages col-md-12 col-xs-12">
			            	<!-- Validation messages to be displayed on required and invalid. Type 'url' makes checks to a proper url format. -->
			                <p class="help-block" ng-show="userForm.firstName.$error.required && userForm.firstName.$dirty">Dodaj imię.</p>
			                <p class="help-block" ng-show="userForm.firstName.$error.minlength">Imię musi się skłądać przynajmniej z 2 znaków.</p>
			                <p class="help-block" ng-show="userForm.firstName.$error.maxlength">First Name cannot be longer than 100 characters.</p>
			                <p class="help-block" ng-show="userForm.firstName.$invalid && userForm.firstName.$dirty">Nie podano imienia.</p>
			            
			            </div>
			            
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.lastName.$invalid && userForm.lastName.$dirty}">
			                <label for="lastName">Nazwisko:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.lastName.$valid && userForm.lastName.$dirty}"></span>
			
			                <input id="lastName" name="lastName" type="text" class="form-control" maxlength="50"
			                       ng-model="user.lastName"
			                       required ng-minlength="2" ng-maxlength="50"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.lastName.$error.required && userForm.lastName.$dirty">Dodaj nazwisko.</p>
			                <p class="help-block" ng-show="userForm.lastName.$error.minlength">Nazwisko musi składać się co najmniej z 2 znaków..</p>
			                <p class="help-block" ng-show="userForm.lastName.$error.maxlength">lastName cannot be longer than 50 characters.</p>
			            
			               </div>
			               
			               <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.age.$invalid && userForm.age.$dirty}">
			                <label for="age">Wiek:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.age.$valid && userForm.age.$dirty}"></span>
			
			                <input id="age" name="age" type="number" class="form-control" maxlength="30"
			                       ng-model="user.age"
			                       required ng-minlength="1" ng-maxlength="10" ng-min="1"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.age.$error.required && userForm.age.$dirty">Dodaj wiek.</p>
			                <p class="help-block" ng-show="userForm.age.$error.minlength">Age must be at least 2 characters long.</p>
			                <p class="help-block" ng-show="userForm.age.$error.maxlength">Age cannot be longer than 50 characters.</p>
			            	<p class="help-block" ng-show="userForm.age.$error.min">Wiek musi być większy od 0.</p>
			               </div>
			               
			            <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.gender.$invalid && userForm.type.$dirty}">
			                <label for="gender">Płeć:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.gender.$valid && userForm.gender.$dirty}"></span>
			
			                <select class="selectList" 
			                		ng-model="user.gender" class="form-control" id="type" 	>
			                		<option>Mężczyzna</option>
			                		<option>Kobieta</option>
			                </select>
			            </div>
			            <div class="validation-messages col-md-12 col-xs-12">
			            	<!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.gender.$error.required && userForm.gender.$dirty">Wybierz płeć.</p>
			             </div>
			            
			            
			            
			               
			              <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.password.$invalid && userForm.password.$dirty}">
			                <label for="password">Hasło:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.password.$valid && userForm.password.$dirty}"></span>
			
			                <input id="password" name="password" type="password" class="form-control" maxlength="50"
			                       ng-model="user.password"
			                       required ng-minlength="2" ng-maxlength="50"/>
			
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.password.$error.required && userForm.password.$dirty">Podaj hasło.</p>
			                <p class="help-block" ng-show="userForm.password.$error.minlength">Password must be at least 2 characters long.</p>
			                <p class="help-block" ng-show="userForm.password.$error.maxlength">Password cannot be longer than 50 characters.</p>
			               </div>
			               
			               <div class="form-group col-md-12 col-xs-12" ng-class="{'has-error' : userForm.confirmPassword.$invalid && userForm.confirmPassword.$dirty}">
			                <label for="password">Powtórz hasło:</label>
			                <!-- Display a check when the field is valid and was modified -->
			                <span ng-class="{'glyphicon glyphicon-ok' : userForm.confirmPassword.$valid && userForm.confirmPassword.$dirty}"></span>
			
			                <input id="password" name="confirmPassword" type="password" class="form-control" maxlength="50"
			                       ng-model="confirmPassword"
			                       compare-to="user.password"
			                       required ng-minlength="2" ng-maxlength="50"/>
			               </div>
			               <div class="validation-messages col-md-12 col-xs-12">
			               	 <!-- Validation messages to be displayed on required, minlength and maxlength -->
			                <p class="help-block" ng-show="userForm.confirmPassword.$error.required && userForm.confirmPassword.$dirty">Powtórz hasło.</p>
			                <p class="help-block" ng-show="userForm.confirmPassword.$error.compare-to">Niezgodność haseł!</p>
			                
			               </div>
			               
			               
			
			            <!-- <div class="avatar" ng-if="person.imageUrl">
			                <img ng-src="{{person.imageUrl}}" width="400" height="250"/>
			            </div> -->
			
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
 
    <jsp:include page="/WEB-INF/fragment/footer.jspf"></jsp:include>
     <script src="script/user.js"></script>
    
</body>
</html>