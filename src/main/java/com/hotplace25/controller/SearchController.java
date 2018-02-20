package com.hotplace25.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;
import com.hotplace25.domain.Jangmi;
import com.hotplace25.service.SearchService;

@RequestMapping("/search")
@Controller
public class SearchController {

	@Resource(name="searchService")
	private SearchService searchService;
	
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
	public List<Jangmi> getJangmiList(@RequestBody Map<String, Object>  param) {
		
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
}
