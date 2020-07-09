var statisticsDeviceChart = new function() {
	var that = this;
	var chart_option = {
		title: {
        	 text : '',
        	 textStyle : {
        		 fontSize : 14,
        		 fontWeight : 'bold'
        	 },
        },
        // Setup grid
        grid: {
        	 left: '3%',
             right: '4%',
             bottom: '3%',
             containLabel: true
        },
        // Add tooltip
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
        },
        // Add legend
        legend: {
        	textStyle : {
        		fontSize : 14,
        		fontWeight : 'bold'
        	},
            data: ['Android', 'IOS', 'ETC']
        },
        // Hirozontal axis
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: [
                ''
            ]
        }],
        // Vertical axis
        yAxis: [{
            type: 'value'
        }],
        // Add series
        series: [
            {
                name: 'Android',
                type: 'line',
                smooth: false,
                symbol: 'none',
                data: ['1','2']
            },
            {
                name: 'IOS',
                type: 'line',
                smooth: false,
                symbol: 'none',
                data: ['1','2']
            },
            {
                name: 'ETC',
                type: 'line',
                smooth: false,
                symbol: 'none',
                data: ['1','2']
            }
        ]
    };
	
	that.init = function() {
		// init script
		var dvcTyp = $('#dvcTyp').val();
		
		if( !(dvcTyp != null && dvcTyp == 'TOTAL') ) {
			$('#selectLogTyp').append('<option value="all">전체</option>');
		}
		
		$('#selectLogTyp').append('<option value="1000">등록</option>');
		$('#selectLogTyp').append('<option value="2000">다운로드</option>');
		
		that.selectList();
		
		$('#selectLogTyp').change(function(){
			that.selectList();
		});
		
		$('.btn').click(function() {
			$('#listForm').attr('method', 'post');
			$('#listForm').attr('action', ctx + '/statistics/device/device.do');
			$('#listForm').submit();
		})
		
	},
	
	that.selectList = function() {
		var url;
		var dvcTyp = $('#dvcTyp').val();
		if( !(dvcTyp != null && dvcTyp == 'TOTAL') ) {
			url = ctx +"/statistics/device/deviceChartModel.ajax";
		} else {
			url = ctx +"/statistics/device/deviceChartTotal.ajax";
		}
		
		$.ajax ({
			url : url,
			type : "post",
			dataType : "json",
			data : {
				startDate : $('#defaultSDate').val(),
				endDate : $('#defaultEDate').val(),
				dvcModl : $('#dvcModl').val()
			},
			error : function() {
				alert('현재 조회 서비스가 원할하지 않습니다.\n 잠시후 다시 이용해 주십시요.');
				return;
			},
			success: function(data) { 
				that.drawChart(data);
			}
		});
	},
	
	that.drawChart = function(data) {
		var dvcTyp = $('#dvcTyp').val();
		if( !(dvcTyp != null && dvcTyp == 'TOTAL') ) {
			that.setChartModlOption(data);
		} else {
			that.setChartTotalOption(data);
		}
		
		require.config({
			paths: {
				echarts: ctx+'/resources/assets/js/plugins/visualization/echarts'
			}
		});
		
		require (
			[
				'echarts',
				'echarts/theme/limitless',
	            'echarts/chart/bar',
	            'echarts/chart/line'
	        ],
	        
	        function (ec, limitless) {
				var chart = ec.init($('#deviceChart')[0], limitless);
				chart.setOption(chart_option);
	            window.onresize = function () {
	                setTimeout(function () {
	                	chart.resize();
	                }, 200);
	            };
	            
	            
	        }
	    );
	},
	
	that.setChartTotalOption = function(data) {
		var list = data.chartList;
		var listDate = [];
		var startDate = $('#defaultSDate').val();
		var endDate = $('#defaultEDate').val();
		that.getDateRange(startDate, endDate, listDate);
		chart_option.title.text = 'TOTAL';
		chart_option.xAxis[0].data = [];
		chart_option.xAxis[0].data = listDate;
		chart_option.legend.data = [];
		chart_option.legend.data = ['Android', 'IOS', 'ETC'];
		
		var adrList = [];
		var iosList = [];
		var etcList = [];
		
		$.each(listDate, function(dateIndex, dateObj){
			adrList.push('0');
			iosList.push('0');
			etcList.push('0');
		});
		
		$.each(listDate, function(dateIndex, dateObj){
			$.each(list, function(index, obj){
				var dateUpCount;
				var dateDownCount;
				var count;
				
				if( dateObj == obj.regDt ) {
					dateUpCount = obj.uploadCount;
					dateDownCount = obj.downloadCount;
					
					if($('#selectLogTyp').val() == '1000') {
						count = dateUpCount;
					} else {
						count = dateDownCount;
					}
					
					if( obj.dvcTyp == 'ADR' ) {
						adrList[dateIndex] = count;
					} else if ( obj.dvcTyp == 'IOS' ) {
						iosList[dateIndex] = count;
					} else if ( obj.dvcTyp == 'ETC' ) {
						etcList[dateIndex] = count;
					}
				}
				
			});
		});
		
		chart_option.series = [];
		
		var adrData = {
        	name : 'Android',
        	type : 'line',
        	smooth : false,
        	symbol: 'none',
        	itemStyle: {
                normal: {
                    color: '#E88F41',
                    lineStyle: {      
                        width: 3
                    }
                }
            },
        	data : adrList
        };
		chart_option.series.push(adrData);
		
		var iosData = {
        	name : 'IOS',
        	type : 'line',
        	smooth : false,
        	symbol: 'none',
        	itemStyle: {
                normal: {
                    color: '#6190E8',
                    lineStyle: {      
                        width: 3
                    }
                }
            },
        	data : iosList
        };
		chart_option.series.push(iosData);
		
		var etcData = {
        	name : 'ETC',
        	type : 'line',
        	smooth : false,
        	symbol: 'none',
        	itemStyle: {
                normal: {
                    color: '#89FF54',
                    lineStyle: {      
                        width: 3
                    }
                }
            },
        	data : etcList
        };
		chart_option.series.push(etcData);
		
		
		console.log(chart_option.series);
	},
	
	that.setChartModlOption = function(data) {
		var list = data.chartList;
		var listDate = [];
		var startDate = $('#defaultSDate').val();
		var endDate = $('#defaultEDate').val();
		that.getDateRange(startDate, endDate, listDate);
		chart_option.title.text = $('#dvcModl').val();
		chart_option.xAxis[0].data = [];
		chart_option.xAxis[0].data = listDate;
		chart_option.legend.data = [];
		
		if($('#selectLogTyp').val() == 'all') {
			chart_option.legend.data = ['등록', '다운로드'];
		} else if( $('#selectLogTyp').val() == '1000' )	{
			chart_option.legend.data = ['등록'];
		} else if ( $('#selectLogTyp').val() == '2000' ) {
			chart_option.legend.data = ['다운로드'];
		}
		
		var upList = [];
		var downList = [];
		
		$.each(listDate, function(dateIndex, dateObj){
			upList.push('0');
			downList.push('0');
		});
		
		$.each(listDate, function(dateIndex, dateObj){
			$.each(list, function(index, obj){
				var dateUpCount;
				var dateDownCount;
				var count;
				if( dateObj == obj.regDt ) {
					
				    if( $('#selectLogTyp').val() == '1000' )	{
				    	upList[dateIndex] = obj.uploadCount;
					} else if ( $('#selectLogTyp').val() == '2000' ) {
						downList[dateIndex] = obj.downloadCount;
					} else {
						upList[dateIndex] = obj.uploadCount;
						downList[dateIndex] = obj.downloadCount;
					}
					
				}
			});
		});
		
		chart_option.series = [];
		
		
		var upData = {
        	name : '등록',
        	type : 'line',
        	smooth : false,
        	symbol: 'none',
        	itemStyle: {
                normal: {
                    color: '#E88F41',
                    lineStyle: {      
                        width: 3
                    }
                }
            },
        	data : upList
        };
		
		var downData = {
        	name : '다운로드',
        	type : 'line',
        	smooth : false,
        	symbol: 'none',
        	itemStyle: {
                normal: {
                    color: '#6190E8',
                    lineStyle: {      
                        width: 3
                    }
                }
            },
        	data : downList
        };
		
		 if( $('#selectLogTyp').val() == '1000' )	{
			 chart_option.series.push(upData);
		} else if ( $('#selectLogTyp').val() == '2000' ) {
			chart_option.series.push(downData);
		} else {
			chart_option.series.push(upData);
			chart_option.series.push(downData);
		}
		
		console.log(chart_option.series);
	},
	
	that.getDateRange = function(startDate, endDate, listDate) {
		
		var start = startDate.substring(0,4) + '-' + startDate.substring(5,7) + '-' + startDate.substring(8,10);
		var end = endDate.substring(0,4) + '-' + endDate.substring(5,7) + '-' + endDate.substring(8,10);
		var sDate = new Date(start+'T09:00:00Z');
		var eDate = new Date(end+'T09:00:00Z');
		var dateMove = new Date(start+'T09:00:00Z');
		if(sDate == eDate) {
			var strDate = dateMove.toISOString().slice(0,10);
			strDate = strDate.substring(0,4) + '.' + strDate.substring(5,7) + '.' + strDate.substring(8,10);
			listDate.push(strDate);
		} else {
			while ( dateMove <= eDate )
				{
				    var strDate = dateMove.toISOString().slice(0, 10);
				    strDate = strDate.substring(0,4) + '.' + strDate.substring(5,7) + '.' + strDate.substring(8,10);
				    listDate.push(strDate);
				    dateMove.setDate(dateMove.getDate() + 1);
				}
		}
	}
	
};
