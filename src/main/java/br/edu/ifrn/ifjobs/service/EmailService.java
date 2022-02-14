package br.edu.ifrn.ifjobs.service;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.model.Email;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender envio;

    @Value("${spring.mail.username}")
    private String emailBase;

    public void enviaEmail(Email email) throws MessagingException, UnsupportedEncodingException {
        MimeMessage mimeMessage = envio.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "utf-8");

        mimeMessageHelper.setText(email.getMensagem(), email.isHtml());
        mimeMessageHelper.setReplyTo(email.getRemetente());
        mimeMessageHelper.setSubject(email.getAssunto());
        mimeMessageHelper.setTo(email.getDestinatario());
        mimeMessageHelper.setFrom(new InternetAddress(emailBase, "IF Jobs"));

        envio.send(mimeMessage);
    }
}
