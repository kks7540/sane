<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>SANE 공간</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<%@ include file="/WEB-INF/views/common/common.jsp"%>
</head>
<style>
.container-login100 {
  background: url(resources/images/bg-16.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
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

		/*register - hover*/
		$('#ra').hover(function() {
		  $(this).css("color", "#57b846")
		  		 .css("text-decoration", "underline");
		}, function(){
			$(this).css("color", "#808080")
	  		 .css("text-decoration", "none");
		});
		/*forgot password - hover*/
		$('#fp').hover(function() {
			  $(this).css("color", "#57b846")
			  		 .css("text-decoration", "underline");
			}, function(){
				$(this).css("color", "#808080")
		  		 .css("text-decoration", "none");
			});

		var id = "<%=userId%>";
		if(id==null||id==""){
			$('input:checkbox[id="chk"]').prop("checked", false);
		}else{
			$('input:checkbox[id="chk"]').prop("checked", true);
		}

	});

	/*register an Account*/
	function fn_register(){
		alert("계정등록");

	}
	/*forgot password*/
	function fn_forgot_password(){
		alert("패스워드찾기");

	}
	/*login*/
	function login(){


	}
</script>
<body >
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-form-title" style="background-image: url(resources/images/bg-01.jpg);">
					<span class="login100-form-title-1">
						Login to continue
					</span>
				</div>

				<form class="login100-form validate-form">
					<div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
						<span class="label-input100">UserID</span>
						<input class="input100" type="text" name="username" placeholder="Enter username" autocomplete="off">
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
						<span class="label-input100">Password</span>
						<input class="input100" type="password" name="pass" placeholder="Enter password" autocomplete="off">
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
						<button class="login100-form-btn w-full text-right" id="btn_login" onclick="login()">
							Login
						</button>
					</div>
					<div class="w-full text-right">
			          <p id="ra" class="d-block small mt-3 txt1" onclick="fn_register()" style="cursor:pointer; color:#808080;">Register an Account</p>
			          <p id="fp" class="d-block small txt1" onclick="fn_forgot_password()" style="cursor:pointer; color:#808080;">Forgot Password?</p>
			        </div>
				</form>

			</div>
		</div>
	</div>

</body>
</html>