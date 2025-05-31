package br.edu.ifrn.ifjobs.service;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.dto.usuario.UsuarioEmailDTO;
import br.edu.ifrn.ifjobs.model.Usuario;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender envio;

    @Autowired
    private Configuration configuration;

    @Value("${spring.mail.username}")
    private String emailBase;

    @Value("${spring.mail.properties.EnderecoEmailCoex}")
    private String emailCoex;

    @Value("${app.url}")
    private String url;

    public void enviaEmail(Usuario usuario, String nomeArquivoHTML, String assunto)
            throws MessagingException, UnsupportedEncodingException, IOException, TemplateException {
        MimeMessage mimeMessage = envio.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "utf-8");

        mimeMessageHelper.setReplyTo(emailCoex);
        mimeMessageHelper.setSubject(assunto);
        mimeMessageHelper.setTo(usuario.getEmail());
        mimeMessageHelper.setFrom(new InternetAddress(emailBase, "IF Jobs"));
        String conteudoEmail = getEmailContent(usuario, nomeArquivoHTML);
        mimeMessageHelper.setText(conteudoEmail, true);

        envio.send(mimeMessage);
    }

    public void enviaEmailComArquivo(Usuario usuario, String nomeArquivoHTML, String assunto, File arquivo)
            throws MessagingException, UnsupportedEncodingException, IOException, TemplateException {
        MimeMessage mimeMessage = envio.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");

        mimeMessageHelper.setReplyTo(emailCoex);
        mimeMessageHelper.setSubject(assunto);
        mimeMessageHelper.setTo(usuario.getEmail());
        mimeMessageHelper.setFrom(new InternetAddress(emailBase, "IF Jobs"));
        String conteudoEmail = getEmailContent(usuario, nomeArquivoHTML);
        mimeMessageHelper.setText(conteudoEmail, true);
        mimeMessageHelper.addAttachment(arquivo.getName(), arquivo);

        envio.send(mimeMessage);
    }

    private String getEmailContent(Usuario usuario, String nomeArquivo) throws IOException, TemplateException {
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        UsuarioEmailDTO dto = new UsuarioEmailDTO(usuario);
        model.put("usuario", dto);
        model.put("webAppURL", url);
        configuration.setDirectoryForTemplateLoading(new File("src/main/resources/template/"));
        freemarker.template.Template template = configuration.getTemplate(nomeArquivo);
        template.process(model, stringWriter);
        return stringWriter.getBuffer().toString();
    }

    public String getEmailBase() {
        return emailBase;
    }

    public String getEmailCoex() {
        return emailCoex;
    }
}
