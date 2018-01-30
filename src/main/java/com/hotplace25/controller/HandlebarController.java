package com.hotplace25.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
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
}
