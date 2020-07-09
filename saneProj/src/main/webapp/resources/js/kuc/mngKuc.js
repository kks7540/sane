
var mngKuc = new function() {
	var that = this;
	var url = "";
	that.init = function() {
		// init script 

		url = ctx + '/kuc/mngKucList.ajax';
		that.listTable(0);
		//등록 날짜 지정.		
		var defaultSDate = $('#defaultSDate').val();
		var defaultEDate = $('#defaultEDate').val();
		if( (defaultSDate != null && defaultSDate != '' && defaultSDate.trim().length > 0) 
				|| (defaultEDate != null && defaultEDate != '' && defaultEDate.trim().length > 0)  ) {
			$('#start_date').val(defaultSDate);
			$('#end_date').val(defaultEDate);
		} else {
			$('#start_date').val(lastWeek())
			
			$('#end_date').val(today());
		}
		//등록일자 조회 일주일전 버튼
		$('#oneWeekBtn').click(function() {
			$('#start_date').val(lastWeek())
			$('#end_date').val(today());
		});
		//등록일자 조회 1개월 버튼
		$('#oneMonthBtn').click(function() {
			$('#start_date').val(lastMonth())
			$('#end_date').val(today());
		});
		//등록일자 조회 3개월 버튼
		$('#threeMonthBtn').click(function() {
			$('#start_date').val(threeMonthAgo())
			$('#end_date').val(today());
		});			
		//검색 조건 초기화
		$('#clearBtn').click(function() {
			that.fn_clearBtn();
		});			
		//조건 검색 버튼
		$('#searchBtn').click(function() {
			that.fn_searchBtn();
		});		
		//KUC 컨텐츠 삭제
		$('#kucDeleteBtn').click(function() {
			that.fn_kucDelteBtn();
		});		
	},
	that.listTable = function(pageNum) {
		that.listDataTable(pageNum);
	},
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
            autoWidth: false,
            columns: [
            	{ title : '번호', data : 'kucSeq', width: '5%', className : 'text-center table-word-break'},
				{ title : 'KUC ID', data : 'kucId', width: '8%', className : 'text-center table-word-break'  },
				{ title : 'STB ID', data : 'stbId', width: '12%', className : 'text-center table-word-break'  },
				{ title : 'EPSD RESOLUTION ID', data : 'epsdRsluId', width: '12%', className : 'text-center table-word-break'  },
				{ title : 'PRODUCT ID', data : 'prdtId', width: '8%', className : 'text-center table-word-break'  },
				{ title : '상품명', data : 'prdtNm', width: '10%', className : 'text-center table-word-break'  },
				{ title : 'Device ID', data : 'dvcId', width: '12%', className : 'text-center table-word-break'  },
				{ title : '타입', data : 'prdtTyp', width: '6%', className : 'text-center table-word-break'  },
				{ title : '등록일', data : 'regDt', width: '7%', className : 'text-center table-word-break'  },
				{ title : '디바이스 (OS)', data : 'dvcOs', width: '5%', className : 'text-center table-word-break'  },
				{ title : '모델명', data : 'dvcModel', width: '7%', className : 'text-center table-word-break'  },
				{ title : 'Sticker ID', data : 'stkId', width: '8%', className : 'text-center table-word-break'  }
              ],
              columnDefs : [ 
				    { orderable : false, targets : [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11], render : function (data, type, row, meta) {
				    	return data;
				    }},
				    { orderable : false, targets : [7], render : function (data, type, row, meta) {
				    	switch(data){
				    		case "100" :
				    			data = "말하기";
				    			break;
				    		case "010" :
				    			data = "그리기";
				    			break;
				    		case "001" : 
				    			data = "역할놀이"
				    			break;
				    	}
				    	return data;
				    }},				    
				],
				
		});
		
	},
	that.fn_clearBtn = function(){
		$('#searchStbId').val('');
		$('#searchEpsdId').val('');
		$('#searchDeviceOS').val("none").prop("selected", true);
		that.init();
	},
	that.fn_searchBtn = function(){
		var searchStbId = $('#searchStbId').val();
		var searchEpsdId = $("#searchEpsdId").val();
		var searchDeviceOS = $("#searchDeviceOS").val();
		var startDate = $('#start_date').val();
		var endDate = $('#end_date').val();
		url = ctx + '/kuc/mngKucList.ajax?'+"searchStbId="+encodeURI(searchStbId)+"&searchEpsdId="+encodeURI(searchEpsdId)+"&searchDeviceOS="+searchDeviceOS+"&startDate="+startDate+"&endDate="+endDate ;
		that.listTable(0);
	}
	that.fn_kucDelteBtn = function(){
		
		// 리스트 형식으로 controller에 전달.
		var checkArr = [];
		
		//checkArr.push("KUC_18052418255573380");
		//checkArr.push("KUC_18052418262731836");
		
		$.ajax ({
			url : ctx +"/kuc/mngKucDelete.ajax",
			type : "post",
			dataType : "text",
			data : {valueArr :checkArr},
			error : function() {
				alert("삭제실패");
			},
			success: function(r) { 
				if(r.result == 'Y') {
				alert("삭제성공");
				}
			}
		});
		
	}
	
};
