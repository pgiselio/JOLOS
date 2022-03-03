package br.edu.ifrn.ifjobs.serviceTests;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import br.edu.ifrn.ifjobs.model.Email;

@SpringBootTest
public class EmailServiceTest {

    @Autowired
    private JavaMailSender envio;

    @Value("${spring.mail.username}")
    private String emailBase;

    @Test
    void testEnviaEmail() throws MessagingException, UnsupportedEncodingException {
        Email email = new Email();
        email.setDestinatario("lucas.jdev2@gmail.com");
        email.setRemetente(emailBase);
        email.setAssunto("Teste");
        email.setHtml(true);
        email.setMensagem("""
                <h1>Isso é um email de teste</h1>
                <p>Isso é um email enviado através do spring</p>
                """);

        MimeMessage mimeMessage = envio.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");

        mimeMessageHelper.setText(email.getMensagem(), email.isHtml());
        mimeMessageHelper.setReplyTo(email.getRemetente());
        mimeMessageHelper.setSubject(email.getAssunto());
        mimeMessageHelper.setTo(email.getDestinatario());
        mimeMessageHelper.setFrom(new InternetAddress(emailBase, "IF Jobs"));

        envio.send(mimeMessage);

        assertNotNull(mimeMessage);
    }
}
