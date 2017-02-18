<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>

    <jsp:include page="/WEB-INF/fragment/head.jspf"></jsp:include>
    
   
  </head>
 
  <body>
    <jsp:include page="/WEB-INF/fragment/navbar.jspf"></jsp:include>
    
     <div class="message" ng-controller="alertMessagesController">
	     <c:if test="${cookie.get('login').value eq 'true'}">
	     	<alert type="success">Zalogowałeś się.</alert>
	     </c:if>
	     
	     
	     <c:if test="${cookie.get('logout').value eq 'true'}">
	     	<alert type="success">Bezpiecznie wylogowałeś się z systemu.</alert>
	     </c:if>
     </div>
     
    <jsp:include page="/WEB-INF/fragment/footer.jspf"></jsp:include>
  </body>
</html>