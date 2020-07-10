package sane.co.kr.common.vo;

import java.io.Serializable;

@SuppressWarnings("serial")
public class LoginVO implements Serializable {

	private String userId;
	private String userPwd;
	private String ckb1;
	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * @return the userPwd
	 */
	public String getUserPwd() {
		return userPwd;
	}
	/**
	 * @param userPwd the userPwd to set
	 */
	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}
	/**
	 * @return the ckb1
	 */
	public String getCkb1() {
		return ckb1;
	}
	/**
	 * @param ckb1 the ckb1 to set
	 */
	public void setCkb1(String ckb1) {
		this.ckb1 = ckb1;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "LoginVO [userId=" + userId + ", userPwd=" + userPwd + ", ckb1=" + ckb1 + "]";
	}


}