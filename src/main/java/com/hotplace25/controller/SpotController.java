package com.hotplace25.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.FileBucket;
import com.hotplace25.domain.Maemul;
import com.hotplace25.service.SpotService;
import com.hotplace25.util.SessionUtil;

@RequestMapping("/spot")
@Controller
public class SpotController {

	@Resource(name="spotService")
	SpotService spotService;
	
	@PostMapping("/reg/maemulNoPic")
	@ResponseBody
	public AjaxVO uploadRegMaemulNoPic(@RequestBody Maemul maemul) throws JsonGenerationException, JsonMappingException, IOException {
		boolean doRegisted = false;
		AjaxVO vo = new AjaxVO();
		
		//maemul.setAccountId(SessionUtil.getSessionUserId());
		maemul.setAccountId("khnam");
		
		try {
			doRegisted = spotService.doRegistedMaemul(maemul);
			if(doRegisted) {
				vo.setSuccess(false);
				vo.setErrCode("DUP");
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		if(!doRegisted) {
			try {
				boolean r = spotService.regMaemulNoPic(maemul);
				if(r) {
					vo.setSuccess(true);
				}
				else {
					vo.setSuccess(false);
				}
			}
			catch(Exception e) {
				vo.setSuccess(false);
				vo.setErrMsg(e.getMessage());
			}
		}
		
		return vo;
	}
	
	@PostMapping("/reg/maemul")
	@ResponseBody
	public AjaxVO uploadRegMaemul(
			@RequestParam("file") MultipartFile[] files,
			@RequestParam("pnu") String pnu,
			@RequestParam("addressJibeon") String addressJibeon,
			@RequestParam("description") String description,
			@RequestParam("phone") String phone,
			@RequestParam("register") String register,
			@RequestParam("lng") float lng,
			@RequestParam("lat") float lat) {
		
		boolean doRegisted = false;
		AjaxVO vo = new AjaxVO();
		
		Maemul maemul = new Maemul();
		//maemul.setAccountId(SessionUtil.getSessionUserId());
		maemul.setAccountId("khnam");
		maemul.setAddressJibeon(addressJibeon);
		maemul.setDescription(description);
		maemul.setPnu(pnu);
		maemul.setPhone(phone);
		maemul.setRegister(register);
		maemul.setLat(lat);
		maemul.setLng(lng);
		
		try {
			doRegisted = spotService.doRegistedMaemul(maemul);
			if(doRegisted) {
				vo.setSuccess(false);
				vo.setErrCode("DUP");
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		if(!doRegisted) {
			vo.setSuccess(true);
			try {
				List<FileBucket> fbList = new ArrayList<>();
				
				for(MultipartFile file: files) {
					String fName = file.getOriginalFilename();
					FileBucket fb = new FileBucket();
					fb.setImageName(fName);
					fb.setExt(fName.substring(fName.lastIndexOf(".") + 1));
					fb.setImage(file.getBytes());
					fbList.add(fb);
				}
				
				maemul.setFiles(fbList);
				spotService.regMaemul(maemul);
			}
			catch(Exception e) {
				vo.setSuccess(false);
				vo.setErrMsg(e.getMessage());
			}
		}
		
		return vo;
	}
	
}
