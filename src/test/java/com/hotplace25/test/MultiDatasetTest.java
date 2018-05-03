package com.hotplace25.test;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotplace25.dao.SearchDao;

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
	
	@Test
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
}
