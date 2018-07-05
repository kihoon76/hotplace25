package com.hotplace25.security;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import com.hotplace25.domain.Account;
import com.hotplace25.domain.Authority;

public class UserDetailsImpl implements UserDetails {

	private Account account;
	
	public UserDetailsImpl(Account account) {
		
		this.account = account;
		
	}
	
	@Override
	public String getPassword() {
		return account.getPassword();
	}

	@Override
	public String getUsername() {
		return account.getId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public Account getAccount() {
		return account;
	}

	@Override
	public List<Authority> getAuthorities() {
		return account.getAuthorities();
	}

	@Override
	public boolean equals(Object o) {
		// TODO Auto-generated method stub
		System.err.println("=======================================0000000");
		if(o instanceof UserDetailsImpl) {
			 System.err.println("=======================================");
			 return account.getId().equals(((UserDetailsImpl) o).getAccount().getId());
		}
		
		System.err.println("=======================================11111111");
		return false;
	}

	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return account.getId().hashCode();
	}
	
	
}
