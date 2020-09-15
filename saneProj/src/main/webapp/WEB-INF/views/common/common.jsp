<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="resources_path" value="${ctx}/resources"/>
<c:set var="css_path" value="${ctx}/resources/css"/>
<c:set var="images_path" value="${ctx}/resources/images"/>
<c:set var="js_core_path" value="${ctx}/resources/js/core"/>
<c:set var="js_path" value="${ctx}/resources/js"/>
<c:set var="libs_path" value="${ctx}/resources/libs"/>

<jsp:useBean id="now" class="java.util.Date" scope="request"/>
<script type="text/javascript">var ctx = "${pageContext.request.contextPath}"; var resUrl = "${resources_path}";</script>

<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />

<title>SANE ADMIN</title>

<link rel="shortcut icon" href="${resources_path}/images/favicon.ico">

<!-- Bootstrap Css -->
<link href="${css_path}/bootstrap.min.css" id="bootstrap-stylesheet" rel="stylesheet" type="text/css" />
<!-- Icons Css -->
<link href="${css_path}/icons.min.css" rel="stylesheet" type="text/css" />
<!-- App Css -->
<link href="${css_path}/app.min.css" id="app-stylesheet" rel="stylesheet" type="text/css" />
<!-- jquery -->
<script src="${libs_path}/jquery/jquery-3.5.1.min.js"></script>



