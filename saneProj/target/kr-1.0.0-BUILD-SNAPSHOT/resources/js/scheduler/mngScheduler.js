
var mngScheduler = new function() {
	var that = this;
	var url = "";
	
	that.init = function() {
		that.listTable(0);
	},
	
	that.listTable = function(pageNum) {
		that.listDataTable(pageNum);
	},
	
	that.listDataTable = function(pageNum) {
		var url = url = ctx + '/scheduler/mngSchedulerList.ajax';
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
            	{ title : '일련번호', data : 'fileBatSeq', width: '10%', className : 'text-center table-word-break'},
            	{ title : 'EPSD RSLU ID', data : 'epsdRsluId', width: '25%', className : 'text-center table-word-break'  },
            	{ title : '상품ID', data : 'prdtId', width: '15%', className : 'text-center table-word-break'  },
            	{ title : '상품명', data : 'prdtNm', width: '20%', className : 'text-center table-word-break'  },
				{ title : '성공여부', data : 'succTyp', width: '10%', className : 'text-center table-word-break'  },
				{ title : '배치카운트', data : 'batCnt', width: '10%', className : 'text-center table-word-break'  },
				{ title : '등록일시', data : 'regDt', width: '10%', className : 'text-center table-word-break'  },
              ],
              columnDefs : [ 
				    { orderable : false, targets : [0, 1, 2, 3, 4, 5, 6], render : function (data, type, row, meta) {
				    	return data;
				    }}
				   /* { orderable : false, targets : [7], render : function (data, type, row, meta) {
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
				    }},	*/			    
				],
				
		});
		
	}
};
