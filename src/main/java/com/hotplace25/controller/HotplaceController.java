package com.hotplace25.controller;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.hotplace25.domain.AcceptBuilding;
import com.hotplace25.domain.Address;
import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.ApplicationConfig;
import com.hotplace25.domain.BosangPyeonib;
import com.hotplace25.domain.Gongmae;
import com.hotplace25.domain.GongmaeDetail;
import com.hotplace25.domain.Gyeongmae;
import com.hotplace25.domain.HpSearch;
import com.hotplace25.domain.Notice;
import com.hotplace25.domain.QnA;
import com.hotplace25.domain.Silgeolae;
import com.hotplace25.reporter.PdfItext;
import com.hotplace25.service.HotplaceService;
import com.hotplace25.service.NoticeService;
import com.hotplace25.util.DataUtil;
import com.hotplace25.util.ValidationUtil;


@Controller
@RequestMapping("/")
public class HotplaceController {

	@Resource(name = "hotplaceService")
	HotplaceService hotplaceService;
	
	@Resource(name="noticeService")
	NoticeService noticeService;
	
	@Resource(name="pdfItext")
	PdfItext pdfItext;
	
	@Resource(name="applicationConfig")
	ApplicationConfig applicationConfig;
	
	@Value("#{varCfg['env']}")
	private String env;
	
	@GetMapping("main")
	public String layout(HttpServletRequest request) {
		//List<Notice> notices = noticeService.getNoticeList();
		
		//request.setAttribute("notices", notices);
		
		request.setAttribute("jangeagongji", applicationConfig.getValue("C1"));
		request.setAttribute("debug", applicationConfig.getValue("C2"));
		request.setAttribute("env", env);
		String currentYear = "";
		
		try {
			currentYear = hotplaceService.getCurrentTear();
		}
		catch(Exception e) {
			Date date = new Date(); 
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			currentYear = String.valueOf(cal.get(Calendar.YEAR) - 1);
		}
		
		request.setAttribute("currYear", currentYear);
		return "main";
	}
	
	@GetMapping("signin/{errCode}")
	public String signinForm(@PathVariable(name="errCode", required=false) String errCode, HttpServletRequest request) {
		
		AjaxVO ajax = new AjaxVO();
		if("200".equals(errCode)) {
			ajax.setSuccess(true);
		}
		else {
			ajax.setSuccess(false);
		}
		
		ajax.setErrCode(errCode);
		request.setAttribute("result", ajax);
		
		return "authresult";
	}
	
	@GetMapping("checkSession")
	public String checkSession(HttpServletRequest request) {
		
		AjaxVO ajax = new AjaxVO();
		ajax.setSuccess(true);
		ajax.setErrCode("");
		request.setAttribute("result", ajax);
		
		return "authresult";
	}
	
	@GetMapping(value="address/condition", produces="application/text; charset=utf8")
	@ResponseBody
	public String getAddressSearchCondition(
			@RequestParam(name="type", required=true) String type,
			@RequestParam(name="si", required=true) String si,
			@RequestParam(name="gugun", required=false) String gugun) {
			
		if("".equals(gugun)) {
			return hotplaceService.getGuGunList(si);
		}
		
		if("R".equals(type)) {
			return "";
		}
		else {
			Address addr = new Address();
			addr.setSi(si);
			addr.setGugun(gugun);
			return hotplaceService.getRegionNameList(addr);
		}
		
	}
	
	@PostMapping(value="address/search", produces="application/text; charset=utf8")
	@ResponseBody
	public String getAddress(@RequestBody Address address) {
		
		return hotplaceService.getAddressList(address);
	}
	
	@PostMapping(value="mulgeon/search", produces="application/text; charset=utf8")
	@ResponseBody
	public String getMulgeonAddress(@RequestBody Address address) {
		
		//System.out.println(address);
		return hotplaceService.getMulgeonAddressList(address); 
	}
	
	@GetMapping("locationbounds")
	@ResponseBody
	public String getLocationBounds(@RequestParam(name="level") String level, 
									@RequestParam(name="nex") String nex,
									@RequestParam(name="swx") String swx,
									@RequestParam(name="swy") String swy,
									@RequestParam(name="ney") String ney,
									@RequestParam(name="year") String year,
									@RequestParam(name="type") String type) throws Exception  {
		
		if(!"GONGSI".equals(type) && !"GONGSI_GR".equals(type)) {
			year = year.substring(0, 4);
		}
		
		Map<String, String> param = getBoundsParam(nex, swx, swy, ney, "");
		param.put("level", level);
		param.put("year", year);
		param.put("type", type);
		
		return DataUtil.makeReturn(hotplaceService.getLocationBounds(param), true);
	}
	
