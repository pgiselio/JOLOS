package br.edu.ifrn.ifjobs;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.edu.ifrn.ifjobs.model.Email;
import br.edu.ifrn.ifjobs.service.EmailService;

@SpringBootTest
class IfjobsApplicationTests {

	@Autowired
	private EmailService service;

	@Autowired
	private Email email;

	@Test
	void contextLoads() {

	}

}
