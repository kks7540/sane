<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript" src="${custom_js_path}/common/leftMenu.js"></script>
<script type="text/javascript">
	$(function() {

		leftMenu.init();
		mngrUpdateBtn = function(){
			$('#mngr_id').val('${sessionScope.loginAdminVO.userId}');
			$('#mngr_name').val('${sessionScope.loginAdminVO.userNm}');
			$('#mngr_password').val('${sessionScope.loginAdminVO.userPwd}');
			$('#mngr_dept').val('${sessionScope.loginAdminVO.userDept}');
			$('#mngr_regDt').val('${sessionScope.loginAdminVO.userRegDt}');
			$('#mngr_rcntConnDt').val('${sessionScope.loginAdminVO.rcntConnDt}');
			var authority = '${sessionScope.loginAdminVO.userAutr}';
			// A : 시스템관리자, S : 서비스 관리자, U : 일반 관리자
			switch(authority){
				case "A" :
					$('#mngr_authority').val('시스템 관리자');
					$('#mngr_userAutr').val("A");
					break;
				case "S" :
					$('#mngr_authority').val('서비스 관리자');
					$('#mngr_userAutr').val("S");
					break;
				case "U" :
					$('#mngr_authority').val('일반 관리자');
					$('#mngr_userAutr').val("U");
					break;
			}

			var userEmail = '${sessionScope.loginAdminVO.userEmail}';

			var sIndex = userEmail.indexOf('@');
			var length = userEmail.length;
			var emailF_u = userEmail.substring(0,sIndex);
			var emailB_u = userEmail.substring(sIndex+1,length);
			$('#mngr_emailF').val(emailF_u);
			$('#mngr_emailB').val(emailB_u);
			var contr = '${sessionScope.loginAdminVO.contr}';
			var arr = contr.split('-');
			$('#mngr_telF').val(arr[0]);
			$('#mngr_telM').val(arr[1]);
			$('#mngr_telB').val(arr[2]);
			if('${sessionScope.loginAdminVO.useYn}'=="Y"){
				$('#mngr_use_Y').val("사용");
			}else{
				$('#mngr_use_Y').val("중지");
			}
			$('#modal_mngr_update').modal();
		}
	});

