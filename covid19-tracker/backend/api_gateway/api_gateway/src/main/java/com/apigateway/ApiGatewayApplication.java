package com.apigateway;

import javax.print.attribute.standard.PresentationDirection;
import javax.swing.GroupLayout.Group;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.reactive.config.CorsRegistry;

@SpringBootApplication
@EnableEurekaClient
public class ApiGatewayApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

}
