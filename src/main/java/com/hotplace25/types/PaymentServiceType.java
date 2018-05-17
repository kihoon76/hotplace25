package com.hotplace25.types;

import java.util.EnumSet;

public enum PaymentServiceType {

	WITH_ALL("ALL"), WITH_EACH("EACH");
	
	private String type;
	
	PaymentServiceType(String type) {
		this.type = type;
	}
	
	public String getValue() {
		return type;
	}
	
	public static PaymentServiceType getType(String type) {
		for(PaymentServiceType p : EnumSet.allOf(PaymentServiceType.class)) {
			if(type.equals(p.getValue())) {
				return p;
			}
		}
		
		throw new IllegalArgumentException(type + "값은 유효하지 않습니다.");
	}
}
