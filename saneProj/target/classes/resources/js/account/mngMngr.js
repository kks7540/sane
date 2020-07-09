
var mngMngr = new function() {
	var that = this;
	var idFlag = 0;
	var url = "";
	var sId = "";
	that.init = function(id) {
		sId = id;
		//초기값
		url =  ctx + '/account/mngMngrList.ajax?id='+sId;
		$("input:radio[id='authority_U']").attr('checked', true);
		// init script  
		that.listTable(0);
		//중복 확인 버튼
		$('#chkID').click(function() {
			that.fn_chkID();
		});
		//초기화 버튼
		$('#btnClear').click(function() {
			that.fn_btnClear();
		});
		//조건 조회 버튼
		$('#btnSearch').click(function() {
			var selectCondTyp = $("#selectCondTyp option:selected").val();
			var selectCondVal = $("#selectCondVal").val();
			var useYn = $("#selectUse option:selected").val();
			url = ctx + '/account/mngMngrList.ajax?'+"type="+selectCondTyp+"&val="+selectCondVal+"&useYn="+useYn ;
			that.listTable(0);
		});
		//관리자 등록화면 팝업 등록 버튼
		$('#insertMngr').click(function() {
			that.fn_insertMngr();
		});
		//관리자 수정화면 팝업 저장 버튼
		$('#saveMngr_u').click(function() {
			that.fn_saveMngr_u();
		});
		//관리자 등록화면 팝업 취소 버튼
		$('#closeMngr').click(function() {
			that.fn_closeMngr();
		});		
		//관리자 수정화면 팝업 취소 버튼
		$('#closeMngr_u').click(function() {
			that.fn_closeMngr_u();
		});			
		//관리자 등록화면 메일 콤보 박스 값 변경.
		$('#selectMailAddr').change(function() {
			that.fn_changeMailAddr();
		});
		//관리자 수정 화면 메일 콤보박스 값 변경.
		$('#selectMailAddr_u').change(function() {
			that.fn_changeMailAddr_u();
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
		//비밀번호 초기화 버튼
		$('#pwdClearBtn').click(function() {
			that.fn_pwdClearBtn();
		});
		
		//사용 버튼
		$('#use_Y').click(function() {
			$('#alert_title').text("관리자 권한 설정");
			$('#alert_message').text("관리자 계정 및 권한 사용을 \n 허용 합니다. ");
			$('#modal_alert').modal();
		});
		//중지 버튼
		$('#use_N').click(function() {
			$('#alert_title').text("관리자 권한 설정");
			$('#alert_message').text("관리자 계정 및 권한 사용을 \n 중지 합니다. ");
			$('#modal_alert').modal();
		});
		//Table 이벤트
		var table = $("#item-list").DataTable();
		var cellIndex='';
		$('#item-list tbody').on( 'click', 'td', function () {
			cellIndex = table.cell( this ).index().column;
		});
		$('#item-list tbody').on( 'click', 'tr', function () {
			var dataList = table.row( this ).data();
				$('#id_u').val(dataList.userId);
				$('#name_u').val(dataList.userNm);
				$('#password_u').val("**********");
				$('#dept_u').val(dataList.userDept);
				$('#regDt_u').val(dataList.userRegDt);
				$('#rcntConnDt_u').val(dataList.rcntConnDt);
				var userEmail = dataList.userEmail;
				$('#email_u').val(userEmail);
				var sIndex = userEmail.indexOf('@');
				var length = userEmail.length;
				var emailF_u = userEmail.substring(0,sIndex);
				var emailB_u = userEmail.substring(sIndex+1,length);
				$('#emailF_u').val(emailF_u);
				$('#emailB_u').val(emailB_u);
	
				var contr = dataList.contr;
				
				var arr = contr.split('-');
				$('#telF_u').val(arr[0]);
				$('#telM_u').val(arr[1]);
				$('#telB_u').val(arr[2]);
				
				if(dataList.useYn=="Y"){
					$("#use_Y").prop("checked", true);
					$("#use_Y").attr('checked', 'checked');
				}else{
					$("#use_N").prop("checked", true);
					$("#use_N").attr('checked', 'checked');
				}
				if(dataList.userAutr=="S"){
					$("input:radio[id='authority_S_u']").prop('checked', true);
					$("input:radio[id='authority_U_u']").prop('checked', false);
				}else if(dataList.userAutr=="U"){
					$("input:radio[id='authority_S_u']").prop('checked', false);
					$("input:radio[id='authority_U_u']").prop('checked', true);
				}
				
			if(cellIndex!='7'){	
				$('#modal_update').modal();
			}
		} );
		

	},
	
	that.listTable = function(pageNum) {
		that.listDataTable(pageNum);
	},
	that.fn_btnClear = function(){

		$("#selectCondTyp").val("userId").prop("selected", true);
		$("#selectCondVal").val("");
		$("#selectUse").val("all").prop("selected", true);
		that.init(sId);
	}
	that.listDataTable = function(pageNum) {
			
		table = $('#item-list').DataTable({
			destroy: true,
            pagingType : 'full_numbers',
            bLengthChange: false,
            ordering : false,
            iDisplayStart : pageNum,
            iDisplayLength : 10,
            bProcessing : true,
            bServerSide: true,
            searching: false,
            sAjaxSource : url,
            sServerMethod: 'post',
            columns: [
            	{ title : '번호', data : 'userSeq', width: '8%', className : 'text-center' },
				{ title : '아이디', data : 'userId', width: '10%', className : 'text-center'  },
				{ title : '이름', data : 'userNm', width: '10%', className : 'text-center'  },
				{ title : '부서', data : 'userDept', width: '10%', className : 'text-center'  },
				{ title : '이메일', data : 'userEmail', width: '10%', className : 'text-center'  },
				{ title : '등록일', data : 'userRegDt', width: '20%', className : 'text-center'  },
				{ title : '최근접속일', data : 'rcntConnDt', width: '20%', className : 'text-center'  },
				{ title : '상태', data : 'useYn', width: '15%', className : 'text-center'  },
				{ title : '비밀번호', data : 'userPwd', width: '0%', className : 'text-center'  },
				{ title : '전화번호', data : 'contr', width: '0%', className : 'text-center'  },
				{ title : '권한', data : 'userAutr', width: '0%', className : 'text-center'  }
              ],
              columnDefs : [ 
				    { orderable : false, targets : [0, 1, 2, 3, 4, 5, 6], render : function (data, type, row, meta) {
				    	return data;
				    }},
				    { orderable : false, targets : [7], render : function (data, type, row, meta) {
				    	var append;
				    		if(data == 'Y'){
				    			append = '<button type="button" class="btn btn-success" onclick="mngMngr.fn_useYnDisplay(\''+data+'\');">사용</button>';	
				    		}else{
				    			append = '<button type="button" class="btn btn-danger" onclick="mngMngr.fn_useYnDisplay(\''+data+'\');">중지</button>';	
				    		}
					    return append;
				    }},
				    { orderable : false, targets : [8,9,10], visible : false ,render : function (data, type, row, meta) {
				    	return data;
				    }}

				],
				
		});
		
	},
	
	// 관리자 등록 
	that.fn_insertMngr = function() {
		
		//id 검사
		if(!$.trim($("#id").val())) {
 			$('#alert_title').text("관리자 등록 실패");
			$('#alert_message').text("아이디를 입력해 주세요.");
			$('#alert_type').val("id");
			$('#modal_alert').modal();
			return;
		}
		//id 중복확인 검사.
		if(idFlag==0){
 			$('#alert_title').text("관리자 등록 실패");
			$('#alert_message').text("아이디 중복확인을 해주세요.");
			$('#alert_type').val("id");
			idFlag=0;
			$('#modal_alert').modal();
			return;
		}
		// 이름 검사.
		if(!$.trim($("#name").val())) {
 			$('#alert_title').text("관리자 등록 실패");
			$('#alert_message').text("이름을 입력해 주세요.");
			$('#alert_type').val("name");
			$('#modal_alert').modal();
			return;
		}
		// 소속 부서 검사.
		if(!$.trim($("#dept").val())) {
 			$('#alert_title').text("관리자 등록 실패");
			$('#alert_message').text("소속부서를 입력해 주세요.");
			$('#alert_type').val("dept");
			$('#modal_alert').modal();
			return;
		}
		// 이메일 검사
		if(!$.trim($("#emailF").val()) || !$.trim($("#emailB").val())) {
 			$('#alert_title').text("관리자 등록 실패");
			$('#alert_message').text("이메일을 입력해 주세요.");
			$('#alert_type').val("emailF");
			$('#modal_alert').modal();
			return;
		}
		//이메일 유효성 검사. 
		var email = $("#emailF").val()+"@"+$("#emailB").val();
		eCheck=/^[_a-zA-Z0-9]+([-+.][_a-zA-Z0-9]+)*@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/i;
		var mail_check = eCheck.test(email);
		 
		if(mail_check==false){
 			$('#alert_title').text("관리자 등록 실패");
			$('#alert_message').text("이메일 도메인 형식이 잘못되었습니다.");
			$('#alert_type').val("emailB");
			$('#modal_alert').modal();
			return;
		}
		//연락처 유효성 검사
		var tel = $("#telF").val()+"-"+$("#telM").val()+"-"+$("#telB").val();
		if(/[^-0123456789]/g.test(tel)) {
 			$('#alert_title').text("관리자 등록 실패");
			$('#alert_message').text("연락처는 숫자만 입력 가능합니다.");
			$('#alert_type').val("telF");
			$('#modal_alert').modal();
			return;
		}
		//email,contr Hidden
		$('#email').val(email);
		$('#contr').val(tel);
		$('#userAutr').val($("input:radio[name='autrRd']:checked").val());
		//최종 등록 확인.
		if(idFlag==1){
 			$('#confirm_title').text("관리자 등록");
			$('#confirm_message').text("등록하시겠습니까?");
			$('#confirm_type').val("insertMngr");
			$('#modal_confirm').modal();
		}else{
			$('#alert_title').text("관리자 등록 실패");
			$('#alert_message').text("등록이 실패 하였습니다.");
			$('#alert_type').val("");
			$('#modal_alert').modal();
		}
		return;
	},
	// 관리자 정보 수정
	that.fn_saveMngr_u = function(){
		// 이름 검사.
		if(!$.trim($("#name_u").val())) {
 			$('#alert_title').text("관리자 정보 저장 실패");
			$('#alert_message').text("이름을 입력해 주세요.");
			$('#alert_type').val("name_u");
			$('#modal_alert').modal();
			return;
		}
		// 소속 부서 검사.
		if(!$.trim($("#dept_u").val())) {
 			$('#alert_title').text("관리자 정보 저장 실패");
			$('#alert_message').text("소속부서를 입력해 주세요.");
			$('#alert_type').val("dept_u");
			$('#modal_alert').modal();
			return;
		}
		// 이메일 검사
		if(!$.trim($("#emailF_u").val()) || !$.trim($("#emailB_u").val())) {
 			$('#alert_title').text("관리자 정보 저장 실패");
			$('#alert_message').text("이메일을 입력해 주세요.");
			$('#alert_type').val("emailF_u");
			$('#modal_alert').modal();
			return;
		}
		//이메일 유효성 검사. 
		var email = $("#emailF_u").val()+"@"+$("#emailB_u").val();
		eCheck=/^[_a-zA-Z0-9]+([-+.][_a-zA-Z0-9]+)*@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/i;
		var mail_check = eCheck.test(email);
		 
		if(mail_check==false){
 			$('#alert_title').text("관리자 정보 저장 실패");
			$('#alert_message').text("이메일 도메인 형식이 잘못되었습니다.");
			$('#alert_type').val("emailB_u");
			$('#modal_alert').modal();
			return;
		}
		//연락처 유효성 검사
		var tel = $("#telF_u").val()+"-"+$("#telM_u").val()+"-"+$("#telB_u").val();
		if(/[^-0123456789]/g.test(tel)) {
 			$('#alert_title').text("관리자 정보 저장 실패");
			$('#alert_message').text("연락처는 숫자만 입력 가능합니다.");
			$('#alert_type').val("telF_u");
			$('#modal_alert').modal();
			return;
		}
		//email,contr Hidden
		$('#email_u').val(email);
		$('#contr_u').val(tel);
	
		if($("input:radio[id='use_Y']").is(':checked')){
			$('#useYn_u').val($("input:radio[id='use_Y']:checked").val());
		}else{
			$('#useYn_u').val($("input:radio[id='use_N']:checked").val());
		}
		$('#userAutr_u').val($("input:radio[name='autrRd_u']:checked").val());
		
		$('#confirm_title').text("관리자 정보 저장");
		$('#confirm_message').text("저장하시겠습니까?");
		$('#confirm_type').val("saveMngr_u");
		$('#modal_confirm').modal();
		 
	}
	// ID 중복 체크
	that.fn_chkID = function() {
		
		//id 검사
		if(!$.trim($("#id").val())) {

			$('#alert_title').text("아이디 중복확인");
			$('#alert_message').text("아이디를 입력해 주세요.");
			$('#modal_alert').modal();
			$('#alert_type').val("id");
			idFlag=0;
			return;
		}
		
		// 영문 숫자 확인.
		var text = $("#id").val();
        var regexp = /[0-9a-zA-Z.;\-]/; // 숫자,영문,특수문자
        for( var i=0; i<text.length; i++){
            if(text.charAt(i) != " " && regexp.test(text.charAt(i)) == false || text.length < 8 || text.length > 10){
	 			$('#alert_title').text("아이디 중복확인");
				$('#alert_message').text("영문,숫자 조합으로 8~10 자 이내로 입력해 주세요.");
				$('#alert_type').val("id");
				$('#modal_alert').modal();
				return;
            }
        }  

		//ID 중복 검사
		$.ajax ({
			url : ctx +"/account/checkID.ajax",
			type : "post",
			dataType : "json",
			data : {userId : $("#id").val()},
			error : function() {
				$('#alert_title').text("서비스 오류");
				$('#alert_message').text("현재 조회 서비스가 원할하지 않습니다.\n잠시후 다시 이용해 주십시요.");
				$('#alert_type').val("");
				$('#modal_alert').modal();
				return;
			},
			success: function(r) { 
				if(r.chkResult == 'Y') {
					$('#alert_title').text("아이디 중복확인");
					$('#alert_message').text("이미 사용중인 아이디 입니다.\n 다시 입력해 주세요.");
					$('#alert_type').val("id");
					$('#modal_alert').modal();
					idFlag=0;
					return;
				} else{
					$('#alert_title').text("아이디 중복확인");
					$('#alert_message').text("사용 가능한 아이디 입니다.");
					$('#alert_type').val("id");
					$('#modal_alert').modal();
					idFlag=1;
					return;
				}
			}
		});
	},
	
	//관리자 등록 화면 이메일 주소 변경 시 
	that.fn_changeMailAddr = function(){
		
		var selectMailAddr = document.getElementById("selectMailAddr"); 
		var emailBack = document.getElementById("emailB");
		
		var selectValue = selectMailAddr.options[selectMailAddr.selectedIndex].value;
		var selectText = selectMailAddr.options[selectMailAddr.selectedIndex].text;

		if(selectValue=="none"){
			emailBack.value="";
		}else{
			emailBack.value=selectText;
		}
 
	},
	//관리자 수정 화면 이메일 주소 변경 시
	that.fn_changeMailAddr_u = function(){
		
		var selectMailAddr = document.getElementById("selectMailAddr_u"); 
		var emailBack = document.getElementById("emailB_u");
		
		var selectValue = selectMailAddr.options[selectMailAddr.selectedIndex].value;
		var selectText = selectMailAddr.options[selectMailAddr.selectedIndex].text;

		if(selectValue=="none"){
			emailBack.value="";
		}else{
			emailBack.value=selectText;
		}
 
	},
	//팝업창 닫기 버튼
	that.fn_closeMngr = function(){
		$('#confirm_title').text("관리자 등록 화면");
		$('#confirm_message').text("작성 중인 내용이 사라집니다.\n 계속 진행하시겠습니까? ");
		$('#confirm_type').val("closeMngr");
		$('#modal_confirm').modal();
	},
	that.fn_closeMngr_u = function(){
		$('#confirm_title').text("관리자 수정 화면");
		$('#confirm_message').text("작성 중인 내용이 사라집니다.\n 계속 진행하시겠습니까? ");
		$('#confirm_type').val("closeMngr_u");
		$('#modal_confirm').modal();
	}
	//alert 창 확인 버튼
	that.fn_btnOk_alert = function(){
		var type = $('#alert_type').val();
		$("#"+type+"").focus();
		$('#modal_alert').modal('toggle');
	},
	//confirm 창 확인 버튼
	that.fn_btnOk_confirm = function(){
		var type = $('#confirm_type').val();
		
		switch(type){
			case "insertMngr" :
				$("#insertForm").submit();
				$('[type=text]').val('');
				$("input:radio[id='authority_U']").attr('checked', true);
				$("#selectMailAddr").val("none").prop("selected", true);
				break;
			case "saveMngr_u" :
				$("#updateForm").submit();
				$('[type=text]').val('');
				$('[type=radio]:checked').prop('checked', false);
				$("#selectMailAddr_u").val("none").prop("selected", true);
				break;
			case "closeMngr" :
				$('[type=text]').val('');
				$('[type=checkbox]:checked').prop('checked', false);
				$("#selectMailAddr").val("none").prop("selected", true);
				$('#modal_insert').modal('toggle');
				$('#modal_confirm').modal('toggle');
				break;
			case "closeMngr_u" :
				$('#modal_update').modal('toggle');
				$('#modal_confirm').modal('toggle');
				break;
			case "use_Y" : 
				that.fn_useStateUpdate("Y");
				break;
			case "use_N" :
				that.fn_useStateUpdate("N");
				break;
			case "pwdClear" : 
				$('#modal_confirm').modal('toggle');
				var userEmail = $('#email_u').val();
				$.post(ctx+"/account/pwdClear.ajax",{userId :  $('#id_u').val(), userEmail : userEmail, userNm : $('#name_u').val()});
				break;
		}
	},
	//confirm 창 취소 버튼
	that.fn_btnCancel_confirm = function(){
		$('#modal_confirm').modal('toggle');
	},
	that.fn_useYnDisplay = function(data){
		if(data=='Y'){
			$('#confirm_title').text("상태 변경");
			$('#confirm_message').text("중지 하시겠습니까?");
			$('#confirm_type').val("use_N");
			$('#modal_confirm').modal();
		}else if(data=='N'){
			$('#confirm_title').text("상태 변경");
			$('#confirm_message').text("사용 하시겠습니까?");
			$('#confirm_type').val("use_Y");
			$('#modal_confirm').modal();
		}
	},
	that.fn_useStateUpdate = function(state){
		//상태 변경
		$.ajax ({
			url : ctx +"/account/useStateUpdate.ajax",
			type : "post",
			dataType : "json",
			data : {useYn : state , userId : $('#id_u').val(), modrId : $('#modrId_u').val() },
			error : function() {
				$('#alert_title').text("서비스 오류");
				$('#alert_message').text("현재 조회 서비스가 원할하지 않습니다.\n잠시후 다시 이용해 주십시요.");
				$('#alert_type').val("");
				$('#modal_alert').modal();
				return;
			},
			success: function(r) { 
				location.reload();
				$('#modal_confirm').modal('toggle');
			}
		});
	},
	that.fn_pwdClearBtn = function(){
		$('#confirm_title').text("비밀번호 초기화");
		$('#confirm_message').text("비밀번호가 초기화 됩니다.\n 계속 진행하시겠습니까?");
		$('#confirm_type').val("pwdClear");
		$('#modal_confirm').modal();
	}
};
