package com.blogspot.regulargeek;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.blogspot.regulargeek.*"})
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}
