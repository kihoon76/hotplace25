package com.hotplace25.test;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.junit.FixMethodOrder;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotplace25.dao.SearchDao;
import com.hotplace25.util.DateUtil;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={
	"file:src/main/webapp/WEB-INF/spring/ds-context.xml",
	"file:src/test/resources/root-context.xml",
	//"file:src/test/resources/servletTest-context.xml"
})
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MultiDatasetTest {

	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Ignore @Test
	public void test01_sujiboonseok() {
		
		List<List<Map<String, Object>>> result = searchDao.selectSujiboonseogBase("4711312100113730002");
		
		ObjectMapper om = new ObjectMapper();
		
		try {
			System.out.println(String.valueOf(result.get(0).get(0).get("area")));
			System.out.println(String.valueOf(result.get(1).get(0)));
			System.out.println(String.valueOf(result.get(2).get(0)));
			System.err.println(om.writeValueAsString(result));
			
		} 
		catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Ignore @Test
	public void test02_split() {
		String s = "192,456.0";
		
		String[] arr = s.split("\\.");
		
		System.out.println(arr[0]);
	}
	
	@Test
	public void test03_date() throws ParseException {
		long i = DateUtil.diffOfDate("2018-08-10");
		System.err.println(i);
	}
	
	@Test
	public void test04_bool() throws ParseException {
		boolean b = false;
		b = b || true;
		b = b || false;
		System.err.println(b);
	}
}
