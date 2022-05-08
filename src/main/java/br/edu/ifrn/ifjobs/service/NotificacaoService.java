package br.edu.ifrn.ifjobs.service;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.exception.NotificacaoNaoCadastradaException;
import br.edu.ifrn.ifjobs.model.Email;
import br.edu.ifrn.ifjobs.model.Notificacao;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.repository.NotificacaoRepository;

/**
 * @author Lucas-dev-back
 * @version 1.0
 * 
 *          Esta classe serve para disparar notificações para os usuários
 */
@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private Email email;

    private final String ASSUNTO_EMAIL_PENDENTE = "IFJobs - Notificação de pendência";

    @Value("${spring.html.CadastroPendente}")
    private String URL_HTML_EMAIL_PENDENTE;

    /**
     * !Todo método com a anotação @Scheduled é executado de forma automática
     * !sem necessidade de chamada
     */
    @Async
    @Scheduled(cron = "0 0 0/48 * * *")
    void disparaEmailParaUsuariosPedentesACada48Horas() {
        List<Usuario> usuarios = usuarioService.buscaTodosPorStatus(StatusUsuario.PENDENTE);
        usuarios.stream().forEach(usuario -> {
            Document documento = criaDocumentoBaseadoNaUrlDoArquivo();
            email.setDestinatario(usuario.getEmail());
            email.setAssunto(ASSUNTO_EMAIL_PENDENTE);
            email.setMensagem(documento.toString());
            email.setRemetente(emailService.getEmailCoex());
            enviaViaHtml(email);
        });
    }

    private Document criaDocumentoBaseadoNaUrlDoArquivo() {
        Document documento;
        try {
            documento = Jsoup.parse(new File(URL_HTML_EMAIL_PENDENTE), "UTF-8");
        } catch (IOException e) {
            throw new NotificacaoNaoCadastradaException(
                    "Não foi possível encontrar o conteúdo do email de pendência");
        }
        return documento;
    }

    public Notificacao salva(Notificacao notificacao) {
        Optional<Notificacao> optionalNotificacao;
        optionalNotificacao = Optional.ofNullable(notificacao);

        optionalNotificacao.ifPresent(notificacaoRepository::save);

        return optionalNotificacao.orElseThrow(NotificacaoNaoCadastradaException::new);
    }

    public List<Notificacao> buscaTodos() {
        return notificacaoRepository.findAll();
    }

    @Async
    @Scheduled(cron = "0 0 0/48 * * *")
    void deletaNotificacoesACada48Horas() {
        List<Notificacao> notificacoes = notificacaoRepository.findAll();
        notificacoes.stream().forEach(notificacao -> {
            Duration duracao = Duration.between(notificacao.getData(), LocalDateTime.now());
            if (duracao.toHours() >= 48) {
                notificacaoRepository.delete(notificacao);
            }
        });
    }

    private void enviaViaHtml(Email email) {
        email.setHtml(true);
        try {
            emailService.enviaEmail(email);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Erro ao enviar email para o usuário");
        }
    }

}
