var _selectMenu;
var leftMenu = new function() {
	var that = this;
	that.init = function() {

	},
	that.fn_mngr_saveMngrBtn = function() {
		// 이름 검사.
		if (!$.trim($("#mngr_name").val())) {
			$('#alert_title_leftMenu').text("관리자 정보 저장 실패");
			$('#alert_message_leftMenu').text("이름을 입력해 주세요.");
			$('#alert_type_leftMenu').val("mngr_name");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		// 소속 부서 검사.
		if (!$.trim($("#mngr_dept").val())) {
			$('#alert_title_leftMenu').text("관리자 정보 저장 실패");
			$('#alert_message_leftMenu').text("소속부서를 입력해 주세요.");
			$('#alert_type_leftMenu').val("mngr_dept");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		// 이메일 검사
		if (!$.trim($("#mngr_emailF").val())
				|| !$.trim($("#mngr_emailB").val())) {
			$('#alert_title_leftMenu').text("관리자 정보 저장 실패");
			$('#alert_message_leftMenu').text("이메일을 입력해 주세요.");
			$('#alert_type_leftMenu').val("mngr_emailF");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		// 이메일 유효성 검사.
		var email = $("#mngr_emailF").val() + "@"
				+ $("#mngr_emailB").val();
		eCheck = /^[_a-zA-Z0-9]+([-+.][_a-zA-Z0-9]+)*@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/i;
		var mail_check = eCheck.test(email);

		if (mail_check == false) {
			$('#alert_title_leftMenu').text("관리자 정보 저장 실패");
			$('#alert_message_leftMenu').text("이메일 도메인 형식이 잘못되었습니다.");
			$('#alert_type_leftMenu').val("mngr_emailB");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		// 연락처 유효성 검사
		var tel = $("#mngr_telF").val() + "-" + $("#mngr_telM").val()
				+ "-" + $("#mngr_telB").val();
		if (/[^-0123456789]/g.test(tel)) {
			$('#alert_title_leftMenu').text("관리자 정보 저장 실패");
			$('#alert_message_leftMenu').text("연락처는 숫자만 입력 가능합니다.");
			$('#alert_type_leftMenu').val("mngr_telF");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		// email,contr Hidden
		$('#mngr_email').val(email);
		$('#mngr_contr').val(tel);

		$('#url').val(window.location.pathname);

		$('#confirm_title_leftMenu').text("관리자 정보 저장");
		$('#confirm_message_leftMenu').text("저장하시겠습니까?");
		$('#confirm_type_leftMenu').val("mngr_saveMngrBtn");
		$('#modal_confirm_leftMenu').modal();
	},
	that.fn_mngr_closeMngrBtn = function() {
		$('#confirm_title_leftMenu').text("관리자 수정 화면");
		$('#confirm_message_leftMenu').text("작성 중인 내용이 사라집니다.\n 계속 진행하시겠습니까? ");
		$('#confirm_type_leftMenu').val("mngr_closeMngrBtn");
		$('#modal_confirm_leftMenu').modal();
	},
	that.fn_btnOk_confirm_mngr = function() {
		var type = $('#confirm_type_leftMenu').val();
		if (type == "mngr_saveMngrBtn") {
			$("#mngr_updateForm").submit();
			$('[type=text]').val('');
			$('[type=radio]:checked').prop('checked', false);
			$("#mngr_selectMailAddr").val("none").prop("selected", true);
		}
		if (type == "mngr_closeMngrBtn") {
			$('#modal_mngr_update').modal('toggle');
			$('#modal_confirm_leftMenu').modal('toggle');
		}
	},
	that.fn_btnCancel_confirm_mngr = function() {
		$('#modal_confirm_leftMenu').modal('toggle');
	},
	that.fn_btnOk_alert_mngr = function() {
		var type = $('#alert_type_leftMenu').val();
		$("#" + type + "").focus();
		$('#modal_alert_leftMenu').modal('toggle');
	},
	that.fn_pwdChangeBtn = function(){
		$('#modal_pwdChange').modal();
	},
	that.fn_pwdChangSaveBtn = function(){
		//현재 비밀번호 체크
		var pwdNow = $('#mngr_password').val();
		var pwdNowChk = $('#PwdTxt_now').val();
		var pwdNew = $('#pwdTxt_new').val();
		var pwdNewChk = $('#pwdTxt_newChk').val();

		if(pwdNowChk==null||pwdNowChk==""){
			$('#alert_title_leftMenu').text("비밀번호 일치 확인");
			$('#alert_message_leftMenu').text("현재 비밀번호 를 입력해 주세요.");
			$('#alert_type_leftMenu').val("PwdTxt_now");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		if(pwdNow!=pwdNowChk){
			$('#alert_title_leftMenu').text("비밀번호 일치 확인");
			$('#alert_message_leftMenu').text("현재 비밀번호가 올바르지 않습니다.\n 확인 후 다시 입력해 주세요.");
			$('#alert_type_leftMenu').val("PwdTxt_now");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		if(pwdNew==null||pwdNew==""){
			$('#alert_title_leftMenu').text("비밀번호 일치 확인");
			$('#alert_message_leftMenu').text("새 비밀번호 를 입력해 주세요.");
			$('#alert_type_leftMenu').val("PwdTxt_new");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		if(pwdNewChk==null||pwdNewChk==""){
			$('#alert_title_leftMenu').text("비밀번호 일치 확인");
			$('#alert_message_leftMenu').text("새 비밀번호 확인 을 입력해 주세요.");
			$('#alert_type_leftMenu').val("PwdTxt_newChk");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		if(pwdNew!=pwdNewChk){
			$('#alert_title_leftMenu').text("비밀번호 일치 확인");
			$('#alert_message_leftMenu').text("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.\n 확인 후 다시 입력해 주세요.");
			$('#alert_type_leftMenu').val("PwdTxt_new");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		//비밀번호 정규식 체크.
		passwordRules = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$/;
		var pwdRulesChk = passwordRules.test(pwdNewChk);
		if(pwdRulesChk==false){
			$('#alert_title_leftMenu').text("비밀번호 일치 확인");
			$('#alert_message_leftMenu').text("비밀번호 형식이 맞지 않습니다.\n 비밀번호는 영문, 숫자, 특수문자 조합으로 8~10자로 입력해 주세요");
			$('#alert_type_leftMenu').val("PwdTxt_new");
			$('#modal_alert_leftMenu').modal();
			return;
		}
		//비밀번호 변경.
		$.post(ctx+"/account/updatePwd.ajax",{userId :$('#mngr_id').val() ,userPwd :  $('#pwdTxt_newChk').val() },
				function(r){
					if(r.result){
						$('#mngr_password').val($('#pwdTxt_newChk').val());;
						$('#PwdTxt_now').val("");
						$('#pwdTxt_new').val("");
						$('#pwdTxt_newChk').val("");
						$('#modal_pwdChange').modal('toggle');
					}
		});
	},
	that.fn_pwdChangCloseBtn = function(){
		$('#PwdTxt_now').val("");
		$('#pwdTxt_new').val("");
		$('#pwdTxt_newChk').val("");
		$('#modal_pwdChange').modal('toggle');
	},
	that.fn_mngr_selectMailAddr = function(){

		var selectMailAddr = document.getElementById("mngr_selectMailAddr");
		var emailBack = document.getElementById("mngr_emailB");

		var selectValue = selectMailAddr.options[selectMailAddr.selectedIndex].value;
		var selectText = selectMailAddr.options[selectMailAddr.selectedIndex].text;

		if(selectValue=="none"){
			emailBack.value="";
		}else{
			emailBack.value=selectText;
		}

	}

};
var _menuList = {
	menu1 : {
		id : 'leftMenu1',
		name : '관리자 관리',
		url : ctx + '/account/mngMngr.do',
		isSubMenu : false,
	},

	menu2 : {
		id : 'leftMenu2',
		name : 'CP 컨텐츠 관리',
		url : ctx + '/kcontent/kcontent.do',
		isSubMenu : true,
		subMenu : {
			subMenu1 : {
				no : 0,
				name : 'K-Contents',
				url : ctx + '/kcontent/kcontent.do'
			},
			subMenu2 : {
				no : 1,
				name : 'K-GeneralStickers',
				url : ctx + '/kcontent/kGeneralSticker.do'
			},
			subMenu3 : {
				no : 2,
				name : 'K-CustomStickers',
				url : ctx + '/kcontent/kCustomSticker.do'
			}
		}
	},

	menu3 : {
		id : 'leftMenu3',
		name : 'KUC 관리',
		url : ctx + '/kuc/mngKuc.do',
		isSubMenu : false,
	},

	menu4 : {
		id : 'leftMenu4',
		name : '통계 관리',
		url : ctx + '/statistics/device/device.do',
		isSubMenu : true,
		subMenu : {
			subMenu1 : {
				no : 0,
				name : '디바이스 별 통계',
				url : ctx + '/statistics/device/device.do'
			},
			subMenu2 : {
				no : 1,
				name : '동화 별 통계',
				url : ctx + '/statistics/kcontents/kcontent.do'
			},
			subMenu3 : {
				no : 2,
				name : '사용자 별 통계',
				url : ctx + '/statistics/user/user.do'
			}
		}
	},

	menu5 : {
		id : 'leftMenu5',
		name : '설정',
		url : ctx + '/setting/mngSetting.do',
		isSubMenu : false,
	},

	menu6 : {
		id : 'leftMenu6',
		name : 'Scheduler 관리',
		url : ctx + '/scheduler/mngScheduler.do',
		isSubMenu : false,
	}

}

$(function() {
	$('.navigation-main').find('.step1').on('click', function(e) {
		e.preventDefault();
		var url;
		var selectId = ($(this).attr('id'));
		$.each(_menuList, function(index, item) {
			if (item.id == selectId) {
				url = item.url;
			}
		});
		$('#menuMoveForm').attr('action', url);
		$('#menuMoveForm').submit();
		return false;
	});

	$('.navigation-main').find('.step2').on('click', function(e) {
		e.preventDefault();
		var url;
		var selectIndex = $(this).index();
		var parentId = $(this).parent().parent().attr('id');
		$.each(_menuList, function(index, item) {
			if (item.id == parentId) {
				$.each(item.subMenu, function(index, item) {
					if (item.no == selectIndex) {
						url = item.url;
					}
				});
			}
		});
		$('#menuMoveForm').attr('action', url);
		$('#menuMoveForm').submit();
		return false;
	});
});

function setLeftMenu(step1Value, step2Value) {
	selectMenu(step1Value);
	$('#' + _selectMenu.id).addClass('active');
	if (_selectMenu.isSubMenu) {
		$('#' + _selectMenu.id).find('ul').show();
		$.each($('#' + _selectMenu.id).find('ul').find('li'), function(index,
				item) {
			if (parseInt(index + 1) == step2Value) {
				$(this).find('a').append(
						'<span class="label bg-warning-400">Current</span>');
			}
		});
	}
}

function selectMenu(step1Value) {
	switch (step1Value) {
	case 1:
		_selectMenu = _menuList.menu1;
		break;
	case 2:
		_selectMenu = _menuList.menu2;
		break;
	case 3:
		_selectMenu = _menuList.menu3;
		break;
	case 4:
		_selectMenu = _menuList.menu4;
		break;
	case 5:
		_selectMenu = _menuList.menu5;
		break;
	case 6:
		_selectMenu = _menuList.menu6;
		break;
	default:
		selectMenu = _menuList.menu1;
		break;
	}
}

function getDateStr(myDate){
	var nMonth = Number((myDate.getMonth() + 1));
	var sMonth = nMonth < 10 ? '0'+nMonth : nMonth;
	var nDay = Number((myDate.getDate()));
	var sDay = nDay < 10 ? '0'+nDay : nDay;
	return (myDate.getFullYear() + '.' + sMonth + '.' + sDay)
}

function today() {
  var d = new Date()
  return getDateStr(d);
}

function lastWeek() {
  var d = new Date()
  var dayOfMonth = d.getDate()
  d.setDate(dayOfMonth - 7)
  return getDateStr(d);
}

function lastMonth() {
  var d = new Date()
  var monthOfYear = d.getMonth()
  d.setMonth(monthOfYear - 1)
  return getDateStr(d);
}

function threeMonthAgo() {
  var d = new Date()
  var monthOfYear = d.getMonth()
  d.setMonth(monthOfYear - 3)
  return getDateStr(d);
}
