    <jsp:include page="/WEB-INF/fragment/head.jspf"></jsp:include>
</head>

<body>
	<jsp:include page="/WEB-INF/fragment/navbar.jspf"></jsp:include>
    
  <div class="jumbotron">
    <h1>Logowanie</h1><br/>
    <form action = "j_security_check" method="post" class="form-horizontal">
        <div class="form-group form-group-lg">
          <div class="col-xs-2 col-sm-2">
		  	<span class="input-group-addon" id="basic-addon1">Login:</span>
		  </div>
		  <div class="col-xs-12 col-sm-6">
		  	<input type="text" class="form-control" placeholder="Username" name="j_username" aria-describedby="basic-addon1">	
		  </div>
		</div>
		
		<div class="form-group form-group-lg">
          <div class="col-xs-2">
		  	<span class="input-group-addon" id="basic-addon1">Hasło:</span>
		  </div>
		  <div class="col-xs-12 col-sm-6">
		  	<input type="password" class="form-control" placeholder="Password" name="j_password" aria-describedby="basic-addon1">
		  </div>	
		</div>
		
		<div class="form-group form-group-lg">
			<div class="col-xs-1 col-sm-3"></div>
			<div class="col-xs-10 col-sm-6">
        		<input type="submit" class="btn btn-success col-xs-10 col-sm-6" value="LogIn">
        	</div>
        	<div class="col-xs-1 col-sm-3"></div>
        </div>
    </form>
  </div>
    <jsp:include page="/WEB-INF/fragment/footer.jspf"></jsp:include>
     
    
</body>
</html>