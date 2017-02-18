<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>

    <jsp:include page="/WEB-INF/fragment/head.jspf"></jsp:include>
    
   
  </head>
 
  <body>
    <jsp:include page="/WEB-INF/fragment/navbar.jspf"></jsp:include>
    <jsp:include page="/WEB-INF/fragment/menuMyTrainings.jspf"></jsp:include>
    <div class="container-fluid">
	     <!-- Specify a Angular controller script that binds Javascript variables to the grid.-->
		<div class="row">
	    	<jsp:include page="/WEB-INF/fragment/myTrainingsContents.jspf"></jsp:include>
	    </div>
	</div>
    
     <span class ="hidden" id="trainingType">100</span>
     
    <jsp:include page="/WEB-INF/fragment/footer.jspf"></jsp:include>
    <script src="script/training.js"></script>
  </body>
</html>