</script>
<div class="sidebar sidebar-main sidebar-fixed">
	<div class="sidebar-content">

		<!-- User menu -->
		<div class="sidebar-user">
			<div class="category-content">
				<div class="media">
					<a href="#" class="media-left"><img src="${assets_img_path }/placeholder.jpg" class="img-circle img-sm" alt=""></a>
					<div class="media-body">
					<c:choose>
							<c:when test="${empty sessionScope.loginAdminVO}">
								</c:when>
								<c:otherwise>
									<span class="media-heading text-semibold"><c:out value="${sessionScope.loginAdminVO.userId}"/></span>
									<div class="text-size-mini text-muted">
									<b><c:out value="${sessionScope.loginAdminVO.userNm}"/>님</b>
									</div>
								</c:otherwise>
					</c:choose>
						<div class="sidebar-user-material-menu">
							<a href="#user-nav" data-toggle="collapse"><span style="font-size: 14px">My account</span> <i class="caret"></i></a>
						</div>
					</div>
					<div class="navigation-wrapper collapse" id="user-nav">
						<ul class="navigation">
							<li><a style="cursor:pointer" onclick="mngrUpdateBtn()"><i class="icon-user-plus"></i> <span>회원 정보 수정</span></a></li>
							<!-- <li><a href="#"><i class="icon-switch2"></i> <span>로그아웃</span></a></li> -->
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- /user menu -->


		<!-- Main navigation -->
		<div class="sidebar-category sidebar-category-visible">
			<div class="category-content no-padding">
				<ul class="navigation navigation-main navigation-accordion">
					<!-- Main -->
					<c:choose>
					<c:when test="${sessionScope.loginAdminVO.userAutr eq 'A'}">
					<li id="leftMenu1" class="step1">
						<a href="#"><i class="icon-user"></i> <span>관리자 관리</span></a>
						<ul></ul>
					</li>
					<li id="leftMenu2" class="step1">
						<a href="#"><i class="icon-file-empty"></i> <span>CP 컨텐츠 관리</span></a>
						<ul>
							<li class="step2"><a href="#" >K-Contents</a></li>
							<li class="step2"><a href="#" >K-GeneralSticker</a></li>
							<li class="step2"><a href="#" >K-CustomSticker</a></li>
						</ul>
					</li>
					<li id="leftMenu3" class="step1">
						<a href="#"><i class="icon-file-play"></i> <span>KUC 관리</span></a>
						<ul></ul>
					</li>
					<li id="leftMenu4" class="step1">
						<a href="#" ><i class="icon-stats-dots"></i> <span>통계 관리</span></a>
						<ul>
							<li class="step2"><a href="#" >디바이스 별 통계</a></li>
							<li class="step2"><a href="#" >동화 별 통계</a></li>
							<li class="step2"><a href="#" >사용자 별 통계</a></li>
						</ul>
					</li>
					<li id="leftMenu5" class="step1">
						<a href="#"><i class="icon-cog"></i> <span>설정</span></a>
						<ul></ul>
					</li>
					<!-- <li id="leftMenu6" class="step1">
						<a href="#"><i class="icon-sync"></i> <span>Scheduler 관리</span></a>
						<ul></ul>
					</li> -->
					</c:when>
					<c:otherwise>
					<li id="leftMenu2" class="step1">
						<a href="#"><i class="icon-file-empty"></i> <span>CP 컨텐츠 관리</span></a>
						<ul>
							<li class="step2"><a href="#" >K-Contents</a></li>
							<li class="step2"><a href="#" >K-GeneralSticker</a></li>
							<li class="step2"><a href="#" >K-CustomSticker</a></li>
						</ul>
					</li>
					<li id="leftMenu3" class="step1">
						<a href="#"><i class="icon-file-play"></i> <span>KUC 관리</span></a>
						<ul></ul>
					</li>
					<li id="leftMenu4" class="step1">
						<a href="#" ><i class="icon-stats-dots"></i> <span>통계</span></a>
						<ul>
							<li class="step2"><a href="#" >디바이스 별 통계</a></li>
							<li class="step2"><a href="#" >동화 별 통계</a></li>
							<li class="step2"><a href="#" >사용자 별 통계</a></li>
						</ul>
					</li>
					<!-- <li id="leftMenu6" class="step1">
						<a href="#"><i class="icon-sync"></i> <span>Scheduler 관리</span></a>
						<ul></ul>
					</li> -->
					</c:otherwise>
					</c:choose>
					<!-- /main -->
				</ul>
			</div>
		</div>
		<form id="menuMoveForm"></form>
		<!-- /main navigation -->
	</div>
