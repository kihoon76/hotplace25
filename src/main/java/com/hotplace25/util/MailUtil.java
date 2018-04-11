package com.hotplace25.util;

import java.util.Properties;
import java.util.Random;

import javax.annotation.Resource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

import com.hotplace25.domain.Account;
import com.hotplace25.domain.ApplicationConfig;
import com.hotplace25.domain.Email;
import com.hotplace25.service.UserService;

@Component("mailUtil")
public class MailUtil {
	
	@Resource(name="userService")
	UserService userService;
	
	@Resource(name="applicationConfig")
	ApplicationConfig applicationConfig;

	public void sendMail(Email email) throws AddressException, MessagingException {
		
		if("off".equals(applicationConfig.getValue("C3"))) {
			throw new MessagingException("메일발송옵션이 off 입니다.");
		}
		
		String[] values = applicationConfig.getBigo("C3").split(",");
		
		if(values.length != 5) {
			throw new MessagingException("메일설정이 잘못되었습니다.");
		}
		
		String host = values[0].trim(); //"smtp.naver.com";
		String userName = values[2].trim(); //"upmc2013";
		String password = values[3].trim(); //"up##2080";
		int port = Integer.parseInt(values[4].trim()); //587(naver) 465(gmail);
		
		if(email.getAccount() == null) {
			email.setAccount(userService.getUserInfo(email.getAccountId()));
		}
		
		String recipient = email.getAccount().getEmail();
		String subject = email.getSubject();
		String body = email.getEmailBody();
		
		Properties props = System.getProperties();
		// SMTP 서버 정보 설정
		props.put("mail.smtp.host", host); 
		props.put("mail.smtp.port", port); 
		props.put("mail.smtp.auth", "true"); 
				
		if("smtp.naver.com".equals(host)) {
			props.put("mail.smtp.starttls.enable", "true"); 
		}
		else if("smtp.gmail.com".equals(host)) {
			props.put("mail.smtp.ssl.enable", "true"); 
			props.put("mail.smtp.ssl.trust", host);
		}
		
		Session session = Session.getDefaultInstance(props, new Authenticator() {
			String un = userName;
			String pw = password;
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(un, pw);
			}
		});
		
		session.setDebug(true);
		
		Message mimeMessage = new MimeMessage(session);
		mimeMessage.setFrom(new InternetAddress(values[1].trim())); //"upmc2013@naver.com"
		
		mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
		
		mimeMessage.setSubject(subject);
		mimeMessage.setContent(body, "text/html; charset=UTF-8");
		Transport.send(mimeMessage);
	}
	
	public String getRandomPassword(String type, int cnt) {
		StringBuffer strPwd = new StringBuffer();

		char str[] = new char[1];

		
		if (type.equals("P")) {// 특수기호 포함
			for (int i = 0; i < cnt; i++) {
				str[0] = (char) ((Math.random() * 94) + 33);
				strPwd.append(str);
			}
		} 
		else if (type.equals("A")) { // 대문자로만
			for (int i = 0; i < cnt; i++) {
				str[0] = (char) ((Math.random() * 26) + 65);
				strPwd.append(str);
			}
		} 
		else if (type.equals("S")) {// 소문자로만
			for (int i = 0; i < cnt; i++) {
				str[0] = (char) ((Math.random() * 26) + 97);
				strPwd.append(str);
			}
		}
		else if (type.equals("I")) {// 숫자형으로
			int strs[] = new int[1];
			for (int i = 0; i < cnt; i++) {
				strs[0] = (int) (Math.random() * 9);
				strPwd.append(strs[0]);
			}
		} 
		else if (type.equals("C")) {// 소문자, 숫자형
			Random rnd = new Random();
			for (int i = 0; i < cnt; i++) {
				if (rnd.nextBoolean()) {
					strPwd.append((char) ((int) (rnd.nextInt(26)) + 97));
				}
				else {
					strPwd.append((rnd.nextInt(10)));
	
				}
			}
		}

		return strPwd.toString();
	}
	
}
