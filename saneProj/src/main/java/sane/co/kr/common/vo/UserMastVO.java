package sane.co.kr.common.vo;

import java.io.Serializable;

@SuppressWarnings("serial")
public class UserMastVO implements Serializable {

	private String userId;
	private String userPw;
	private String userName;
	private String authId;
	private String email;
	private String fwrtDate;
	private String fwrtId;
	private String lupdDate;
	private String lupdId;
	private String useYn;
	private String loginDate;
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
	 * @return the userPw
	 */
	public String getUserPw() {
		return userPw;
	}
	/**
	 * @param userPw the userPw to set
	 */
	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}
	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	/**
	 * @return the authId
	 */
	public String getAuthId() {
		return authId;
	}
	/**
	 * @param authId the authId to set
	 */
	public void setAuthId(String authId) {
		this.authId = authId;
	}
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the fwrtDate
	 */
	public String getFwrtDate() {
		return fwrtDate;
	}
	/**
	 * @param fwrtDate the fwrtDate to set
	 */
	public void setFwrtDate(String fwrtDate) {
		this.fwrtDate = fwrtDate;
	}
	/**
	 * @return the fwrtId
	 */
	public String getFwrtId() {
		return fwrtId;
	}
	/**
	 * @param fwrtId the fwrtId to set
	 */
	public void setFwrtId(String fwrtId) {
		this.fwrtId = fwrtId;
	}
	/**
	 * @return the lupdDate
	 */
	public String getLupdDate() {
		return lupdDate;
	}
	/**
	 * @param lupdDate the lupdDate to set
	 */
	public void setLupdDate(String lupdDate) {
		this.lupdDate = lupdDate;
	}
	/**
	 * @return the lupdId
	 */
	public String getLupdId() {
		return lupdId;
	}
	/**
	 * @param lupdId the lupdId to set
	 */
	public void setLupdId(String lupdId) {
		this.lupdId = lupdId;
	}
	/**
	 * @return the useYn
	 */
	public String getUseYn() {
		return useYn;
	}
	/**
	 * @param useYn the useYn to set
	 */
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	/**
	 * @return the loginDate
	 */
	public String getLoginDate() {
		return loginDate;
	}
	/**
	 * @param loginDate the loginDate to set
	 */
	public void setLoginDate(String loginDate) {
		this.loginDate = loginDate;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "UserMastVO [userId=" + userId + ", userPw=" + userPw + ", userName=" + userName + ", authId=" + authId
				+ ", email=" + email + ", fwrtDate=" + fwrtDate + ", fwrtId=" + fwrtId + ", lupdDate=" + lupdDate
				+ ", lupdId=" + lupdId + ", useYn=" + useYn + ", loginDate=" + loginDate + "]";
	}



}