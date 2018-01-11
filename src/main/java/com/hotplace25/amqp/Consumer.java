package com.hotplace25.amqp;


import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.hotplace25.domain.LogVO;


@Component
public class Consumer {
	
private final static String namespace = "mappers.mssql.logMapper";
	
	@Resource(name = "msSqlSession")
	private SqlSession msSqlSession;
	private Gson gson = new Gson();
	

	public void handleMessage(Object message) {
		
		LogVO log = gson.fromJson((String)message, LogVO.class);
		msSqlSession.insert(namespace + ".insertLog", log);
		
	}
}
