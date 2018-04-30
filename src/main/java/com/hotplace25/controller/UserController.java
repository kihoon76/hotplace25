package com.hotplace25.controller;

import java.io.IOException;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hotplace25.domain.Account;
import com.hotplace25.domain.AjaxVO;
import com.hotplace25.service.UserService;
import com.hotplace25.util.SessionUtil;
import com.hotplace25.util.ValidationUtil;

@RequestMapping("/user")
@Controller
public class UserController {
	@Resource(name="userService")
	private UserService userService;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("join")
	@ResponseBody
	public AjaxVO join(@RequestBody Account account) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			boolean isValid = ValidationUtil.isValidAccount(account, true);
			
			if(!isValid) {
				vo.setSuccess(false);
				vo.setErrCode("999");
			}
			else {
				vo.setSuccess(true);
				account.setPassword(passwordEncoder.encode(account.getPassword()));
				userService.join(account);
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@GetMapping("checkId")
	@ResponseBody
	public AjaxVO checkDuplicateId(@RequestParam("id") String id) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			vo.setSuccess(true);
			boolean r = ("anonymoususer".equals(id.toLowerCase()) ? true : userService.checkDuplicateId(id));
			if(r) {
				vo.setErrCode("300"); //중복됨
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@PostMapping("modify")
	@ResponseBody
	public AjaxVO modifyUserInfo(@RequestBody Account account) throws JsonGenerationException, JsonMappingException, IOException {
		AjaxVO vo = new AjaxVO();
		vo.setSuccess(false);
		
		ObjectMapper m = new ObjectMapper();
		System.err.println(m.writeValueAsString(account));
		
		if(account.getPassword() != null && !"".equals(account.getPassword())) {
			boolean r = ValidationUtil.isValidAccount(account, true);
			
			if(!r) {
				vo.setSuccess(false);
				vo.setErrCode("999");
				return vo;
			}
			else {
				account.setPassword(passwordEncoder.encode(account.getPassword()));
			}
		}
		else {
			boolean r = ValidationUtil.isValidAccount(account, false);
			
			if(!r) {
				vo.setSuccess(false);
				vo.setErrCode("999");
				return vo;
			}
		}
		
		account.setId(SessionUtil.getSessionUserId());
		
		try {
			
			boolean r = userService.modifyUserInfo(account);
			if(r) {
				vo.setSuccess(true);
			}
			else {
				vo.setSuccess(false);
			}
		}
		catch(Exception e) {
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
}
