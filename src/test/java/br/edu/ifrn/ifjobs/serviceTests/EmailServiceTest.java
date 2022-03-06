package br.edu.ifrn.ifjobs.serviceTests;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.File;
import java.io.IOException;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.jsoup.Jsoup;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import br.edu.ifrn.ifjobs.model.Email;

@SpringBootTest
@ExtendWith(SpringExtension.class)
public class EmailServiceTest {

    private JavaMailSender envio;

    @Value("${spring.mail.username}")
    private String emailBase;

    public EmailServiceTest() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("ifjobs.contato@gmail.com");
        mailSender.setPassword("cmeysswoscqkfuil");

        Properties javaMailProperties = new Properties();
        javaMailProperties.put("mail.smtp.starttls.enable", "true");
        javaMailProperties.put("mail.smtp.auth", "true");
        javaMailProperties.put("mail.transport.protocol", "smtp");
        javaMailProperties.put("mail.debug", "true");
        javaMailProperties.put("mail.smtp.timeout", 3000);

        mailSender.setJavaMailProperties(javaMailProperties);

        this.envio = mailSender;
    }

    @Test
    void testEnviaEmail() throws MessagingException, IOException {
        Email email = new Email();
        email.setDestinatario("lucas.jdev2@gmail.com");
        email.setRemetente(emailBase);
        email.setAssunto("Teste");
        email.setHtml(true);

        File html = new File("src\\main\\java\\br\\edu\\ifrn\\ifjobs\\model\\html\\MensagemCadastro.html");
        String htmlContent = Jsoup.parse(html, "UTF-8").toString();

        email.setMensagem(htmlContent);

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
