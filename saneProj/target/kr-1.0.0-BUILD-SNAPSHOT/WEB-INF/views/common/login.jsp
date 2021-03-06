<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="ko">
<style>
.container-login100 {
  background: url(${resources_path}/images/bg-16.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
<head>
<title>SANE 공간</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<%@ include file="/WEB-INF/views/common/common.jsp"%>
<!-- page script -->
<script type="text/javascript" src="${custom_js_path}/login/loginForm.js"></script>
<!-- page script -->
<!-- page script -->
<%
	Cookie[] cookie = request.getCookies();
	String userId = "";
	if(cookie != null){
		for(int i = 0; i<cookie.length;i++){
			if(cookie[i].getName().trim().equals("userId")){
				userId = cookie[i].getValue();
			}
		}
	}
%>
<script type="text/javascript">

	$( document ).ready( function() {
		login.init();
		var id = "<%=userId%>";

		if(id==null||id==""){
			$('input:checkbox[id="ckb1"]').prop("checked", false);
		}else{
			$('input:checkbox[id="ckb1"]').prop("checked", true);
		}

	});

</script>
</head>

<body >
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-form-title" style="background-image: url(${resources_path}/images/bg-01.jpg);">
					<span class="login100-form-title-1">
						Login to continue TEST!!
					</span>
				</div>

				<form class="login100-form validate-form" id="login_form">
					<div class="wrap-input100 validate-input m-b-26" data-validate="UserId is required">
						<span class="label-input100">UserId</span>
						<input class="input100" type="text" name="UserId" id="UserId" placeholder="Enter UserID" autocomplete="off" value="<%=userId%>">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate = "userPwdword is required">
						<span class="label-input100">password</span>
						<input class="input100" type="password" name="userPwd" id="userPwd" placeholder="Enter password" autocomplete="off">
						<span class="focus-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-b-30">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
							<label class="label-checkbox100" for="ckb1">
								Remember ID
							</label>
						</div>
					</div>
					<div class="w-full text-right">
						<button class="login100-form-btn w-full text-right" id="btn_login">
							Login
						</button>
					</div>
					<div class="w-full text-right">
			          <p id="register" class="d-block small mt-3 txt1" style="cursor:pointer; color:#808080;">Register an Account</p>
			          <p id="losspwd" class="d-block small txt1" style="cursor:pointer; color:#808080;">Forgot password?</p>
			        </div>
				</form>
			</div>
		</div>
	</div>
	<!-- alert modal -->
	<div id="modal_alert" class="modal fade" data-backdrop="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h5 class="modal-title" id="alert_title"></h5>
				</div>
				<div class="modal-body" id="alert_message">
				</div>
				<input type="hidden" id="alert_type"/>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="btnOk_alert">확인</button>
					<!-- <button type="button" class="btn btn-link" data-dismiss="modal">취소</button> -->
					<!--<button type="button" class="btn btn-default" id="btnCancel">취소</button>-->
				</div>
			</div>
		</div>
	</div>
	<!-- /alert modal -->
</body>
</html>