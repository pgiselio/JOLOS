package br.edu.ifrn.ifjobs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
@EnableWebMvc
public class IfjobsApplication {

	public static void main(String[] args) {
		SpringApplication.run(IfjobsApplication.class, args);
	}

}
