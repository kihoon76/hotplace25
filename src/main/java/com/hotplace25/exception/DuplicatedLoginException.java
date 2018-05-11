package com.hotplace25.exception;

import org.springframework.security.core.AuthenticationException;

public class DuplicatedLoginException extends AuthenticationException {

	public DuplicatedLoginException(String msg) {
		super(msg);
	}
	
	public DuplicatedLoginException(String msg, Throwable t) {
		super(msg, t);
	}

}
