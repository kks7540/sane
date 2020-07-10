package sane.co.kr.common.service;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import sane.co.kr.common.vo.LoginVO;
import sane.co.kr.common.vo.UserMastVO;

/**
* 관리자 로그인 Service
* @author 금강산
* @since
* @version 1.0
* @see
*
* <pre>
* == 개정이력(Modification Information) ==
*
* 수정일         수정자       수정내용
* -------    -------- ---------------------------
*
* </pre>
*/
public interface CommonService {

	/**로그인 유효성 확인
	 * @param loginVO
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> loginValChk(LoginVO loginVO, HttpServletResponse response) throws Exception;

	/**사용자정보조회
	 * @param loginVO
	 * @return
	 * @throws Exception
	 */
	public UserMastVO selectLoginUserInfo(LoginVO loginVO)  throws Exception;

	/**사용자 로그인날짜 업데이트
	 * @param userInfo
	 */
	public void updateLoginDate(UserMastVO userInfo) throws Exception;
}
