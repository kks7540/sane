<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="/WEB-INF/views/common/common.jsp"%>
<script type="text/javascript" src="${custom_js_path}/kuc/mngKuc.js"></script>
<script type="text/javascript">
	$(function () {
		// 메뉴 설정
		setLeftMenu(3);
	});
</script>

</head>
<body class="navbar-top">
	<input type="hidden" id="defaultSDate" value="${defaultSDate}" />
	<input type="hidden" id="defaultEDate" value="${defaultEDate}" />
	<!-- Main navbar -->
	<%@ include file="/WEB-INF/views/layout/header.jsp" %>
	<!-- /Main navbar -->

	<!-- Page container -->
	<div class="page-container">

		<!-- Page content -->
		<div class="page-content">

			<!-- Main sidebar -->
			<%@ include file="/WEB-INF/views/common/leftMenu.jsp"%>
			<!-- /main sidebar -->


			<!-- Main content -->
			<div class="content-wrapper">

				<!-- Page header -->
				<div class="page-header page-header-default">
					<div class="page-header-content">
						<div class="page-title">
							<h4>
								<span class="text-bold">KUC 관리</span>
							</h4>
						</div>
					</div>
					<div class="breadcrumb-line">
						<ul class="breadcrumb">
							<li><i class="icon-file-play position-left"></i>KUC 관리 </li>
						</ul>
					</div>
				</div>

				<!-- /page header -->


				<!-- Content area -->
				<div class="content">

					<div class="panel panel-flat">
					<div class="panel-body">
						<div class="form-group">
							<form class="form-horizontal">
								<table class="table table-xxs table-bordered table-striped">
									<tbody>
									<tr>
										<th class="col-sm-1">STB ID</th>
											<td class="col-sm-2">
												<input type="text" class="form-control col-sm-3" style="width:300px" placeholder="" id="searchStbId" />
											</td>
											<th class="col-sm-1">EPSD ID</th>
											<td class="col-sm-2">
												<input type="text" class="form-control col-sm-3" style="width:300px" placeholder="" id="searchEpsdId"/>
											</td>
									</tr>
									<tr>
										<th class="col-sm-1">디바이스</th>
											<td class="col-sm-2" colspan="3" >
												<select class="form-control" id="searchDeviceOS" style="width:300px">
													<option value="none"> 전체 </option>
													<option value="Android"> Android </option>
													<option value="iOS"> iOS </option>
													<option value="etc"> 기타 </option>
											</select></td>
									</tr>
									<tr>
										<th class="col-sm-1">등록일자</th>
											<td class="col-sm-2 " colspan="3" >
												<div class="input-group">
													<span class="input-group-addon"><i class="icon-calendar22"></i></span>
													<input type="text" class="form-control daterange-single" id="start_date">
												<span class="input-group-addon" style="border-top-width: 0px;border-bottom-width: 0px;border-right-width: 0px;border-left-width: 0px;">
													~ </span>
													<span class="input-group-addon"><i class="icon-calendar22"></i></span>
														<input type="text" class="form-control daterange-single" id="end_date">
													<span class="input-group-addon" style="height:20px;width: 45px;padding-bottom: 0px;padding-top: 0px;padding-right:0px;border-bottom-width: 0px;
															border-top-width: 0px;border-right-width: 0px;border-left-width: 0px;">
														<input type="button" style="border-radius:10px" class="form-control btn btn-default" value="일주일" id="oneWeekBtn">
													</span>
													<span class="input-group-addon" style="height:20px;width: 45px;padding-bottom: 0px;padding-top: 0px;padding-right:0px;border-bottom-width: 0px;
															border-top-width: 0px;border-right-width: 0px;border-left-width: 0px;">
														<input type="button" style="border-radius:10px" class="form-control btn btn-default" value="1개월" id="oneMonthBtn">
													</span>
													<span class="input-group-addon" style="height:20px;width: 45px;padding-bottom: 0px;padding-top: 0px;border-bottom-width: 0px;
															border-top-width: 0px;border-right-width: 0px;">
														<input type="button" style="border-radius:10px" class="form-control btn btn-default" value="3개월" id="threeMonthBtn">
													</span>
												</div>
											</td>
									</tr>
									</tbody>
								</table>
								</form>
								</div>
							<div class="form-group text-center">
								<button type="button" class="btn btn-secondary" id="clearBtn">초기화</button>
								<button type="button" class="btn btn-info" id="searchBtn">검색</button>
								<button type="button" class="btn btn-info" style="position: absolute; right : 0;visibility:hidden;" id="kucDeleteBtn">삭제</button>
							</div>
						<table id="item-list" class="table datatable-basic table-bordered table-striped table-hover">
								<!-- <thead>
									<th style="max-width : 5%;">번호</th>
									<th style="max-width : 5%;">KUC ID</th>
									<th style="max-width : 5%;">STB ID</th>
									<th style="max-width : 5%;">EPSD RESOLUTION ID</th>
									<th style="max-width : 10%;">PRODUCT ID</th>
									<th style="max-width : 10%;">상품명</th>
									<th style="max-width : 10%;">Device ID</th>
									<th style="max-width : 10%;">타입</th>
									<th style="max-width : 10%;">등록일</th>
									<th style="max-width : 10%;">디바이스 (OS)</th>
									<th style="max-width : 10%;">모델명</th>
									<th style="max-width : 10%;">Sticker ID</th>
								</thead> -->
						</table>
						</div>
					</div>

					<!-- footer -->
					<%@ include file="/WEB-INF/views/layout/footer.jsp"%>
					<!-- /footer -->
				</div>
				<!-- /content area -->

			</div>
			<!-- /main content -->

		</div>
		<!-- /page content -->

	</div>
	<!-- /page container -->
</body>
</html>