	@GetMapping("gyeongmaemarker")
	@ResponseBody
	public String getGyeongmaeMarker(@RequestParam(name="nex") String nex,
								  	 @RequestParam(name="swx") String swx,
								  	 @RequestParam(name="swy") String swy,
								  	 @RequestParam(name="ney") String ney,
								  	 @RequestParam(name="level") String level,
								  	 @RequestParam(name="stopGrouping") String stopGrouping) throws Exception  {
		
		Map<String, String> param = getBoundsParam(nex, swx, swy, ney, stopGrouping);
		
		return DataUtil.makeReturn(hotplaceService.getGyeongmaeMarker(param), true);
	}
	
	@GetMapping("gongmaemarker")
	@ResponseBody
	public String getGongmaemarker(@RequestParam(name="nex") String nex,
								   @RequestParam(name="swx") String swx,
								   @RequestParam(name="swy") String swy,
								   @RequestParam(name="ney") String ney,
								   @RequestParam(name="stopGrouping") String stopGrouping) throws Exception  {
		
		Map<String, String> param = getBoundsParam(nex, swx, swy, ney, stopGrouping);
		
		return DataUtil.makeReturn(hotplaceService.getGongmaeMarker(param), true);
	}
	
	@GetMapping("bosangmarker")
	@ResponseBody
	public String getBosangmarker(@RequestParam(name="nex") String nex,
								  @RequestParam(name="swx") String swx,
								  @RequestParam(name="swy") String swy,
								  @RequestParam(name="ney") String ney,
								  @RequestParam(name="level") String level,
								  @RequestParam(name="stopGrouping") String stopGrouping) throws Exception  {
		
		Map<String, String> param = getBoundsParam(nex, swx, swy, ney, stopGrouping);
		param.put("gubun", "보상");
		param.put("level", level);
		
		return DataUtil.makeReturn(hotplaceService.getBosangPyeonibMarker(param), true);
	}
	
	@GetMapping("pyeonibmarker")
	@ResponseBody
	public String getPyeonibmarker(@RequestParam(name="nex") String nex,
								   @RequestParam(name="swx") String swx,
								   @RequestParam(name="swy") String swy,
								   @RequestParam(name="ney") String ney,
								   @RequestParam(name="level") String level,
								   @RequestParam(name="stopGrouping") String stopGrouping) throws Exception  {
		
		Map<String, String> param = getBoundsParam(nex, swx, swy, ney, stopGrouping);
		param.put("gubun", "편입");
		param.put("level", level);
		
		return DataUtil.makeReturn(hotplaceService.getBosangPyeonibMarker(param), true);
	}
	
	@GetMapping(value="silgeolaemarker",  produces="text/plain; charset=utf8")
	@ResponseBody
	public String getSilgeolaemarker(@RequestParam(name="nex") String nex,
								     @RequestParam(name="swx") String swx,
								     @RequestParam(name="swy") String swy,
								     @RequestParam(name="ney") String ney,
								     @RequestParam(name="stopGrouping") String stopGrouping) throws Exception  {
		
		Map<String, String> param = getBoundsParam(nex, swx, swy, ney, stopGrouping);
		
		return DataUtil.makeReturn(hotplaceService.getSilgeolaeMarker(param), true);
	}
	
	@GetMapping("acceptbuildingmarker")
	@ResponseBody
	public String getAcceptbuildingmarker(
			@RequestParam(name="nex") String nex,
			@RequestParam(name="swx") String swx,
			@RequestParam(name="swy") String swy,
			@RequestParam(name="ney") String ney,
			@RequestParam(name="level") String level,
			@RequestParam(name="stopGrouping") String stopGrouping) throws Exception  {
		
		Map<String, String> param = getBoundsParam(nex, swx, swy, ney, stopGrouping);
				
		return DataUtil.makeReturn(hotplaceService.getAcceptBuildingMarker(param), true);
	}
	
	
	@GetMapping("silgeolae/thumb")
	@ResponseBody
	public Silgeolae getSilgeolaeThumb(@RequestParam("pnu") String pnu) {
		
		return hotplaceService.getSilgeolaeThumb(pnu);
	}
	
	@GetMapping("acceptbuilding/thumb")
	@ResponseBody
	public AcceptBuilding getAcceptbuildingThumb(@RequestParam("unu") String unu) {
		
		return hotplaceService.getAcceptbuildingThumb(unu);
	}
	
	@PostMapping("hpgrade/search")
	@ResponseBody
	public HpSearch getHpgradeSearch(@RequestBody HpSearch hpSearch) throws InterruptedException {
		
		Thread.sleep(2000);
		return hpSearch;
	}
	
