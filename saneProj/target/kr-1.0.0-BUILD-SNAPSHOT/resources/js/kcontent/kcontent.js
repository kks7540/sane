var kcontent = new function() {
	var kcontents_id = '';
	var SEARCH_PARAM = '';
	
	var table;
	
	var that = this;
	that.init = function() {
		// init script 
		that.listTable(0);
		
		// 초기화 버튼
		$('#btnInit').click(function (){
			$('#searchForm').trigger('reset');
		});
		// 검색 버튼
		$('#btnSearch').click(function() {
			that.listTable(0);
		});
		// 해상도 ID 등록 모달 '등록' 버튼
		$('#btnReg').click(function() {
			that.procRegId();
		});
		// 해상도 ID 등록 모달 '취소' 버튼
		$('button[name="btnRegCancel"]').click(function() {
 			$('#confirm_title').text("ID 등록 취소");
			$('#confirm_message').text("작성 중인 내용이 사라집니다.\n계속 진행하시겠습니까?");
			$('#confirm_type').val("regCancel");
			$('#modal_confirm').modal();
		});
		// 해상도 ID 등록 모달 : Type 체크박스(현재 사양 '1'개만 선택가능)
		$('input[name="prdtTyp"]').click(function() {
			if($('input[name="prdtTyp"]:checked').length > 1) {
				$('#alert_title').text("ID 등록 오류");
				$('#alert_message').text("Type은 하나만 선택해 주세요.");
				$('#modal_alert').modal();
			}
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
		// 검색어 입력란 엔터 이벤트
		$('input[name="paramValue"]').keydown(function(e) {
			if(e.keyCode == 13) {
				$('#btnSearch').trigger('click');
			}
		});
		
		// KCover 생성
		$('#kcoverCreateBtn').click(function(){
			that.kcoverCreateConfirm();
		});
		
		
		$('#updateListBtn').click(function(){
			that.updateList();
		});
		
		$('#downloadFailBtn').click(function(){
			that.downloadFailList();
		});
		
		$('#updateDownloadFailListCloseBtn').click(function(){
			$('#modal_updateDownloadFailList').modal('toggle');
		});
		
		
	},
	
	// 업데이트 해야하는 리스트 
	that.updateList = function() {
		$.ajax({
			url: ctx + '/kcontent/kcontentUpdateList.ajax',
			type: 'post',
			success: function(result) {
				$.unblockUI();
				if(result.resultCode == '200') {
					$('#updateDownloadFailList_title').html("K Content 업데이트 목록");
					that.setModalList(result.list);
					$('#modal_updateDownloadFailList').modal();
				} else {
					$('#updateDownloadFailList_title').html("K Content 업데이트 목록");
					$('#updateDownloadFailList_div').html("K Content 업데이트 목록 조회에 실패 하였습니다.");
					$('#modal_updateDownloadFailList').modal();
				}
			},
			error: function(e) {
				$.unblockUI();
				$('#updateDownloadFailList_title').html("K Content 업데이트 목록");
				$('#updateDownloadFailList_div').html("K Content 업데이트 목록 조회에 실패 하였습니다.");
				$('#modal_updateDownloadFailList').modal();
			}
		});
	},
	
	// 다운로드 실패한 리스트
	that.downloadFailList = function() {
		$.ajax({
			url: ctx + '/kcontent/kcontentDownloadFailList.ajax',
			type: 'post',
			success: function(result) {
				$.unblockUI();
				if(result.resultCode == '200') {
					$('#updateDownloadFailList_title').html("K Content 다운로드 실패 목록");
					that.setModalList(result.list);
					$('#modal_updateDownloadFailList').modal();
				} else {
					$('#updateDownloadFailList_title').html("K Content 다운로드 실패 목록");
					$('#updateDownloadFailList_div').html("K Content 다운로드 실패 목록 조회에 실패 하였습니다.");
					$('#modal_updateDownloadFailList').modal();
				}
			},
			error: function(e) {
				$.unblockUI();
				$('#updateDownloadFailList_title').html("K Content 다운로드 실패 목록");
				$('#updateDownloadFailList_div').html("K Content 다운로드 실패 목록 조회에 실패 하였습니다.");
				$('#modal_updateDownloadFailList').modal();
			}
		});
	},
	
	that.setModalList = function(list){
		var tbody = $('#updateDownloadFailList_tbody');
		tbody.empty();
		if(list.length > 0) {
			$(list).each(function(index, obj){
				var tr = $('<tr/>',{});
				var td_prdtId = $('<td/>',{
					text : obj.id
				});
				var td_prdtNm = $('<td/>',{
					text : obj.name
				});
				
				tr.append(td_prdtId);
				tr.append(td_prdtNm);
				tbody.append(tr);
			});
		} else {
			var tr = $('<tr/>',{});
			var td = $('<td/>',{
				colspan : '2',
				text : '조회된 결과가 없습니다.',
				class : 'text-center'
			});
			tr.append(td);
			tbody.append(tr);
		}
		//$('#updateDownloadFailList_div').scrollTop();
		$('#updateDownloadFailList_div').animate({
			scrollTop : 0
		}, 100);
	},
	
	
	that.listTable = function(pageNum) {
		SEARCH_PARAM = '?' + $('#searchForm').serialize();
		that.listDataTable(pageNum);
	},
	
	that.listDataTable = function(pageNum) {
		that.table = $('#item-list').DataTable({
			destroy: true,
            pagingType : 'full_numbers',
            bLengthChange: false,
            ordering : false,
            iDisplayStart : pageNum,
            iDisplayLength : 10,
            bProcessing : true,
            bServerSide: true,
            searching: false,
            sAjaxSource : ctx + '/kcontent/kContentsList.ajax' + SEARCH_PARAM,
            sServerMethod: 'POST',
            columns: [
            	{ title : '번호', data : '', width: '7%', className : 'text-center' },
            	{ title : '표지', data : 'thumbnailURL', width: '10%', className : 'text-center'  },
            	{ title : '매칭이미지', data : 'iconURL', width: '10%', className : 'text-center'  },
            	{ title : 'Product ID', data : 'id', width: '15%', className : 'text-center' },
				{ title : '제목', data : 'name', width: '15%', className : 'text-center'  },
				{ title : 'EpsdRsluID 맵핑 여부', data : 'mappingYn', width: '6%', className : 'text-center', defaultContent: ''  },
				{ title : '다운로드 상태', data : 'downldStts', width: '10%', className : 'text-center'  },
				{ title : '업데이트', data : 'mdfYn', width: '9%', className : 'text-center'  },
				{ title : '최종 적용일', data : 'downldMdfDt', width: '8%', className : 'text-center'  },
				{ title : '동작', data : 'id', width: '10%', className : 'text-center'  }
              ],
              columnDefs : [ 
				    { orderable : false, targets : 0, render : function ( data, type, row, meta ) {
				    	var curPage = that.table.page.info().page;
				    	return curPage * 10 + 1 + meta.row;
				    }},
				    { orderable : false, targets : [1, 2], render : function ( data, type, row, meta ) {
				    	return '<img src=\'' + data + '\'/ style="height:40px;">';
				    }},
				    { orderable : false, targets : 3, render : function (data, type, row, meta) {
				    	return '<a href="javascript:void(0);" onclick="kcontent.regIdPop(\'' + row.id + '\');">' + data + '</a>';
				    }},
				    { orderable : false, targets : 4, render : function (data, type, row, meta) {
				    	return '<a href="javascript:void(0);" onclick="kcontent.regIdPop(\'' + row.id + '\');" id="a_' + row.id + '">' + data + '</a>';
				    }},
				    { orderable : false, targets : 5, render : function (data, type, row, meta) {
				    	var result = '<span></span>';
				    	if( data == 'Y') {
				    		result = '<span class="label bg-success" style="width:60px; height:27px; font-size:14px; font-style:bold;">YES</span>';
				    	} else {
				    		result = '<span class="label bg-warning" style="width:60px; height:27px; font-size:14px; font-style:bold;">NO</span>';
				    	}
				    	return result;
				    }},
				    { orderable : false, targets : 6, render : function (data, type, row, meta) {
				    	var result = '<span></span>';
				    	if( data == 'Y') {
				    		result = '<span class="label bg-success" style="width:85px; height:27px; font-size:14px; font-style:bold;">SUCCESS</span>';
				    	} else {
				    		if(row.mappingYn == 'Y') {
				    			result = '<span class="label bg-warning" style="width:60px; height:27px; font-size:14px; font-style:bold;">FAIL</span>';
				    		}else{
				    			result = '<span></span>';
				    		}
				    	}
				    	return result;
				    }},
				    { orderable : false, targets : 7, render : function ( data, type, row, meta ) {
				    	var result = '<span></span>';
				    	if( data == 'Y') {
				    		result = '<span class="label bg-warning" style="width:70px; height:27px; font-size:14px; font-style:bold;">UPDATE</span>';
				    	} 
				    	return result;
				    }},
				    { orderable : false, targets : 8, render : function ( data, type, row, meta ) {
				    	return data;
				    }},
				    { orderable : false, targets : 9, render : function ( data, type, row, meta ) {
				    	var result = '<span></span>';
			    		if(row.mappingYn == 'Y') {
			    			if(row.mdfYn == 'Y') {
			    				result = '<span class="label bg-primary downprocess" style="width:90px; height:27px; font-size:14px; font-style:bold; cursor:pointer;">UPDATE</span>';
			    			} else {
			    				if(row.downldStts != 'Y'){
			    					result = '<span class="label bg-primary downprocess" style="width:90px; height:27px; font-size:14px; font-style:bold; cursor:pointer;">DOWNLOAD</span>';
			    				} else {
			    					result = '<span></span>';
			    				}
			    			}
				    	}
				    	return result;
				    }}
				]
		});
		
		$('.datatable-basic tbody').on('click', '.downprocess', function (){
			var obj = $(this).parent().siblings().eq(3).find('a');
			var id = obj.text();
			that.downloadProcessConfirm( id );
		});
		
	},
	
	// K Cover 생성 Confirm
	that.kcoverCreateConfirm = function() {
		$('#confirm_title').html("K Cover 생성");
		$('#confirm_message').html("K Cover를 새로 생성 합니다. <br/>계속 진행 하시겠습니까?");
		$('#confirm_type').val("kcoverCreate");
		$('#modal_confirm').modal();
	},
	
	// K Cover 생성
	that.kcoverCreate = function() {
		$.blockUI({ message: 'K COVER CREATE...............' });
		$('#modal_confirm').modal('toggle');
		$.ajax({
			url: ctx + '/kcontent/kcoverCreate.ajax',
			type: 'post',
			success: function(result) {
				$.unblockUI();
				if(result.resultCode == '200') {
					$('#alert_title').html("K Cover 생성 성공");
					$('#alert_message').html("K Cover 생성을 성공 하였습니다.");
					$('#modal_alert').modal();
				} else {
					$('#alert_title').html("K Cover 생성 실패");
					$('#alert_message').html("K Cover 생성을 실패 하였습니다.<br/>잠시 후 다시 시도해 주십시오.<br/>계속해서 생성 실패시 T Real Cloud 관리자에게 문의 하시기 바랍니다.");
					$('#modal_alert').modal();
				}
			},
			error: function(e) {
				$.unblockUI();
				$('#modal_confirm').modal('toggle');
				$('#alert_title').html("K Cover 생성 실패");
				$('#alert_message').html("K Cover 생성을 실패 하였습니다.<br/>잠시 후 다시 시도해 주십시오.<br/>계속해서 생성 실패시 T Real Cloud 관리자에게 문의 하시기 바랍니다.");
				$('#modal_alert').modal();
			}
		});
	},
	
	//다운로드 프로세스 Confirm
	that.downloadProcessConfirm = function(id) {
		kcontents_id = id;
		$('#confirm_title').html("STB TRA 다운로드");
		$('#confirm_message').html("STB TRA 파일을 서버로 다운로드합니다. <br/>계속 진행 하시겠습니까?");
		$('#confirm_type').val("downloadProcess");
		$('#modal_confirm').modal();
	},
	
	//다운로드 프로세스	
	that.downloadProcess = function() {
        var currentPageNo = $('#item-list_paginate').find('span').find('.current').text();
        currentPageNo = parseInt( ((currentPageNo - 1)*10));
		$.blockUI({ message: 'STB FILE DOWNLOAD...............' });
		$('#modal_confirm').modal('toggle');
		$.ajax({
			url: ctx + '/kcontent/stbTraFileDownLoad.ajax',
			data: {'id': kcontents_id},
			type: 'post',
			success: function(result) {
				$.unblockUI();
				that.listTable(currentPageNo);
				if(result.resultCode == '200') {
					$('#alert_title').html("STB TRA 다운로드 성공");
					$('#alert_message').html("STB TRA 다운로드를 성공 하였습니다.");
					$('#modal_alert').modal();
				} else {
					$('#alert_title').html("STB TRA 다운로드 실패");
					$('#alert_message').html("STB TRA 다운로드를 실패 하였습니다.<br/>잠시 후 다시 시도해 주십시오.<br/>계속해서 다운로드 실패시 T Real Cloud 관리자에게 문의 하시기 바랍니다.");
					$('#modal_alert').modal();
				}
			},
			error: function(e) {
				$.unblockUI();
				that.listTable(currentPageNo);
				$('#modal_confirm').modal('toggle');
				$('#alert_title').html("STB TRA 다운로드 실패");
				$('#alert_message').html("STB TRA 다운로드를 실패 하였습니다.<br/>잠시 후 다시 시도해 주십시오.<br/>계속해서 다운로드 실패시 T Real Cloud 관리자에게 문의 하시기 바랍니다.");
				$('#modal_alert').modal();
			}
		});
	},
	
	that.comfNonDisplay = function(id) {
		kcontents_id = id;
		$.ajax({
			url: ctx + '/kcontent/procNonDisplay.ajax',
			data: {'id': kcontents_id},
			type: 'post',
			success: function(r) {
				if(r.resultCode == '200') {
					that.listTable(0);
					$('#modal_confirm').modal('toggle');
				} else {
					$('#alert_title').text("비전시 처리 실패");
					$('#alert_message').text("비전시 처리가 실패했습니다.");
					$('#modal_alert').modal();
					$('#modal_confirm').modal('toggle');
				}
			},
			error: function(e) {
				$('#alert_title').text("비전시 처리 실패");
				$('#alert_message').text("비전시 처리가 실패했습니다.");
				$('#modal_alert').modal();
				$('#modal_confirm').modal('toggle');
			}
		});
	},
	that.procNonDisplay = function() {
		$.ajax({
			url: ctx + '/kcontent/procNonDisplay.ajax',
			data: {'id': kcontents_id},
			type: 'post',
			success: function(r) {
				if(r.resultCode == '200') {
					that.listTable(0);
					$('#modal_confirm').modal('toggle');
				} else {
					$('#alert_title').text("비전시 처리 실패");
					$('#alert_message').text("비전시 처리가 실패했습니다.");
					$('#modal_alert').modal();
					$('#modal_confirm').modal('toggle');
				}
			},
			error: function(e) {
				$('#alert_title').text("비전시 처리 실패");
				$('#alert_message').text("비전시 처리가 실패했습니다.");
				$('#modal_alert').modal();
				$('#modal_confirm').modal('toggle');
			}
		});
	},
	that.imagePop = function(url) {
		$('#modal_image').find('div.modal-body').children('img').attr('src', url);
		$('#modal_image').modal();
	},
	that.regIdPop = function(pdId) {
		var pdNm = $('#a_' + pdId).text();
		$.ajax({
			url: ctx + '/kcontent/kContentsMappingInfo.ajax',
			data: {'pdID': pdId},
			type: 'post',
			success: function(r) {
				var data = r.data;
				
				$('#tdPdId').text(pdId);
				$('#tdPdNm').text(pdNm);
				
				if(r.dataCount == '1') {
					$('input[name="prdtMappSeq"]').val(data.prdtMappSeq);
					$('input[name="epsdRsluID"]').val(data.epsdRsluID);
					$('input[name="epsdID"]').val(data.epsdID);
					$('input[name="srisID"]').val(data.srisID);
					
					$('input[name="prdtTyp"]').each(function(i, v) {
						$(this).prop('checked', false);
					});
					
					$('input[name="prdtTyp"]').each(function(i, v) {
						if($(this).val() == data.prdtTyp) {
							$(this).prop('checked', true);
							return false;
						}
					});
				} else {
					$.each($('#idRegForm').serializeArray(), function(i, field) {
						if(field.name != 'prdtTyp') {
							$('input[name=' + field.name + ']').val('');
						}
					});
					$('#idRegForm input[type="checkbox"]').prop('checked', false);
				}
				
				$('input[name="pdID"]').val(pdId);
				$('input[name="pdNm"]').val(pdNm);
				
				$('#modal_regID').modal();
			},
			error: function(e) {
				console.log(e);
			}
		});
	},
	that.procRegId = function() {
		var strInputName = "";
		$.each($('#idRegForm input:text'), function(i, v) {
			var inputVal = $(this).val();
			if($.trim(inputVal).length == 0) {
				strInputName = $(this).attr('name');
				return false;
			}
		});
		
		if(strInputName.length > 0) {
			$('#alert_title').text("ID 등록 오류");
			$('#alert_message').text(strInputName + "를 입력해 주세요");
			$('#modal_alert').modal();
			$('input[name=' + strInputName + ']').focus();
			
			return;
		}
		
		// Type 선택 여부 확인
		if($('input[name="prdtTyp"]:checked').length < 1) {
			$('#alert_title').text("ID 등록 오류");
			$('#alert_message').text("Type을 선택해 주세요.");
			$('#modal_alert').modal();
			return;
		}
		// 현재 사양 : Type 하나만 선택 가능
		if($('input[name="prdtTyp"]:checked').length > 1) {
			$('#alert_title').text("ID 등록 오류");
			$('#alert_message').text("Type은 하나만 선택해 주세요.");
			$('#modal_alert').modal();
			return;
		}
		
		var paramData = $('#idRegForm').serialize();
		if($('#idRegForm input[name="prdtMappSeq"]').val().trim().length == 0) {
			paramData = $('input[name!="prdtMappSeq"]', '#idRegForm').serialize();
		}
		$('#confirm_title').text("ID 등록");
		$('#confirm_message').text("저장하시겠습니까");
		$('#confirm_type').val("regEpsdRsluId");
		$('#modal_confirm').modal();
	},
	that.fn_btnOk_alert = function(){
		$('#modal_alert').modal('toggle');
	},
	that.fn_btnOk_confirm = function(){
		var type = $('#confirm_type').val();
		switch(type){
			case "regCancel" : 
				$('input[name="pdID"]').val('');
				$('#modal_confirm').modal('toggle');
				$('#modal_regID').modal('toggle');
				break;
			case "regEpsdRsluId" :
				var currentPageNo = $('#item-list_paginate').find('span').find('.current').text();
				currentPageNo = parseInt( ((currentPageNo - 1)*10));
				var paramData = $('#idRegForm').serialize();
				if($('#idRegForm input[name="prdtMappSeq"]').val().trim().length == 0) {
					paramData = $('input[name!="prdtMappSeq"]', '#idRegForm').serialize();
				}

				$.ajax({
					url: ctx + '/kcontent/regEpsdRsluId.ajax',
					data: paramData,
					type: 'post',
					success: function(r) {
						that.listTable(currentPageNo);
						if(r.resultCode == '200') {
							$('#alert_title').text("ID 등록");
							$('#alert_message').text("저장했습니다.");
							$('#modal_alert').modal();
							$.each($('#idRegForm').serializeArray(), function(i, field) {
								if(field.name != 'prdtTyp') {
									$('input[name=' + field.name + ']').val('');
								}
							});
							$('#idRegForm input[type="checkbox"]').prop('checked', false);
							$('#modal_regID').modal('toggle');
						} else if(r.resultCode == '302') {
							$('#alert_title').text("ID 등록 실패");
							$('#alert_message').text("이미 등록된 epsdRsluID입니다.");
							$('#modal_alert').modal();
							$('input[name=epsdRsluID]').focus();
						} else {
							$('#alert_title').text("ID 등록 실패");
							$('#alert_message').text("ID등록 처리가 실패했습니다.");
							$('#modal_alert').modal();
						}
					},
					error: function(e) {
						that.listTable(currentPageNo);
						$('#alert_title').text("ID 등록 실패");
						$('#alert_message').text("ID등록 처리가 실패했습니다.");
						$('#modal_alert').modal();
					}
				});
				$('#modal_confirm').modal('toggle');
				break;
			case "comfNonDisplay" :
				that.procNonDisplay();
				break;
			case "downloadProcess" :
				that.downloadProcess();
				break;
			case "kcoverCreate" :
				that.kcoverCreate();
				break;
		}
	},
	that.fn_btnCancel_confirm = function(){
		kcontents_id = '';
		$('#modal_confirm').modal('toggle');
	}	
};