</div>

		<!--Update Modal popup -->
		<div id="modal_mngr_update" class="modal fade">
			<div class="modal-dialog" style="width: 800px;">
				<div class="modal-content" >
					<div class="modal-header bg-success">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h5 class="modal-title">내 정보 관리</h5>
					</div>
						<form action="${ctx}/account/updateMyMngr.do" method="post" accept-charset="utf-8" name="mngr_updateForm" id="mngr_updateForm" >
							<div class="modal-body">
								<div class="form-group" >
								<!-- Table 시작. -->
								<table class="table table-xxs table-bordered table-striped">
									<tbody>
										<!-- 아이디 -->
										<tr style="height:43px">
											<th class="col-sm-1 text-right" style="width: 130px;"><i class="icon-user"></i> 아이디</th>
											<td class="col-sm-3 text-left" style="width: 262px;padding-left: 0px;">
												<div class="col-sm-4" style="padding-left: 12px; padding-right: 0px;">
													<input type="text" class="form-control col-sm-4" style="height:30px;width:221px;border:0px" id="mngr_id" name="userId" readonly/>
												</div>
											</td>
										<!-- 상태 -->
											<th class="col-sm-2 text-right" ><i class="icon-checkmark4"></i> 상태</th>
												<td class="col-sm-3" style="width: 262px;">
													<input type="text" style="height:30px;width:221px;border:0px;padding-left: 12px;" id="mngr_use_Y" readonly>
													<input type="hidden" id="use_YN" name="useYn" value="Y"/>
												</td>
										</tr>
										<!-- 이름 -->
										<tr>
											<th class="col-sm-2 text-right"><i class="icon-user"></i> 이름</th>
											<td class="col-sm-4" >
												<input type="text" class="form-control col-sm-4" placeholder="" style="height:30px" id="mngr_name" name="userNm"/>
											<!--	<div class="col-sm-12"><span class="text-danger" id="name_Error" style="font-size:4px"></span></div> -->
											</td>
											<!-- 소속 부서 -->
											<th class="col-sm-2 text-right"><i class="icon-user"></i> 소속 부서</th>
											<td class="col-sm-4">
												<input type="text" class="form-control col-sm-4" placeholder="" style="height:30px" id="mngr_dept" name="userDept"/>
											</td>
											</td>
										</tr>
										<tr>
										<!-- 비밀번호 -->
											<th class="col-sm-2 text-right"><i class="icon-lock5"></i> 비밀번호</th>
											<td class="col-sm-4 " colspan="4" >
												<input type="password" class="form-control col-sm-4" style="height:30px;width:221px;border:0px" id="mngr_password" name="userPwd" readonly/>
												<div class="col-sm-2" style="padding-left: 15px; padding-right: 0px;">
													<button type="button" class="btn btn-secondary input-sm" id="mngr_pwdChangeBtn" style="height:30px; text:bold;"><b>비밀번호 변경</b></button>
												</div>
											</td>
										</tr>
										<!-- 권한 -->
										<tr>
											<th class="col-sm-2 text-right"><i class="icon-user-lock"></i> 권한 </th>
											<td class="col-sm-4" colspan="4">
												<input type="text" class="form-control col-sm-4" style="height:30px;width:221px;border:0px" id="mngr_authority" readonly>
												<input type="hidden" id="mngr_userAutr" name="userAutr"/>
											</td>
										</tr>
										<!-- E-mail -->
										<tr>
											<th class="col-sm-2 text-right"><i class="icon-envelop5"></i> E-mail</th>
											<td class="col-sm-4" colspan="4" style="padding-right:0px;">

	   											<input type="text" class="form-control col-sm-1" style="height:33px;width:150px" id="mngr_emailF" name="mngr_emailF"/>
												<div class="form-control-static col-sm-1 text-center"  style="height:30px;"><span > @ </span></div>
													<input type="text" class="form-control col-sm-1"style="height:33px;width:150px" id="mngr_emailB" name="mngr_emailB"/>
												<div class="col-sm-3" style="padding-left: 10px; padding-right: 0px;">
													<select class="form-control col-sm-3" style="height:33px;width:160px;" id="mngr_selectMailAddr">
														<option value="none" selected> 직접 입력</option>
														<option value="naver.com">naver.com</option>
														<option value="hanmail.com">hanmail.com</option>
														<option value="nate.com">nate.com</option>
														<option value="gmail.com">gmail.com</option>
														<option value="hotmail.com">hotmail.com</option>
													</select>
												</div>
													<input type="hidden" id="mngr_email" name="userEmail"/>
											</td>
										</tr>
										<!-- 연락처 -->
										<tr>
											<th class="col-sm-2 text-right"><i class="icon-address-book"></i> 연락처 </th>
											<td class="col-sm-4" colspan="4" style="padding-right:0px;">
												<input type="text" class="form-control col-sm-2" placeholder="" style="height:33px;width:105px" id="mngr_telF" name="mngr_telF" />
												<div class="form-control-static col-sm-1 text-center"  style="height:30px;height:30px;width: 30px;padding-left: 5px;padding-right: 5px; ">
												<span> - </span></div>
												<input type="text" class="form-control col-sm-2" placeholder="" style="height:33px;width:105px" id="mngr_telM" name="mngr_telM"/>
												<div class="form-control-static col-sm-1 text-center"  style="height:30px; height:30px;width: 30px;padding-left: 5px;padding-right: 5px;">
												<span> - </span></div>
												<input type="text" class="form-control col-sm-2" placeholder="" style="height:33px;width:105px" id="mngr_telB" name="mngr_telB"/>
											</td>
											<input type="hidden" id="mngr_contr" name="contr"/>
										</tr>
										<!-- 등록일 -->
										<tr style="height:43px">
											<th class="col-sm-1 text-right" style="width: 130px;"><i class="icon-calendar3"></i>등록일</th>
											<td class="col-sm-3 text-left" style="width: 262px;">
												<div class="col-sm-4" style="padding-left: 1px; padding-right: 0px;">
													<input type="text" class="form-control col-sm-4" style="height:30px;width:221px;border:0px" id="mngr_regDt" name="mngr_regDt" readonly/>
												</div>
											</td>
										<!-- 최근 접속일 -->
											<th class="col-sm-2 text-right" ><i class="icon-calendar3"></i>최근 접속일</th>
												<td class="col-sm-3" style="width: 262px;">
												<div class="col-sm-4" style="padding-left: 1px; padding-right: 0px;">
													<input type="text" class="form-control col-sm-4" style="height:30px;width:221px;border:0px" id="mngr_rcntConnDt" name="mngr_rcntConnDt" readonly/>
												</div>
												</td>
										</tr>
										<tr>
										<td class="col-sm-4" colspan="4">
											<div class="form-group">
							                <div class="form-group text-center" >
							                    <button type="button" class="btn btn-primary" id="mngr_saveMngrBtn"  style="width:80px">저장</button>
							                    <button type="button" class="btn btn-secondary" id="mngr_closeMngrBtn" style="width:80px">취소</button>
							                </div>
							            </div>
										</td>
										</tr>
										<input type="hidden" id="url" name="url"/>
										<input type="hidden" id="modrId" name="modrId" value="${sessionScope.loginAdminVO.userId}"/>
									</tbody>
								</table>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- /Update Modal popup -->

		<!--비밀번호 변경 Modal popup -->
		<div id="modal_pwdChange" class="modal fade">
			<div class="modal-dialog" style="width: 500px;">
				<div class="modal-content" >
					<div class="modal-header bg-info">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h5 class="modal-title">비밀번호 변경</h5>
					</div>
							<div class="modal-body"  style="height: 370px;">
								<div class="form-group" >
								※ 비밀번호는 영문, 숫자, 특수문자 조합으로 8~10자로 입력해 주세요
								<HR  align="left" style="color:#CCCCCC; background-color:#CCCCCC; height:1px; border:none;margin-bottom: 15px;" />
									<span class="form-control col-sm-4 text-right" style="height:30px;width:140px;border:0px">
									현재 비밀번호
									</span>
									<input type="password" class="form-control col-sm-4" style="width:300px;height:30px" id="PwdTxt_now" />
								<br/><br/>
								<HR  align="left" style="color:#CCCCCC; background-color:#CCCCCC; height:1px; border:none;margin-bottom: 15px;margin-top: 5px;" />
									<span class="form-control col-sm-4 text-right" style="height:30px;width:140px;border:0px">
									새 비밀번호
									</span>
									<input type="password" class="form-control col-sm-4" style="width:300px;height:30px" id="pwdTxt_new" />
								<br/><br/>
								<HR  align="left" style="color:#CCCCCC; background-color:#CCCCCC; height:1px; border:none;margin-bottom: 15px;margin-top: 5px;" />
									<span class="form-control col-sm-4 text-right" style="height:30px;width:140px;border:0px">
									새 비밀번호 확인
									</span>
									<input type="password" class="form-control col-sm-4" style="width:300px;height:30px" id="pwdTxt_newChk" name="userPwd"/>
								<br/><br/>
								<HR  align="left" style="color:#CCCCCC; background-color:#CCCCCC; height:1px; border:none;margin-bottom: 15px;margin-top: 5px;" />
	              				<br/>
	              				  <div class="form-group text-center" >
				                    <button type="button" class="btn btn-primary" id="pwdChangSaveBtn"  style="width:80px">확인</button>
				                    <button type="button" class="btn btn-secondary" id="pwdChangCloseBtn" style="width:80px">취소</button>
				                  </div>
								</div>
							</div>
				</div>
			</div>
		</div>
		<!--/비밀번호 변경 Modal popup -->

        <!-- alert modal -->
		<div id="modal_alert_leftMenu" class="modal fade" data-backdrop="false">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h5 class="modal-title" id="alert_title_leftMenu"></h5>
					</div>

					<div class="modal-body" id="alert_message_leftMenu">
					</div>
					<input type="hidden" id="alert_type_leftMenu"/>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" id="btnOk_alert_mngr">확인</button>
						<!-- <button type="button" class="btn btn-link" data-dismiss="modal">취소</button> -->
						<!--<button type="button" class="btn btn-default" id="btnCancel">취소</button>-->
					</div>
				</div>
			</div>
		</div>
		<!-- /alert modal -->

        <!-- confirm modal -->
		<div id="modal_confirm_leftMenu" class="modal fade" data-backdrop="false">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h5 class="modal-title" id="confirm_title_leftMenu"></h5>
					</div>

					<div class="modal-body" id="confirm_message_leftMenu">
					</div>
					<input type="hidden" id="confirm_type_leftMenu"/>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" id="btnOk_confirm_mngr">확인</button>
						<!-- <button type="button" class="btn btn-link" data-dismiss="modal">취소</button> -->
						<button type="button" class="btn btn-default" id="btnCancel_confirm_mngr">취소</button>
					</div>
				</div>
			</div>
		</div>
		<!-- /confirm modal -->
