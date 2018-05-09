package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("QnA")
public class QnA {

	private String seq;					//일련번호
	private String phone;				//연락처
	private String reqTime;				//요청일자
	private String processTime;			//처리일자
	private String processor;			//처리자 계정
	private String question;			//문의사항
	private String processYN;			//처리여부
	private String processContent;		//처리내용
	
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getReqTime() {
		return reqTime;
	}
	public void setReqTime(String reqTime) {
		this.reqTime = reqTime;
	}
	public String getProcessTime() {
		return processTime;
	}
	public void setProcessTime(String processTime) {
		this.processTime = processTime;
	}
	public String getProcessor() {
		return processor;
	}
	public void setProcessor(String processor) {
		this.processor = processor;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getProcessYN() {
		return processYN;
	}
	public void setProcessYN(String processYN) {
		this.processYN = processYN;
	}
	public String getProcessContent() {
		return processContent;
	}
	public void setProcessContent(String processContent) {
		this.processContent = processContent;
	}
}
