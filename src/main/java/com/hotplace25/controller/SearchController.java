package com.hotplace25.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.mail.MessagingException;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hotplace25.domain.Account;
import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.Email;
import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;
import com.hotplace25.domain.Jangmi;
import com.hotplace25.domain.ToojaSearchResult;
import com.hotplace25.service.SearchService;
import com.hotplace25.service.UserService;
import com.hotplace25.util.DataUtil;
import com.hotplace25.util.MailUtil;
import com.hotplace25.util.ValidationUtil;

@RequestMapping("/search")
@Controller
public class SearchController {

	@Resource(name="searchService")
	private SearchService searchService;
	
	@Resource(name="userService")
	private UserService userService;
	
	@Resource(name="mailUtil")
	MailUtil mailUtil;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("gyeonggong")
	@ResponseBody
	public  AjaxVO<GyeongGongmaeOut> getGyeonggongSearchResult(@RequestBody GyeongGongmaeIn gyeongGongIn) {
		
		AjaxVO<GyeongGongmaeOut> vo = new AjaxVO<GyeongGongmaeOut>();
		
		try {
			ObjectMapper o = new ObjectMapper();
			System.err.println(o.writeValueAsString(gyeongGongIn));
			vo.setSuccess(true);
			GyeongGongmaeOut gg = new GyeongGongmaeOut();
			gg.setGubun("G");
			gg.setType("대");
			gg.setAddress("서울시 강남구 도곡동 963");
			gg.setLat(37.50838492780f);
			gg.setLng(127.09740818600f);
			
			
			/*List<GyeongGongmaeOut> list = searchService.getGyeongGongSearch(gyeongGongIn);
			int size = list.size();
			for(int i=0; i<size; i++) {
				vo.addObject(list.get(i));
			}*/
			
			vo.addObject(gg);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	@PostMapping("jangmi")
	@ResponseBody
	public List<ToojaSearchResult> getJangmiList(@RequestBody Map<String, Object>  param) {
		
		System.err.println(param.toString());
		
		
		Jangmi jangmiIn = new Jangmi();
		//System.err.println(DataUtil.convertArrayToString((ArrayList<String>)param.get("jiyeog")));
		jangmiIn.setCityPlan(DataUtil.convertArrayToString((ArrayList<String>)param.get("cityPlan")));
		jangmiIn.setCityPlanState(DataUtil.convertArrayToString((ArrayList<String>)param.get("cityPlanState")));
		jangmiIn.setBosangPyeonib(DataUtil.convertArrayToString((ArrayList<String>)param.get("bosangPyeonib")));
		jangmiIn.setJiyeok(DataUtil.convertArrayToString((ArrayList<String>)param.get("jiyeog")));
		jangmiIn.setJimok(DataUtil.convertArrayToString((ArrayList<String>)param.get("jimok")));
		jangmiIn.setGongsi(DataUtil.convertArrayToString((ArrayList<String>)param.get("gongsi")));
		jangmiIn.setYongdoJiyeog(DataUtil.convertArrayToString((ArrayList<String>)param.get("yongdoJiyeog")));   
		jangmiIn.setYongdoJigu(DataUtil.convertArrayToString((ArrayList<String>)param.get("yongdoJigu")));
		jangmiIn.setYongdoGuyeog(DataUtil.convertArrayToString((ArrayList<String>)param.get("yongdoGuyeog")));
		jangmiIn.setEtcLawLimit(DataUtil.convertArrayToString((ArrayList<String>)param.get("etcLawLimit")));
		jangmiIn.setEtcChamgo(DataUtil.convertArrayToString((ArrayList<String>)param.get("etcChamgo")));
		
		List<ToojaSearchResult> list = searchService.getJangmiList(jangmiIn);
		
		return list;
		
	}
	
	@PostMapping("tojiuselimitcancel")
	@ResponseBody
	public List<Jangmi> getTojiUseLimitCancelList(@RequestBody Map<String, Object>  param) {
		
		System.err.println(param.toString());
		
		List<Jangmi> list = new ArrayList<>();
		Jangmi j = null;
		
		for(int i=0; i<20; i++) {
			j = new Jangmi();
			j.setNum(i + 1);
			j.setCityPlan("도로");
			j.setJibeon("서울시 송파구 잠실본동 40");
			j.setYongdoJiyeog("녹지지역");
			j.setHpGrade("2등급");
			j.setBosangPyeonib("편입");
			j.setLat(37.50838492780f);
			j.setLng(127.09740818600f);
			list.add(j);
		}
		
		return list;
	}
	
	@PostMapping("devpilji")
	@ResponseBody
	public List<Jangmi> getDevPiljiList(@RequestBody Map<String, Object>  param) {
		
		System.err.println(param.toString());
		
		List<Jangmi> list = new ArrayList<>();
		Jangmi j = null;
		
		for(int i=0; i<20; i++) {
			j = new Jangmi();
			j.setNum(i + 1);
			j.setCityPlan("도로");
			j.setJibeon("서울시 송파구 잠실본동 40");
			j.setYongdoJiyeog("녹지지역");
			j.setHpGrade("2등급");
			j.setBosangPyeonib("편입");
			j.setLat(37.50838492780f);
			j.setLng(127.09740818600f);
			list.add(j);
		}
		
		return list;
	}
	
	@PostMapping("password")
	@ResponseBody
	public AjaxVO searchPassword(
			@RequestParam("accountId") String accountId, 
			@RequestParam("email") String emailStr) {
		
		AjaxVO vo = new AjaxVO();
		
		if(ValidationUtil.isNotEmpty(accountId) && ValidationUtil.isValidEmail(emailStr)) {
			Account account = userService.getUserInfo(accountId);
			if(account != null && !emailStr.equals(account.getEmail())) {
				vo.setSuccess(false);
				vo.setErrMsg("값이 유효하지 않습니다");
			}
			else {
				String imsiPw = mailUtil.getRandomPassword("P", 16);
				try {
					Email email = new Email();
					email.setAccount(account);
					email.setContent("<p>임시로 발급된 비밀번호는 <span style=\"font-color:red; font-weight:bolder;\">" + imsiPw + "</span> 입니다.</p>");
					mailUtil.sendMail(email);
					
					account.setPassword(passwordEncoder.encode(imsiPw));
					userService.modifyUserPw(account);
					
					vo.setSuccess(true);
				} 
				catch (MessagingException e) {
					vo.setSuccess(false);
					vo.setErrMsg(e.getMessage());
				}
			}
		}
		else {
			vo.setSuccess(false);
			vo.setErrMsg("값이 유효하지 않습니다");
		}
		
		
		
		return vo;
	}
}
