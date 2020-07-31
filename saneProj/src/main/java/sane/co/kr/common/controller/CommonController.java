package sane.co.kr.common.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;

import sane.co.kr.common.service.CommonService;
import sane.co.kr.common.vo.LoginVO;
import sane.co.kr.common.vo.UserMastVO;

/**
 * Handles requests for the application home page.
 */
@Controller
public class CommonController {

	@Resource(name = "sane.co.kr.common.commonService")
	private CommonService commonService;

	private static final Logger logger = LoggerFactory.getLogger(CommonController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/common/login.do", method = RequestMethod.GET)
	public String login(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate );

		return "common/login";
	}
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/common/main.do", method = RequestMethod.GET)
	public String main(Locale locale, Model model) {
		logger.info("Welcome main! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate );

		return "common/main";
	}
	/** 관리자 로그인 유효성검사
	 *
	 * @param request
	 * @param response
	 * @param loginVO
	 * @param model
	 * @param status
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/common/loginValChk.do")
	@ResponseBody
	public Map<String, Object> loginValChk(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute("loginVO") LoginVO loginVO, ModelMap model, SessionStatus status) throws Exception {
		logger.info("[loginValChk.do] loginVO : " + loginVO);
		//test
		Map<String, Object> resultMap = commonService.loginValChk(loginVO, response);
		return resultMap;
	}

	/** 관리자 로그인 처리
	 *
	 * @param request
	 * @param response
	 * @param loginVO
	 * @param model
	 * @param status
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/common/afterAdminLogin.do")
	public String afterAdminLogin(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute("loginVO") LoginVO loginVO, ModelMap model, SessionStatus status) throws Exception {
		logger.info("[afterAdminLogin.do] loginVO : " + loginVO);

		String unHashPassword =loginVO.getUserPwd();
		UserMastVO userInfo = commonService.selectLoginUserInfo(loginVO);
		logger.info("[afterAdminLogin.do] userInfo : " + userInfo);

		// 접속 일시 업데이트
		commonService.updateLoginDate(userInfo);

		userInfo.setUserPw(unHashPassword);
		request.getSession().setAttribute("userMastVO", userInfo);
		// 중복 submit방지
		status.setComplete();

		return "redirect:/common/main.do";
	}
	/** 관리자 로그인아웃 처리.
	 *
	 * @param request
	 * @param response
	 * @param loginVO
	 * @param model
	 * @param status
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/common/afterAdminLogout.do")
	public String afterAdminLogout(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute("loginVO") LoginVO loginVO, ModelMap model, SessionStatus status) throws Exception {
		logger.info("[afterAdminLogin.do] loginVO : " + loginVO);

		HttpSession session = request.getSession();
		session.setAttribute("loginVO", null);
		session.invalidate();
		// 중복 submit방지
		status.setComplete();

		return "redirect:/common/login.do";
	}
}
