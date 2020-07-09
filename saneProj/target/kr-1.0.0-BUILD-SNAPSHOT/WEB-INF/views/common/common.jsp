<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="resources_path" value="${ctx}/WEB_INF/resources"/>
<c:set var="images_path" value="${resources_path}/images"/>
<c:set var="assets_css_path" value="${resources_path}/assets/css"/>
<c:set var="assets_img_path" value="${resources_path}/assets/images"/>

<c:set var="custom_js_path" value="${resources_path}/js"/>
<c:set var="custom_css_path" value="${resources_path}/css"/>
<c:set var="custom_img_path" value="${resources_path}/images"/>

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
	<link rel="icon" type="image/png" href="${images_path}/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/vendor/animate/animate.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="resources/css/util.css">
	<link rel="stylesheet" type="text/css" href="resources/css/main.css">
<!--===============================================================================================-->
<!--===============================================================================================-->
	<script src="resources/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="resources/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="resources/vendor/bootstrap/js/popper.js"></script>
	<script src="resources/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
<!--===============================================================================================-->
	<script src="resources/vendor/daterangepicker/moment.min.js"></script>
	<script src="resources/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="resources/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->



<link href="${custom_img_path }/favicon.ico" rel="apple-touch-icon" type="image/png" sizes="144x144">
<link href="${custom_img_path }/favicon.ico" rel="apple-touch-icon" type="image/png" sizes="114x114">
<link href="${custom_img_path }/favicon.ico" rel="apple-touch-icon" type="image/png" sizes="72x72">
<link href="${custom_img_path }/favicon.ico" rel="apple-touch-icon" type="image/png">
<link href="${custom_img_path }/favicon.ico" rel="icon" type="image/png">
<link href="${custom_img_path }/favicon.ico" rel="shortcut icon">

<!-- Global stylesheets -->
<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
<link href="${assets_css_path }/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
<link href="${assets_css_path }/bootstrap.css" rel="stylesheet" type="text/css">
<link href="${assets_css_path }/core.css" rel="stylesheet" type="text/css">
<link href="${assets_css_path }/components.css" rel="stylesheet" type="text/css">
<link href="${assets_css_path }/colors.css" rel="stylesheet" type="text/css">
<link href="${custom_css_path }/custom.css" rel="stylesheet" type="text/css">
<!-- /global stylesheets -->

<!-- Core JS files -->
<script type="text/javascript" src="${assets_js_path }/plugins/loaders/pace.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/core/libraries/jquery.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/core/libraries/bootstrap.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/loaders/blockui.min.js"></script>

<!-- /core JS files -->

<!-- Theme JS files -->
<script type="text/javascript" src="${assets_js_path }/core/app.js"></script>
<script type="text/javascript" src="${custom_js_path }/common/leftMenu.js"></script>

<script type="text/javascript" src="${assets_js_path }/plugins/loaders/blockui.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/tables/datatables/datatables.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/forms/selects/select2.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/notifications/jgrowl.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/ui/moment/moment.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/pickers/daterangepicker.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/pickers/anytime.min.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/pickers/pickadate/picker.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/pickers/pickadate/picker.date.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/pickers/pickadate/picker.time.js"></script>
<script type="text/javascript" src="${assets_js_path }/plugins/pickers/pickadate/legacy.js"></script>
<script type="text/javascript" src="${assets_js_path }/pages/picker_date.js"></script>
<script type="text/javascript" src="${assets_js_path }/pages/datatables_basic.js"></script>

<!-- /theme JS files -->