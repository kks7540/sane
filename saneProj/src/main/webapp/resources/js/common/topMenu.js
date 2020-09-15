
var topMenu = new function() {
	var that = this;
	that.init = function() {

		$('#btn_logout').click(function() {
			that.fn_logout();
		});
		$('#btn_main').click(function() {
			that.fn_main();
		});

	},
	that.fn_logout = function() {

		location.href = ctx + '/common/afterAdminLogout.do';

	},
	that.fn_main = function() {

		location.href = ctx + '/common/main.do';

	},
	//alert 창 확인 버튼
	that.fn_btnOk_alert = function(){
		var type = $('#alert_type').val();
		if(!isNull(type)){
			$("#"+type+"").focus();
			$('#modal_alert').modal('toggle');
		}else{
			$('#modal_alert').modal('toggle');
		}

	}
};