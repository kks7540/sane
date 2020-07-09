
var mngSetting = new function() {
	var that = this;
	var sId = "";
	that.init = function(id) {
		// init script
		sId = id;
		//api key 저장 버튼
		$('#apiKeySvBtn').click(function() {
			that.fn_apiKeySvBtn();
		});
		//dlib 아이디 저장 버튼
		$('#dlibIdSvBtn').click(function() {
			that.fn_dlibIdSvBtn();
		});		
		//kcover 아이디 저장 버튼
		$('#kCoverIdSvBtn').click(function() {
			that.fn_kCoverIdSvBtn();
		});		
		//android Id 아이디 저장 버튼
		$('#adrVerSvBtn').click(function() {
			that.fn_adrVerSvBtn();
		});				
		//ios Id 아이디 저장 버튼
		$('#iosVerSvBtn').click(function() {
			that.fn_iosVerSvBtn();
		});			
		//alert 창 확인 버튼
		$('#btnOk_alert').click(function() {
			that.fn_btnOk_alert();
		});
		//confirm 창 확인 버튼
		$('#btnOk_confirm').click(function() {
			that.fn_btnOk_confirm();
		});
		//confirm 창 취소 버튼
		$('#btnCancel_confirm').click(function() {
			that.fn_btnCancel_confirm();
		});
		
		that.fn_search();
	},
	that.fn_search = function(){
		
		$.ajax ({
			url : ctx + "/setting/searchMngSetting.ajax",
			type : "post",
			dataType : "json",
			data : {},
			error : function() {
				alert('현재 조회 서비스가 원할하지 않습니다.\n 잠시후 다시 이용해 주십시요.');
				return;
			},
			success: function(data) { 
				var dataList = data.List;
				if(data != null && dataList.length > 0) {
					$.each(dataList, function(index, obj){
						var dataTyp = obj.dataTyp;
						var dataVal = obj.dataVal;				
						switch(dataTyp){
							case "1000" :
								$("#dlibId").val(dataVal);
								break;
							case "2000" :
								$("#kCoverId").val(dataVal);
								break;
							case "3000" :
								$("#adrVer").val(dataVal);
								break;
							case "3100" :
								$("#iosVer").val(dataVal);
								break;
							case "4000" :
								$("#apiKey").val(dataVal);
								break;
						}
					});
				}
			}
		});
	},
	that.fn_apiKeySvBtn = function(){

		if(!$.trim($("#apiKey").val())) {
 			$('#alert_title').text("서비스 환경 설정 실패");
			$('#alert_message').text("API Key를 입력해 주세요.");
			$('#alert_type').val("apiKey");
			$('#modal_alert').modal();
			return;
		}
		that.fn_saveConfirm("apiKey");
	},
	that.fn_dlibIdSvBtn = function(){

		if(!$.trim($("#dlibId").val())) {
 			$('#alert_title').text("서비스 환경 설정 실패");
			$('#alert_message').text("DLIB 상품ID를 입력해 주세요.");
			$('#alert_type').val("dlibId");
			$('#modal_alert').modal();
			return;
		}
		that.fn_saveConfirm("dlibId");
	},
	that.fn_kCoverIdSvBtn = function(){

		if(!$.trim($("#kCoverId").val())) {
 			$('#alert_title').text("서비스 환경 설정 실패");
			$('#alert_message').text("K-COVER 상품ID를 입력해 주세요.");
			$('#alert_type').val("kCoverId");
			$('#modal_alert').modal();
			return;
		}
		that.fn_saveConfirm("kCoverId");
	},
	that.fn_adrVerSvBtn = function(){

		if(!$.trim($("#adrVer").val())) {
 			$('#alert_title').text("서비스 환경 설정 실패");
			$('#alert_message').text("Android 버전을 입력해 주세요.");
			$('#alert_type').val("adrVer");
			$('#modal_alert').modal();
			return;
		}
		that.fn_saveConfirm("adrVer");
	},	
	that.fn_iosVerSvBtn = function(){

		if(!$.trim($("#iosVer").val())) {
 			$('#alert_title').text("서비스 환경 설정 실패");
			$('#alert_message').text("iOS 버전을 입력해 주세요.");
			$('#alert_type').val("iosVer");
			$('#modal_alert').modal();
			return;
		}
		that.fn_saveConfirm("iosVer");
	},
	that.fn_saveConfirm = function(type){	
		
		$('#confirm_title').text("서비스 환경 설정 저장");
		$('#confirm_message').text("저장하시겠습니까?");
		$('#confirm_type').val(type);
		$('#modal_confirm').modal();
		
	},
	that.fn_btnOk_confirm = function(){
		var type = $('#confirm_type').val();
		var val = $("#"+type+"").val();
		$.post(ctx+"/setting/saveMngSetting.ajax",{type : type , val : val, id : sId });
		$('#modal_confirm').modal('toggle');
	},
	that.fn_btnCancel_confirm = function(){
		$('#modal_confirm').modal('toggle'); 
	},
	that.fn_btnOk_alert = function(){
		$('#modal_alert').modal('toggle');
	}
};
