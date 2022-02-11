package br.edu.ifrn.ifjobs;

import javax.mail.MessagingException;

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
		email.setDestinatario("pgiselio@gmail.com");
		email.setMensagem("Bolsonaro vai comer nosso cu!!!!");
		email.setRemetente("bixopiruleta62@gmail.com");

		try {
			service.enviaEmail(email);
		} catch (MessagingException e) {
			e.printStackTrace();
		}

		System.out.println("email enviado, porra!");
	}

}
