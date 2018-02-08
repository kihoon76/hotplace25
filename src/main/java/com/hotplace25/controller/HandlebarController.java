package com.hotplace25.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hotplace25.service.HotplaceService;


@RequestMapping("/handlebar")
@Controller
public class HandlebarController {

	@Resource(name="hotplaceService")
	HotplaceService hotplaceService;
	
	@GetMapping("join")
	public String getJoinTos(ModelMap m) {
		
		m.addAttribute("yaggwan", hotplaceService.getYaggwanList());
		
		return "joinForm";
	}
	
	@GetMapping("tab/tojiuselimit/{tabName}")
	public String _getTojiUseLimitTabHtml(@PathVariable("tabName") String tabName) {
		
		String jspName = "";
		
		switch(tabName) {
		case "default":
			jspName = "spotTojiUseLimitTab1Form";
			break;
		case "tojidaejang":
			jspName = "spotTojiUseLimitTab2Form";
			break;
		case "geonchugdaejang":
			jspName = "spotTojiUseLimitTab3Form";
			break;
		case "tojiuseplan":
			jspName = "spotTojiUseLimitTab4Form";
			break;
		case "privategongsi":
			jspName = "spotTojiUseLimitTab5Form";
			break;
		}
		
		
		return "tabs/" + jspName;
	}
}
