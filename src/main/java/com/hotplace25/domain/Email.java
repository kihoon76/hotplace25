package com.hotplace25.domain;

public class Email {

	private String subject = "Hotplace25에서 알려드립니다.";
	private Account account;
	private String accountId;
	private String content = "";
	
	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getEmailBody() {
		StringBuilder sb = new StringBuilder();
		
		sb.append("<table style=\"width:500px; border:1px solid red;\" >");
		sb.append("<tbody>");
		sb.append("<tr>");
		sb.append("<td>" + content + "</td>");
		sb.append("</tr>");
		
		sb.append("</tbody>");
		sb.append("</table>");
		
		
		return sb.toString();
	}
	
	
}
