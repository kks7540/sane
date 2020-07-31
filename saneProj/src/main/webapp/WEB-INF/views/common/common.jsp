<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="resources_path" value="${ctx}/resources"/>
<c:set var="images_path" value="${resources_path}/images"/>
<c:set var="custom_js_path" value="${resources_path}/js"/>

<jsp:useBean id="now" class="java.util.Date" scope="request"/>
<script type="text/javascript">var ctx = "${pageContext.request.contextPath}"; var resUrl = "${resources_path}";</script>

<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />

<title>SANE ADMIN</title>

<!--===============================================================================================-->
	<script src="${resources_path}/sb/jquery/jquery-3.2.1.min.js"></script>
	<script src="${resources_path}/sb/countdowntime/countdowntime.js"></script>
	<script src="${resources_path}/sb/daterangepicker/moment.min.js"></script>
	<link rel="stylesheet" type="text/css" href="${resources_path}/sb/daterangepicker/daterangepicker.css">
	<script src="${resources_path}/sb/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->

<!-- SB [ .js ] =================================================================================================-->
<%-- 	<script src="${resources_path}/sb/assets/demo/chart-area-demo.js"></script>
	<script src="${resources_path}/sb/assets/demo/chart-bar-demo.js"></script>
	<script src="${resources_path}/sb/assets/demo/chart-pie-demo.js"></script>
	<script src="${resources_path}/sb/assets/demo/datatables-demo.js"></script> --%>
	<script src="${resources_path}/sb/js/scripts.js"></script>
<!--=============================================================================================================-->

<!-- MAIN [ .css ] ==============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/css/custom.css">
	<link rel="stylesheet" type="text/css" href="${resources_path}/css/util.css">
	<link rel="stylesheet" type="text/css" href="${resources_path}/css/main.css">
	<script src="${resources_path}/js/main.js"></script>
<!-- MAIN [ .css ] ==============================================================================================-->



<!-- SB [ .css ] ================================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/sb/css/styles.css">
<!--=============================================================================================================-->

<!-- SB [ link ] ================================================================================================-->
     <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
     <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js" crossorigin="anonymous"></script>
<!--      <script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script> -->
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
     <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
     <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
<!--=============================================================================================================-->



<!-- Global stylesheets -->
<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
<!-- /global stylesheets -->


<%-- <!--===============================================================================================-->
	<link rel="icon" type="image/png" href="${resources_path}/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/vendor/animate/animate.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${resources_path}/vendor/select2/select2.min.css">
<!--===============================================================================================-->

<!--===============================================================================================--> --%>


<!--===============================================================================================-->
<!--===============================================================================================-->

<%-- <!--===============================================================================================-->
	<script src="${resources_path}/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="${resources_path}/vendor/bootstrap/js/popper.js"></script>
	<script src="${resources_path}/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================--> --%>

<%-- <link href="${custom_img_path}/favicon.ico" rel="apple-touch-icon" type="image/png" sizes="144x144">
<link href="${custom_img_path}/favicon.ico" rel="apple-touch-icon" type="image/png" sizes="114x114">
<link href="${custom_img_path}/favicon.ico" rel="apple-touch-icon" type="image/png" sizes="72x72">
<link href="${custom_img_path}/favicon.ico" rel="apple-touch-icon" type="image/png">
<link href="${custom_img_path}/favicon.ico" rel="icon" type="image/png">
<link href="${custom_img_path}/favicon.ico" rel="shortcut icon"> --%>

<!--===============================================================================================-->







