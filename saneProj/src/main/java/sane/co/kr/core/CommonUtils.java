package sane.co.kr.core;

import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import org.springframework.stereotype.Repository;

/**
 * common Utils
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

@Repository("sane.co.kr.core.commonUtils")
public class CommonUtils {

	public static Random random = new Random();
	// private static final byte[] buf = new byte[1024];
	/*protected Log log = LogFactory.getLog(this.getClass());*/
	/**
	 * 바이트값 표시때 참조되는 char 배열
	 */
	private static final char[] hex = "0123456789ABCDEF".toCharArray();

	/**
	 * 넘겨받은 2자리의 prefix 를 합쳐서 20자리의 sequence key 를 만들어서 반환한다.
	 *
	 * @return
	 */
	public String getSequenceKey20Length(String prefix) {

		String result;

		Date date = new Date();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyMMddHHmmssSSS");

		result = simpleDateFormat.format(date) + String.valueOf(random.nextInt(999999999)).substring(0, 2);

		result = prefix + "_" + result;

		return result;

	}

	/**
	 * 10자리의 sequence key 를 만들어서 반환한다.
	 *
	 * @param prefix
	 * @return
	 */
	public int getSequenceKey10Length() {

		int result = (int) System.currentTimeMillis();
		result = result * -1;
		/* return String.valueOf(result); */
		return result;

	}

	/**
	 * SHA-256 암호화 데이터를 16진수문자열로 리턴한다.
	 *
	 * @return
	 */
	public String encryptHashString(String plainText) throws Exception {
		if (plainText == null || plainText.isEmpty() || plainText.trim().equals("")) {
			return "";
		}

		byte[] byteText = plainText.getBytes("EUC-KR");
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		md.update(byteText);
		return bytesToHex(md.digest());
	}

	/**
	 * 바이트배열의 값을 16진수 문자열로 변환
	 *
	 * <pre></pre>
	 */
	public String bytesToHex(byte[] b) {

		if (b == null) {
			return "";
		}

		char[] ret = new char[b.length * 2];
		for (int i = 0, j = 0; i < b.length; ++i) {
			ret[j++] = hex[(b[i] & 0xF0) >> 4];
			ret[j++] = hex[b[i] & 0xF];
		}
		return new String(ret);
	}

	/**
	 * SHA-512 암호화 데이터를 16진수문자열로 리턴한다.
	 *
	 * @return
	 */
	public String genAuthKey(String plainText) throws Exception {
		if (plainText == null || plainText.isEmpty() || plainText.trim().equals("")) {
			return "";
		}

		plainText += String.valueOf(random.nextInt(999999999)).substring(0, 5);
		byte[] byteText = plainText.getBytes("EUC-KR");
		MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(byteText);
		return bytesToHex(md.digest());
	}



}
