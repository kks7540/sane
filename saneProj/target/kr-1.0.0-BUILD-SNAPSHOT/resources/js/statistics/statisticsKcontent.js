
var statisticsKcontent = new function() {
	var that = this;
	that.init = function() {
		// init script 
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
		//초기화 버튼
		$('#clearBtn').click(function() {
			that.fn_clearBtn();
		});	
		//검색 버튼
		$('#searchBtn').click(function(startDate,endDate) {
			that.fn_searchBtn();
		});			
		//엑셀 버튼
		$('#excelBtn').click(function() {
			var target = "_self";
			var atchFileId = "";
			var filePath = "";
			$.post(ctx+"/statistics/kcontents/kcontentExcelCreate.ajax",
						{ startDate:  $("#start_date").val(), endDate: $("#end_date").val() },
						function(r){

							window.open(ctx+"/cmm/fms/fileDownload.do?atchFileId="+encodeURI(r.fileName)+"&filePath="+encodeURI(r.filePath), target, "width=400px,height=180px");		
						}
			);

		});	
		url = ctx + '/statistics/kcontents/kcontentTotal.ajax?'+"startDate="+$("#start_date").val()+"&endDate="+$("#end_date").val();
		that.selectTotalList(url); 
	},
	that.selectTotalList = function(url) {
		
		$.ajax ({
			url : url ,
			type : "post",
			dataType : "json",
			data : {},
			error : function() {
				alert('현재 조회 서비스가 원할하지 않습니다.\n 잠시후 다시 이용해 주십시요.');
				return;
			},
			success: function(data) { 
				that.createDataTable(data);
			}
		});
		
	},
	that.createDataTable = function(data) {
		var totalList = data.totalList;
		var table = $('.table-framed');
		var tbody = table.find('tbody');
		tbody.empty();
		if(totalList != null && totalList.length > 0) {
			$.each(totalList, function(index, obj){
				var dvcTyp = obj.dvcTyp;
				var tr = $('<tr/>', {
				});
				var tdPrdtNm = $('<td/>', {
					class : 'type_stbId'
					, text : obj.prdtNm
				});
				var tdEpsdRsluId = $('<td/>', {
					class : 'type_stbId'
					, text : obj.epsdRsluId
				});
				var tdInsert = $('<td/>', {
					text : obj.iCount
				});		
				
				var tdMDownload = $('<td/>', {
					text : obj.mdCount
				});
				
				var tdSDoanload = $('<td/>', {
					text : obj.sdCount
				});
				
				tr.append(tdPrdtNm);
				tr.append(tdEpsdRsluId);				
				tr.append(tdInsert);
				tr.append(tdMDownload);
				tr.append(tdSDoanload);
				tbody.append(tr);
				
			});
			
		} else {
			
			var tr = $('<tr/>', {
			});
			var td = $('<td/>', {
				colspan : 5
				, class : 'text-center'
				, text : '조회 결과가 없습니다'
			});
			tr.append(td);
			tbody.append(tr);
		}
	},
	that.fn_clearBtn = function(){
		that.init();
	},
	//조건 조회 버튼
	that.fn_searchBtn = function(startDate,endDate){
		var startDate = $("#start_date").val();
		var endDate = $("#end_date").val();	
		url = ctx + '/statistics/kcontents/kcontentTotal.ajax?'+"startDate="+startDate+"&endDate="+endDate;
		that.selectTotalList(url);
	}
};
