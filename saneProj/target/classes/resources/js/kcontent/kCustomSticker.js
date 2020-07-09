
var kCustomSticker = new function() {
	var ksticker_id = '';
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
            sAjaxSource : ctx + '/kcontent/kCustomStickerList.ajax' + SEARCH_PARAM,
            sServerMethod: 'POST',
            columns: [
            	{ title : '번호', data : '', width: '7%', className : 'text-center' },
            	{ title : '썸네일', data : 'thumbnailURL', width: '10%', className : 'text-center'  },
            	{ title : '상품ID', data : 'id', width: '15%', className : 'text-center' },
				{ title : '상품명', data : 'name', width: '20%', className : 'text-center'  },
				{ title : '설명', data : 'desc', width: '28%', className : 'text-center', defaultContent: ''  },
				{ title : '등록일', data : 'regDate', width: '8%', className : 'text-center'  },
				{ title : '전시/비전시', data : 'id', width: '10%', className : 'text-center'  }
              ],
              columnDefs : [ 
				    { orderable : false, targets : 0, render : function ( data, type, row, meta ) {
				    	var curPage = that.table.page.info().page;
				    	return curPage * 10 + 1 + meta.row;
				    }},
				    /*
				    { orderable : false, targets : 1, render : function ( data, type, row, meta ) {
				    	return '<a href="javascript:void(0);" onclick="kCustomSticker.imagePop(\'' + data + '\');"><img src=\'' + data + '\'/ style="height:40px;"></a>';
				    }},
				    */
				    { orderable : false, targets : 1, render : function ( data, type, row, meta ) {
				    	return '<img src=\'' + data + '\'/ style="height:40px;">';
				    }},
				    { orderable : false, targets : [2, 3, 4, 5], render : function (data, type, row, meta) {
				    	return data;
				    }},
				    { orderable : false, targets : 6, render : function ( data, type, row, meta ) {
				    	return '<button type="button" class="btn btn-danger" onclick="kCustomSticker.comfNonDisplay(\'' + data + '\');">비전시</button>';
				    }}
				]
				
		});
		
	},
	that.comfNonDisplay = function(id) {
		kcontents_id = id;
		$('#confirm_title').text("비전시 처리");
		$('#confirm_message').text("해당상품이 비전시 처리됩니다.\n계속 진행 하시겠습니까?");
		$('#confirm_type').val("comfNonDisplay");		
		$('#modal_confirm').modal();
	},
	that.procNonDisplay = function() {
		$.ajax({
			url: ctx + '/kcontent/procNonDisplay.ajax',
			data: {'id': kcontents_id},
			type: 'post',
			success: function(r) {
				if(r.resultCode == '200') {
					that.listTable(PAGE_NUM);
					$('#modal_confirm').modal('toggle');
				} else {
					$('#alert_title').text("비전시 처리 실패");
					$('#alert_message').text("비전시 처리가 실패했습니다.");
					$('#modal_alert').modal();
					that.listTable(PAGE_NUM);
					$('#modal_confirm').modal('toggle');
				}
			},
			error: function(e) {
				$('#alert_title').text("비전시 처리 실패");
				$('#alert_message').text("비전시 처리가 실패했습니다.");
				$('#modal_alert').modal();
				that.listTable(PAGE_NUM);
				$('#modal_confirm').modal('toggle');
			}
		});
	},
	that.imagePop = function(url) {
		$('#modal_image').find('div.modal-body').children('img').attr('src', url);
		$('#modal_image').modal();
	},
	that.fn_btnOk_alert = function(){
		$('#modal_alert').modal('toggle');
	},
	that.fn_btnOk_confirm = function(){
		var type = $('#confirm_type').val();
		switch(type){
			case "comfNonDisplay" : 
				that.procNonDisplay();
				break;
		}
	},
	that.fn_btnCancel_confirm = function(){
		kcontents_id = '';
		$('#modal_confirm').modal('toggle');
	}
};
