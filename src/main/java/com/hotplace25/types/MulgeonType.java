package com.hotplace25.types;

import java.util.EnumSet;

public enum MulgeonType {
	GYEONGMAE("K"), GONGMAE("G"), BOSANG("B"), PYEONIB("P"), SILGEOLAE("S"), ACCEPT_BUILDING("U");
	
	private String type;
	
	MulgeonType(String type) {
		this.type = type;
	}
	
	public String getValue() {
		return type;
	}
	
	public static MulgeonType getType(String type) {
		for(MulgeonType t : EnumSet.allOf(MulgeonType.class)) {
			if(type.equals(t.getValue())) return t;
		}
		
		throw new IllegalArgumentException(type + "값은 유효하지 않습니다.");
	}
}
