package com.hotplace25.domain;

import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("Payment")
public class Payment {

	private String serviceType;
	private List<String> serviceSubTypes;
	private int sum;
	
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public List<String> getServiceSubTypes() {
		return serviceSubTypes;
	}
	public void setServiceSubTypes(List<String> serviceSubTypes) {
		this.serviceSubTypes = serviceSubTypes;
	}
	public int getSum() {
		return sum;
	}
	public void setSum(int sum) {
		this.sum = sum;
	}
}
