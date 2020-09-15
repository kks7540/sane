
var login = new function() {
	var that = this;
	that.init = function() {

		//로그인 버튼
		$('#btn_login').click(function() {
			that.login();
		});

		$('#register').click(function() {
/* 			$('#alert_title').text("사용자 등록");
			$('#alert_message').text("관리자에게 문의 주세요. ( ksks17@naver.com )");
			$('#alert_type').val("userId");
			$('#modal_alert').modal();*/

		});
		$('#losspwd').click(function() {
/* 			$('#alert_title').text("비밀번호 찾기");
			$('#alert_message').text("관리자에게 문의 주세요. ( ksks17@naver.com )");
			$('#alert_type').val("userId");
			$('#modal_alert').modal();*/

		});
		//alert 창 확인 버튼
		$('#btnOk_alert').click(function() {
			that.fn_btnOk_alert();
		});

		$("#userId").keyup(function(e){if(e.keyCode == 13)  that.login(); });
		$("#userPwd").keyup(function(e){if(e.keyCode == 13)  that.login(); });

		/*register - hover*/
		$('#register').hover(function() {
		  $(this).css("color", "#57b846")
		  		 .css("text-decoration", "underline");
		}, function(){
			$(this).css("color", "#808080")
	  		 .css("text-decoration", "none");
		});
		/*forgot userPwdword - hover*/
		$('#losspwd').hover(function() {
			  $(this).css("color", "#57b846")
			  		 .css("text-decoration", "underline");
			}, function(){
				$(this).css("color", "#808080")
		  		 .css("text-decoration", "none");
			});

	},
	that.login = function() {

/*		//id 검사
		if(!$.trim($("#userId").val())) {
 			$('#alert_title').text("로그인 실패");
			$('#alert_message').text("UserID를 입력 해 주세요.");
			$('#alert_type').val("userId");
			$('#modal_alert').modal();
			return;
		}
		//비밀번호 검사
		if(!$.trim($("#userPwd").val())) {
 			$('#alert_title').text("로그인 실패");
			$('#alert_message').text("password를 입력 해 주세요.");
			$('#alert_type').val("userPwd");
			$('#modal_alert').modal();
			return;
		}*/
		if($('input:checkbox[id="ckb1"]').is(":checked")){
			$('input[id="ckb1"]').val('Y');
		}else{
			$('input[id="ckb1"]').val('N');
		}

		//로그인 유효성 검사.
		$.ajax ({
			url : ctx +"/common/loginValChk.do",
			type : "post",
			dataType : "json",
			data : {userId : $("#userId").val() , userPwd : $("#userPwd").val() ,ckb1 : $("#ckb1").val()},
			error : function() {
/*	 			$('#alert_title').text("로그인 에러");
				$('#alert_message').text("현재 조회 서비스가 원할하지 않습니다.\n 잠시후 다시 이용해 주십시요.");
				$('#alert_type').val("userId");*/
				return;
			},
			success: function(r) {

				if(r.result=="false"){

/*		 			$('#alert_title').text("로그인 실패");
					$('#alert_message').text("가입하지 않은 회원이거나, 잘못된 비밀번호입니다.");
					$('#alert_type').val("userId");
					$('#modal_alert').modal();*/

				}else if(r.result=="true"){

					$('#loginForm').attr('method', 'post');
					$('#loginForm').attr('action', ctx + "/common/afterAdminLogin.do");
					$('#loginForm').submit();
				}
			}
		});
	}
/*	//alert 창 확인 버튼
	that.fn_btnOk_alert = function(){
		var type = $('#alert_type').val();
		$("#"+type+"").focus();
		$('#modal_alert').modal('toggle');
	}*/

};
