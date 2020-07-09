var statisticsDevice = new function() {
	var that = this;
	that.init = function() {
		// init script
		
		var defaultSDate = $('#defaultSDate').val();
		var defaultEDate = $('#defaultEDate').val();
		
		if( (defaultSDate != null && defaultSDate != '' && defaultSDate.trim().length > 0) 
				|| (defaultEDate != null && defaultEDate != '' && defaultEDate.trim().length > 0)  ) {
			$('#start_date').val(defaultSDate);
			$('#end_date').val(defaultEDate);
			that.datePickerChange();
		} else {
			$('#start_date').val(lastWeek());
			$('#end_date').val(today());
			that.datePickerChange();
		}
		
		$('#searchBtn').click(function(){
			that.selectTotalList();
		});
		
		$('#clearBtn').click(function(){
			$('#start_date').val(lastWeek());
			$('#end_date').val(today());
			that.datePickerChange();
			that.selectTotalList();
		});
		
		
		$('#oneWeekBtn').click(function(){
			$('#start_date').val(lastWeek());
			$('#end_date').val(today());
			that.datePickerChange();
		});
		
		$('#oneMonthBtn').click(function(){
			$('#start_date').val(lastMonth());
			$('#end_date').val(today());
			that.datePickerChange();
		});
		
		$('#threeMonthBtn').click(function(){
			$('#start_date').val(threeMonthAgo());
			$('#end_date').val(today());
			that.datePickerChange();
		});
		
		that.selectTotalList();
	};
	
	that.clickTd = function(obj) {
		if(!obj.hasClass('total')) {
			var icon = obj.find('i');
			var type;
			var table = $('.table-framed');
			if (obj.hasClass('adr')) {
				type = 'adr';
			} else if (obj.hasClass('ios')) {
				type = 'ios';
			} else if (obj.hasClass('stb')) {
				type = "stb";
			} else if (obj.hasClass('etc')) {
				type = "etc";
			}
			
			$.each(table.find('.type_td'), function() {
				if( !$(this).hasClass(type) && !$(this).hasClass('total') ) {
					if ( $(this).find('i').hasClass('icon-chevron-down') ) {
						$(this).find('i').removeClass('icon-chevron-down');
						$(this).find('i').addClass('icon-chevron-right');
					}
				}
			});
			
			if (icon.hasClass('icon-chevron-right')) {
				icon.removeClass('icon-chevron-right');
				icon.addClass('icon-chevron-down');
				that.addChild(type, obj);
			} else {
				icon.removeClass('icon-chevron-down');
				icon.addClass('icon-chevron-right');
				that.removeChild(type, obj);
			}
		} else {
			
			var form = $('#chartForm');
			form.empty();
			
			var inputSdate = $('<input/>', {
				type : 'hidden',
				name : 'startDate',
				value : $('#start_date').val()
			});
			var inputEdate = $('<input/>', {
				type : 'hidden',
				name : 'endDate',
				value : $('#end_date').val()
			});
			
			var inputDvcTyp = $('<input/>', {
				type : 'hidden',
				name : 'dvcTyp',
				value : 'TOTAL'
			});
			
			form.append(inputSdate);
			form.append(inputEdate);
			form.append(inputDvcTyp);
			$('body').append(form);
			
			$('#chartForm').attr('method', 'post');
			$('#chartForm').attr('action', ctx + '/statistics/device/deviceChart.do');
			$('#chartForm').submit();
		}
		
		$('.pre-scrollable-table').scrollTop(0);
	};

	that.addChild = function(type, obj) {
		var table = $('.table-framed');
		$.each(table.find('tr'), function(index) {
			if ($(this).hasClass('adr_tr') || $(this).hasClass('ios_tr') || $(this).hasClass('stb_tr') || $(this).hasClass('etc_tr')) {
				$(this).remove();
			}
		});
		
		var dvcTyp = obj.text();
		var eq = obj.parent().index();
		that.selectModelList(dvcTyp, eq);
	};

	that.removeChild = function(type, obj) {
		var table = $('.table-framed');
		var hasClass;
		if (type == 'adr') {
			hasClass = 'adr_tr';
		} else if (type == 'ios') {
			hasClass = 'ios_tr';
		} else if (type == 'stb') {
			hasClass = 'stb_tr';
		} else if (type == 'etc') {
			hasClass = 'etc_tr';
		}
		$.each(table.find('tr'), function(index) {
			if ($(this).hasClass(hasClass)) {
				$(this).remove();
			}
		});
	};
	
	that.selectTotalList = function() {
		
		$.ajax ({
			url : ctx +"/statistics/device/deviceTotal.ajax",
			type : "post",
			dataType : "json",
			data : {
				startDate : $('#start_date').val(),
				endDate : $('#end_date').val(),
			},
			error : function() {
				alert('현재 조회 서비스가 원할하지 않습니다.\n 잠시후 다시 이용해 주십시요.');
				return;
			},
			success: function(data) { 
				that.createTotalTable(data);
			}
		});
		
	};
	
	that.selectModelList = function(dvcTyp, eq) {
		
		$.ajax ({
			url : ctx +"/statistics/device/deviceModel.ajax",
			type : "post",
			dataType : "json",
			data : {
				dvcTyp : dvcTyp,
				startDate : $('#start_date').val(),
				endDate : $('#end_date').val(),
			},
			error : function() {
				alert('현재 조회 서비스가 원할하지 않습니다.\n 잠시후 다시 이용해 주십시요.');
				return;
			},
			success: function(data) { 
				that.createModelTable(data, eq, dvcTyp);
			}
		});
		
	};
	
	that.createTotalTable = function(data) {
		var totalList = data.totalList;
		var table = $('.table-framed');
		var tbody = table.find('tbody');
		tbody.empty();
		if(totalList != null && totalList.length > 0) {
			var etcObj = null;
			$.each(totalList, function(index, obj){
				var dvcTyp = obj.dvcTyp;
				if( dvcTyp != 'ETC' ) {
					var tr = $('<tr/>', {
					});
					var tdTitle = $('<td/>', {
						class : 'type_td'+' '+that.getDeviceType(dvcTyp) + ' mouse-pointer'
						, text : dvcTyp
					});
					
					var icon = $('<i/>', {
						class : 'icon-chevron-right pull-right'
					});
					
					tdTitle.append(icon);
					
					var tdUpload = $('<td/>', {
						text : obj.uploadCount
					});
					
					var tdDoanload = $('<td/>', {
						text : obj.downloadCount
					});
					
					tr.append(tdTitle);
					tr.append(tdUpload);
					tr.append(tdDoanload);
					if( 'TOTAL' == dvcTyp) {
						tdTitle.find('i').remove();
						tbody.prepend(tr);
					} else {
						tbody.append(tr);
					}
				} else {
					etcObj = obj;
				}
			});
			
			if( etcObj != null ) {
				var etcDvcTyp = etcObj.dvcTyp;
				var tr = $('<tr/>', {
				});
				var tdTitle = $('<td/>', {
					class : 'type_td'+' '+that.getDeviceType(etcDvcTyp)  + ' mouse-pointer'
					, text : etcDvcTyp
				});
				
				var icon = $('<i/>', {
					class : 'icon-chevron-right pull-right'
				});
				
				tdTitle.append(icon);
				
				var tdUpload = $('<td/>', {
					text : etcObj.uploadCount
				});
				
				var tdDoanload = $('<td/>', {
					text : etcObj.downloadCount
				});
				
				tr.append(tdTitle);
				tr.append(tdUpload);
				tr.append(tdDoanload);
				tbody.append(tr);
			}
			
			
			$('.type_td').bind('click', function() {
				that.clickTd($(this));
			});
			
		} else {
			var tr = $('<tr/>', {
			});
			var td = $('<td/>', {
				colspan : 3
				, class : 'text-center'
				, text : '조회 결과가 없습니다'
			});
			tr.append(td);
			tbody.append(tr);
		}
	};
	
	
	
	that.createModelTable = function(data, eq, dvcTyp) {
		var table = $('.table-framed');
		// 실제 데이터 추가해서 for문 실행
		var list = data.modelList;
		$.each(list, function(index, obj) {
			var i = index + 1;
			
			var tr = $('<tr/>', {
				class : that.getDeviceType(dvcTyp) + '_tr'
			});
			
			var tdTitle = $('<td/>', {
				class : 'mouse-pointer modlTd'
			});
			var tdTitleSpan = $('<span/>', {
				style : 'padding-left : 20px',
				text : obj.dvcModl
			});
			
			tdTitle.append(tdTitleSpan);
			
			var tdUpload = $('<td/>', {
				text : obj.uploadCount
			});
			
			var tdDownload = $('<td/>', {
				text : obj.downloadCount
			});
			
			tr.append(tdTitle);
			tr.append(tdUpload);
			tr.append(tdDownload);
			table.find('tr').eq(eq + i).after(tr);
		});
		
		$('.modlTd').bind('click', function(){
			var form = $('#chartForm');
			form.empty();
			var inputSdate = $('<input/>', {
				type : 'hidden',
				name : 'startDate',
				value : $('#start_date').val()
			});
			var inputEdate = $('<input/>', {
				type : 'hidden',
				name : 'endDate',
				value : $('#end_date').val()
			});
			
			var inputDvcModl = $('<input/>', {
				type : 'hidden',
				name : 'dvcModl',
				value : $(this).find('span').text()
			});
			
			form.append(inputSdate);
			form.append(inputEdate);
			form.append(inputDvcModl);
			
			$('#chartForm').attr('method', 'post');
			$('#chartForm').attr('action', ctx + '/statistics/device/deviceChart.do');
			$('#chartForm').submit();
			
		});
		
	};
	
	that.getDeviceType = function(type) {
		var result;
		switch(type) {
			case 'TOTAL' :
				result = 'total';
				break;
			case 'ADR' :
				result = 'adr';
				break;
			case 'IOS' :
				result = 'ios';
				break;
			case 'STB' :
				result = 'stb';
				break;
			case 'ETC' :
				result = 'etc';
				break;
		}
		return result;
	};
	
	that.datePickerChange = function() {
		$('#start_date').daterangepicker({
			singleDatePicker: true,
	        locale: {
	            format: 'YYYY.MM.DD'
	        }
		}).trigger('change');
		
		$('#end_date').daterangepicker({
			singleDatePicker: true,
	        locale: {
	            format: 'YYYY.MM.DD'
	        }
		}).trigger('change');
	};
};
