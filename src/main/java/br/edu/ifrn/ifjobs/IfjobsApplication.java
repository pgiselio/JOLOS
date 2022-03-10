package br.edu.ifrn.ifjobs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class IfjobsApplication {

	public static void main(String[] args) {
		SpringApplication.run(IfjobsApplication.class, args);
	}

}
