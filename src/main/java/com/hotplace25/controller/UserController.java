package com.hotplace25.controller;

import java.io.IOException;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
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

@RequestMapping("/user")
@Controller
public class UserController {

	@Resource(name="userService")
	private UserService userService;
	
	@PostMapping("join")
	@ResponseBody
	public AjaxVO join(@RequestBody Account account) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			ObjectMapper m = new ObjectMapper();
			System.err.println(m.writeValueAsString(account));
			vo.setSuccess(true);
			userService.join(account);
			
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
			boolean r = userService.checkDuplicateId(id);
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
