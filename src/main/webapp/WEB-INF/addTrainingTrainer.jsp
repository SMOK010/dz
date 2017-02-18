<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>

    <jsp:include page="/WEB-INF/fragment/head.jspf"></jsp:include>
   
  </head>
 
  <body>
    <jsp:include page="/WEB-INF/fragment/navbar.jspf"></jsp:include>
    <div class="container-fluid">
	     <!-- Specify a Angular controller script that binds Javascript variables to the grid.-->
		<div class="row">
	    	<jsp:include page="/WEB-INF/fragment/addTrainingTrainerContents.jspf"></jsp:include>
	    </div>
	</div>
	
    <span class ="hidden" id="trainingType">1</span>
     
     
    <jsp:include page="/WEB-INF/fragment/footer.jspf"></jsp:include>
    <script src="script/trainingDefault.js"></script>
  </body>
</html>