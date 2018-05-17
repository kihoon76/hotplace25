package com.hotplace25.types;

import java.util.EnumSet;

public enum PaymentServiceSubtype {

	MONTH("MONTH"), YEAR("YEAR"), TOOJA("TOOJA"), GYEONG_GONG("GYEONGGONG"), MULGEON("MULGEON"), HEAT_MAP("HEATMAP");
	
	private String type;
	
	PaymentServiceSubtype(String type) {
		this.type = type;
	}
	
	public String getValue() {
		return type;
	}
	
	public static PaymentServiceSubtype getType(String type) {
		for(PaymentServiceSubtype t : EnumSet.allOf(PaymentServiceSubtype.class)) {
			if(type.equals(t.getValue())) return t;
		}
		
		throw new IllegalArgumentException(type + "값은 유효하지 않습니다.");
	}
}
