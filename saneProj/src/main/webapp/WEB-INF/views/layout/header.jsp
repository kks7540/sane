<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript">
$(function() {
		$('#logoutBtn').click(function(){
			$('#confirm_title_header').text("로그아웃 확인");
			$('#confirm_message_header').text("로그아웃 하시겠습니까? ");
			$('#confirm_type_header').val("");
			$('#modal_confirm_header').modal();
		});
		$('#confirmOkBtn').click(function(){
			console.log(ctx);
			location.href = ctx + '/login/afterAdminLogout.do';
		});
		$('#confirmCancelBtn').click(function(){
			$('#modal_confirm_header').modal('toggle');
		});
});
</script>
<!-- Main navbar -->
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-header">
		<a class="navbar-brand" href="main.do">Sane Admin</a>

		<ul class="nav navbar-nav visible-xs-block">
			<li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
			<li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
		</ul>
	</div>

	<div class="navbar-collapse collapse" id="navbar-mobile">
		<ul class="nav navbar-nav">
			<li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
		</ul>
	<c:choose>
		<c:when test="${empty sessionScope.loginAdminVO}">
		</c:when>
		<c:otherwise>
		<div class="navbar-right">
			<ul class="nav navbar-nav">
				<li>
					<p class="navbar-text">
						<i class="icon_user"></i>안녕하세요! <b><c:out value="${sessionScope.loginAdminVO.userNm}"/>님</b>
					</p>
				</li>
				<li>
					<p class="navbar-text">
						<span class="label bg-success" style="cursor:pointer" id="logoutBtn">로그아웃</span>
					</p>
				</li>
			</ul>
		</div>
		</c:otherwise>
	</c:choose>
	</div>
</div>
<!-- /main navbar -->
<!-- confirm modal -->
<div id="modal_confirm_header" class="modal fade" data-backdrop="false">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h5 class="modal-title" id="confirm_title_header"></h5>
			</div>
			<div class="modal-body" id="confirm_message_header">
			</div>
			<input type="hidden" id="confirm_type_header"/>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id="confirmOkBtn">확인</button>
				<!-- <button type="button" class="btn btn-link" data-dismiss="modal">취소</button> -->
				<button type="button" class="btn btn-default" id="confirmCancelBtn">취소</button>
			</div>
		</div>
	</div>
</div>
<!-- /confirm modal -->