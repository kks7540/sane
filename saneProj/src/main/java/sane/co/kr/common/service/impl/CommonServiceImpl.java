package sane.co.kr.common.service.impl;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import sane.co.kr.common.dao.CommonDAO;
import sane.co.kr.common.service.CommonService;
import sane.co.kr.common.vo.LoginVO;
import sane.co.kr.common.vo.UserMastVO;
import sane.co.kr.core.CommonUtils;

/**
 * 관리자 로그인 ServiceImpl
 *
 * @author 금강산
 * @since 2020. 07. 10
 * @version 1.0
 * @see
 *
 *      <pre>
* == 개정이력(Modification Information) ==
*
* 수정일         수정자       수정내용
* -------    -------- ---------------------------
 *
 *      </pre>
 */
@Service("sane.co.kr.common.commonService")
public class CommonServiceImpl implements CommonService {

	@Resource(name = "sane.co.kr.common.commonDAO")
	private CommonDAO commonDAO;

	@Resource(name = "sane.co.kr.core.commonUtils")
	private CommonUtils commonUtils;

	@Override
	public Map<String, Object> loginValChk(LoginVO loginVO, HttpServletResponse response) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		// 패스워드 암호화
		String password = commonUtils.encryptHashString(loginVO.getUserPwd());
		loginVO.setUserPwd(password);

		//UserVO userMastVO = commonDAO.selectLoginuserMastVO(loginVO);

		//test
		UserMastVO userMastVO= new UserMastVO();
		if(!"sane".equals(loginVO.getUserId()) && !"sanePwd".equals(loginVO.getUserPwd())) {
			userMastVO = null;
		}else {
			userMastVO.setUserId("sane");
			userMastVO.setUserId("sanePwd");
			userMastVO.setAuthId("M");//MASTER 계정
			userMastVO.setUseYn("Y");
		}


		// ID, PASSWORD 확인.
		if (userMastVO == null) {
			resultMap.put("result", "false");
			resultMap.put("message", "아이디 또는 비밀번호를 확인 후 \n 다시 입력해 주세요.");
			return resultMap;
		}
		// 사용 / 중지 상태 확인.
		if ("N".equals(userMastVO.getUseYn())) {
			resultMap.put("result", "false");
			resultMap.put("message", "사용이 중지된 계정입니다. \n 관리자에게 문의해 주세요.");
			return resultMap;
		}
		resultMap.put("result", "true");
		resultMap.put("message", "로그인 성공.");
		// cookie 관리.
		Cookie cookie = null;
		if ("Y".equals(loginVO.getCkb1())) {
			cookie = new Cookie("userId", URLEncoder.encode(loginVO.getUserId()));
			cookie.setMaxAge(60 * 60 * 24 * 365);
			response.addCookie(cookie);
		} else {
			cookie = new Cookie("userId", null);
			cookie.setMaxAge(0);
			response.addCookie(cookie);
		}

		return resultMap;
	}

	@Override
	public UserMastVO selectLoginUserInfo(LoginVO loginVO) throws Exception {
		// 패스워드 암호화
		String password = commonUtils.encryptHashString(loginVO.getUserPwd());
		loginVO.setUserPwd(password);
		//test
		UserMastVO userMastVO= new UserMastVO();
		userMastVO.setUserId("sane");
		userMastVO.setUserId("sanePwd");
		userMastVO.setAuthId("M");//MASTER 계정
		userMastVO.setUseYn("Y");
		//commonDAO.selectLoginUserMastVO(loginVO)
		return userMastVO;
	}

	@Override
	public void updateLoginDate(UserMastVO userInfo) throws Exception {
		// 날짜 업데이트

	}

/*	@Override
	public UserVO selectLoginuserMastVO(LoginVO loginVO) throws Exception {
		// 패스워드 암호화
		String password = commonUtils.encryptHashString(loginVO.getPwd());
		loginVO.setPwd(password);
		return loginMapper.selectLoginuserMastVO(loginVO);
	}

	@Override
	public void updateRcntConnDt(UserVO userMastVO) throws Exception {
		loginMapper.updateRcntConnDt(userMastVO);

	}*/

}
