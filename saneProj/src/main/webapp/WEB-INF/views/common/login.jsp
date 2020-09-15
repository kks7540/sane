<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8" />
        <title>Log in | Adminto - Responsive Bootstrap 4 Admin Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
        <meta content="Coderthemes" name="author" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<!-- page script -->
		<%@ include file="/WEB-INF/views/common/common.jsp"%>
		<script type="text/javascript" src="${js_path}/login/loginForm.js"></script>
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

    <body class="authentication-bg">

        <div class="account-pages mt-5 mb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="text-center">
                            <a href="${ctx}/common/login.do" class="logo">
                                <img src="${images_path}/logo-light.png" alt="" height="22" class="logo-light mx-auto">
                               <img src="${images_path}/logo-dark.png" alt="" height="22" class="logo-dark mx-auto">
                            </a>
                            <p class="text-muted mt-2 mb-4">Responsive Admin Dashboard</p>
                        </div>
                        <div class="card">

                            <div class="card-body p-4">

                                <div class="text-center mb-4">
                                    <h4 class="text-uppercase mt-0">Sign In</h4>
                                </div>

                                <form id="loginForm">

                                    <div class="form-group mb-3">
                                        <label for="btn_login">Email address</label>
                                        <input class="form-control" type="edit" id="userId" required="" placeholder="Enter your ID">
                                    </div>

                                    <div class="form-group mb-3">
                                        <label for="password">Password</label>
                                        <input class="form-control" type="password" required="" id="userPwd" placeholder="Enter your Password">
                                    </div>

                                    <div class="form-group mb-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="ckb1" checked>
                                            <label class="custom-control-label" for="ckb1">Remember ID</label>
                                        </div>
                                    </div>

                                    <div class="form-group mb-0 text-center">
                                        <!-- <button class="btn btn-primary btn-block" type="submit"> Log In </button> -->
                                        <input type="button" class="btn btn-primary btn-block" id="btn_login" value ="login">
                                    </div>

                                </form>

                            </div> <!-- end card-body -->
                        </div>
                        <!-- end card -->

                        <div class="row mt-3">
                            <div class="col-12 text-center">
                                <p> <a id="losspwd" style="cursor:pointer; color:#808080;" href="pages-recoverpw.html" class="text-muted ml-1"><i class="fa fa-lock mr-1"></i>Forgot your password?</a></p>
                                <p class="text-muted">Don't have an account? <a id="register" style="cursor:pointer; color:#808080;" href="pages-register.html" class="text-dark ml-1"><b>Sign Up</b></a></p>
                            </div> <!-- end col -->
                        </div>
                        <!-- end row -->

                    </div> <!-- end col -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end page -->


        <!-- Vendor js -->
        <script src="${js_core_path}/vendor.min.js"></script>

        <!-- App js -->
        <script src="${js_core_path}/app.min.js"></script>

    </body>
</html>