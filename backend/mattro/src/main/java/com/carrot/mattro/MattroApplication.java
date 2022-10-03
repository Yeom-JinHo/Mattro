package com.carrot.mattro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class MattroApplication {

	public static void main(String[] args) {
		SpringApplication.run(MattroApplication.class, args);
	}

}
