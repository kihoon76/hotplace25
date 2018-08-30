package com.hotplace25.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.Consulting;
import com.hotplace25.domain.FileBucket;
import com.hotplace25.domain.GwansimMulgeon;
import com.hotplace25.domain.Maemul;
import com.hotplace25.service.SearchService;
import com.hotplace25.service.SpotService;
import com.hotplace25.types.MulgeonType;
import com.hotplace25.util.SessionUtil;

@RequestMapping("/spot")
@Controller
public class SpotController {

	@Resource(name="spotService")
	SpotService spotService;
	
	@Resource(name="searchService")
	SearchService searchService;
	
	
	@GetMapping("/tojiDefaultInfo")
	@ResponseBody
	public AjaxVO<Map<String, String>> getTojiDefaultInfo(@RequestParam("pnu") String pnu) {
		AjaxVO<Map<String, String>> vo = new AjaxVO<Map<String, String>>();
		
		try {
			Map<String, String> info = spotService.getTojiDefaultInfo(pnu);
			if(info != null) {
				Map<String, String> luris = searchService.getLurisDrawing(pnu);
				
				if(luris != null) {
					info.put("image", luris.get("image"));
				}
			}
			
			vo.setSuccess(true);
			vo.addObject(info);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	
	@PostMapping("/reg/maemulNoPic")
	@ResponseBody
	public AjaxVO uploadRegMaemulNoPic(@RequestBody Maemul maemul) throws JsonGenerationException, JsonMappingException, IOException {
		boolean doRegisted = false;
		AjaxVO vo = new AjaxVO();
		
		maemul.setAccountId(SessionUtil.getSessionUserId());
		
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
		maemul.setAccountId(SessionUtil.getSessionUserId());
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
	
	@PostMapping("/reg/consulting")
	@ResponseBody
	public AjaxVO regConsulting(@RequestBody Consulting consulting) {
		boolean doRegisted = false;
		AjaxVO vo = new AjaxVO();
		
		consulting.setAccountId(SessionUtil.getSessionUserId());
		try {
			doRegisted = spotService.doRegistedConsulting(consulting);
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
				spotService.regConsulting(consulting);
			}
			catch(Exception e) {
				vo.setSuccess(false);
				vo.setErrMsg(e.getMessage());
			}
		}
		
		return vo;
	}
	
	@PostMapping("/check/gwansim")
	@ResponseBody
	public AjaxVO<GwansimMulgeon> checkGwansimMulgeon(@RequestBody GwansimMulgeon gwansimMulgeon) {
		GwansimMulgeon rGwansimMulgeon = null;
		AjaxVO<GwansimMulgeon> vo = new AjaxVO<GwansimMulgeon>();
		
		gwansimMulgeon.setAccountId(SessionUtil.getSessionUserId());
		
		try {
			rGwansimMulgeon = spotService.doRegistedGwansimMulgeon(gwansimMulgeon);
			if(rGwansimMulgeon != null) {
				vo.setSuccess(false);
				vo.addObject(rGwansimMulgeon);
				vo.setErrCode("DUP");
			}
			else {
				vo.setSuccess(true);
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	
	@PostMapping("/reg/gwansim")
	@ResponseBody
	public AjaxVO regGwansimMulgeon(@RequestBody GwansimMulgeon gwansimMulgeon) {
//		GwansimMulgeon rGwansimMulgeon = null;
		AjaxVO vo = new AjaxVO();
		gwansimMulgeon.setAccountId(SessionUtil.getSessionUserId());
//		
//		gwansimMulgeon.setAccountId(SessionUtil.getSessionUserId());
//		try {
//			rGwansimMulgeon = spotService.doRegistedGwansimMulgeon(gwansimMulgeon);
//			if(rGwansimMulgeon != null) {
//				vo.setSuccess(false);
//				vo.setErrCode("DUP");
//			}
//		}
//		catch(Exception e) {
//			vo.setSuccess(false);
//			vo.setErrMsg(e.getMessage());
//			
//			return vo;
//		}
		
		//if(rGwansimMulgeon == null) {
			vo.setSuccess(true);
			try {
				
				String mulgeonType = gwansimMulgeon.getMulgeonType();
				if(!"".equals(mulgeonType)) {
					//물건타입이 유효하지 않으면 exception 발생
					MulgeonType.getType(mulgeonType);
				}
				
				spotService.regGwansimMulgeon(gwansimMulgeon);
			}
			catch(Exception e) {
				vo.setSuccess(false);
				vo.setErrMsg(e.getMessage());
			}
		//}
		
		return vo;
	}
	
	@GetMapping("del/gwansim")
	@ResponseBody
	public AjaxVO removeMyGwansimMulgeon(@RequestParam("gwansimNum") String gwansimNum) {
		
		AjaxVO vo = new AjaxVO();
		vo.setSuccess(false);
		
		String currentId = SessionUtil.getSessionUserId();
		
		GwansimMulgeon gm = new GwansimMulgeon();
		gm.setAccountId(currentId);
		gm.setGwansimMulgeonNum(gwansimNum);
		
		try {
			boolean isValid = spotService.removeMyGwansimMulgeon(gm);
			
			if(isValid) {
				vo.setSuccess(true);
				vo.addObject(gwansimNum);
			}
			
		}
		catch(Exception e) {
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@PostMapping("mod/gwansim")
	@ResponseBody
	public AjaxVO modifyMyGwansimMulgeon(@RequestBody Map<String, String> param) {
		
		AjaxVO vo = new AjaxVO();
		vo.setSuccess(false);
		
		String currentId = SessionUtil.getSessionUserId();
		
		GwansimMulgeon gm = new GwansimMulgeon();
		gm.setAccountId(currentId);
		gm.setGwansimMulgeonNum(param.get("gwansimNum"));
		gm.setMemo(param.get("memo"));
		
		try {
			boolean r = spotService.modifyMyGwansimMulgeon(gm);
			
			if(r) {
				vo.setSuccess(true);
			}
		}
		catch(Exception e) {
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@GetMapping("my/gwansim")
	public String getMyGwansim(@RequestParam("gwansimNum") String gwansimNum, ModelMap m) {
		
		String currentId = SessionUtil.getSessionUserId();
		
		GwansimMulgeon gm = new GwansimMulgeon();
		gm.setAccountId(currentId);
		gm.setGwansimMulgeonNum(gwansimNum);
		
		gm = spotService.getMyGwansim(gm);
		gm.setAccountId("");
		
		m.addAttribute("gwansim", gm);
		
		return "mypage/mypageGwansimForm";
	}
}
