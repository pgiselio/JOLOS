package br.edu.ifrn.ifjobs.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.model.Email;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender envio;

    public void enviaEmail(Email email) throws MessagingException {
        MimeMessage mimeMessage = envio.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "utf-8");

        mimeMessageHelper.setText(email.getMensagem(), email.isHtml());
        mimeMessageHelper.setReplyTo(email.getRemetente());
        mimeMessageHelper.setSubject(email.getAssunto());
        mimeMessageHelper.setTo(email.getDestinatario());

        envio.send(mimeMessage);
    }
}