	@PostMapping("/download/{type}")
	public void downloadReport(@PathVariable("type") String type, 
							   @RequestParam(name="json") String data, HttpServletRequest request, HttpServletResponse response) throws Exception  {
		
		if(!"pdf".equals(type)) throw new Exception();
		
		Gson gson = new Gson();
		JsonElement element = gson.fromJson(data, JsonElement.class);
		JsonObject jsonObject = element.getAsJsonObject();
		
		String fileName = jsonObject.get("docName").getAsString();
		
		//한글파일명 라우저 별 처리
		
		if(request.getHeader("User-Agent").contains("MSIE") || request.getHeader("User-Agent").contains("Trident")) {
			fileName = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
		}
		else {
			fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
		}
		
		response.setHeader("Content-Transper-Encoding", "binary");
		response.setHeader("Content-Disposition", "inline; filename=" + fileName + "." + type);
		response.setContentType("application/octet-stream");
		
		
		pdfItext.make(response, jsonObject);
	}
	
	@GetMapping("gyeongmae/thumb")
	@ResponseBody
	public Gyeongmae getGyeongmaeThumb(@RequestParam("unu") String unu) {
		return hotplaceService.getGyeongmaeThumb(unu);
	}
	
	@GetMapping("gyeongmae/detail")
	@ResponseBody
	public Gyeongmae getGyeongmaeDetail(@RequestParam("goyubeonho") String goyubeonho,
									    @RequestParam("deunglogbeonho") String deunglogbeonho,
									    @RequestParam("pnu") String pnu) {
		
		Gyeongmae g = hotplaceService.getGyeongmaeDetail(goyubeonho, deunglogbeonho);
		
		return g;
	}
	
	@GetMapping("gongmae/thumb")
	@ResponseBody
	public Gongmae getGongmaeThumb(@RequestParam("unu") String unu) {
		Gongmae g = hotplaceService.getGongmaeThumb(unu);
		if(g == null) {
			g = new Gongmae();
		}
		return g;
	}
	
	@GetMapping("gongmae/detail")
	@ResponseBody
	public GongmaeDetail getGongmaeDetail(@RequestParam("goyubeonho") String goyubeonho,
									  	  @RequestParam("pnu") String pnu) {
		
		GongmaeDetail gD = hotplaceService.getGongmaeDetail(goyubeonho);
		
		return gD;
	}
	
	@GetMapping("bosangpyeonib/thumb")
	@ResponseBody
	public BosangPyeonib getBosangPyeonibThumb(@RequestParam("unu") String unu) {
		
		return hotplaceService.getBosangPyeonibThumb(unu);
	}
	
	@PostMapping(value="bosangpyeonib/group", produces="application/text; charset=utf8")
	@ResponseBody
	public String getBosangPyeonibGroupList(/*@RequestParam("gunu") String gunu*/ @RequestBody Map<String, String> param) {
		return DataUtil.makeReturn(hotplaceService.getBosangPyeonibGroupList(param.get("gunu")), true);
	}
	
	@GetMapping("celldetail")
	@ResponseBody
	public AjaxVO getCellDetail() throws InterruptedException {
		//Thread.sleep(2000);
		return new AjaxVO();
	}
	
	@GetMapping("errors/{errCode}")
	public String redirectPage(@PathVariable("errCode") String errCode) {
		
		return "errors/" + errCode;
	}
	
	@GetMapping("auth/heatmap")
	@ResponseBody
	public AjaxVO checkAuth() {
		AjaxVO vo = new AjaxVO();
		vo.setSuccess(true);
		
		return vo;
	}
	
	//상담신청
	@PostMapping("question")
	@ResponseBody
	public AjaxVO registQuestion(@RequestBody QnA qna) {
		//Thread.sleep(2000);
		AjaxVO vo = new AjaxVO();
		
		try {
			if(ValidationUtil.isValidNumberOnly(qna.getPhone(), 15) && !"".equals(qna.getQuestion())) {
				
				hotplaceService.registQuestion(qna);
				vo.setSuccess(true);
			}
			else {
				vo.setSuccess(false);
				vo.setErrMsg("입력형식이 올바르지 않습니다.");
			}

		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		return vo;
	}
	
	private Map<String, String> getBoundsParam(String nex, String swx, String swy, String ney, String stopGrouping) {
		Map<String, String> param = new HashMap<String, String>();
		param.put("nex", nex);
		param.put("swx", swx);
		param.put("swy", swy);
		param.put("ney", ney);
		param.put("stopGrouping", stopGrouping);
		return param;
	}
}
