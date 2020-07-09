
var login = new function() {
	var that = this;
	that.init = function() {
		// init script
		//로그인 버튼
		$('#btn_login').click(function() {
			that.login();
		});
		//alert 창 확인 버튼
		$('#btnOk_alert').click(function() {
			that.fn_btnOk_alert();
		});

		$("#username").keyup(function(e){if(e.keyCode == 13)  that.login(); });
		$("#pass").keyup(function(e){if(e.keyCode == 13)  that.login(); });
	},
	that.login = function() {

		//id 검사
		if(!$.trim($("#username").val())) {
 			$('#alert_title').text("로그인 실패");
			$('#alert_message').text("아이디를 입력해 주세요.");
			$('#alert_type').val("username");
			$('#modal_alert').modal();
			return;
		}//비밀번호 검사
		if(!$.trim($("#pass").val())) {
 			$('#alert_title').text("로그인 실패");
			$('#alert_message').text("비밀번호를 입력해 주세요.");
			$('#alert_type').val("pass");
			$('#modal_alert').modal();
			return;
		}
		if($('input:checkbox[id="ckb1"]').is(":checked")){
			$('input[id="ckb1"]').val('Y');
		}else{
			$('input[id="ckb1"]').val('N');
		}

		$('#login_form').attr('method', 'post');
		$('#login_form').attr('action', ctx + '/common/afterAdminLogin.do');
		$('#login_form').submit();
		//로그인 유효성 검사.
/*		$.ajax ({
			url : ctx +"/login/loginValChk.ajax",
			type : "post",
			dataType : "json",
			data : {id : $("#username").val() , pwd : $("#pass").val() ,chk : $("#ckb1").val()},
			error : function() {
	 			$('#alert_title').text("로그인 실패");
				$('#alert_message').text("현재 조회 서비스가 원할하지 않습니다.\n 잠시후 다시 이용해 주십시요.");
				$('#alert_type').val("username");
				return;
			},
			success: function(r) {
				if(r.result=="false"){
		 			$('#alert_title').text("로그인 실패");
					$('#alert_message').text(r.message);
					$('#alert_type').val("username");
					$('#modal_alert').modal();
				}else if(r.result=="true"){
					$('#loginForm').attr('method', 'post');
					$('#loginForm').attr('action', ctx + '/login/afterAdminLogin.do');
					$('#loginForm').submit();
				}
			}
		});*/
	},
	//alert 창 확인 버튼
	that.fn_btnOk_alert = function(){
		var type = $('#alert_type').val();
		$("#"+type+"").focus();
		$('#modal_alert').modal('toggle');
	}

};
