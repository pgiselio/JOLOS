package br.edu.ifrn.ifjobs.service;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.exception.NotificacaoNaoCadastradaException;
import br.edu.ifrn.ifjobs.model.Notificacao;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.repository.NotificacaoRepository;
import freemarker.template.TemplateException;

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
            try {
                if (usuario.getContadorDeNotificacoesDePendencia() <= 3) {
                    emailService.enviaEmail(usuario, URL_HTML_EMAIL_PENDENTE, ASSUNTO_EMAIL_PENDENTE);
                    usuario.setContadorDeNotificacoesDePendencia(usuario.getContadorDeNotificacoesDePendencia() + 1);
                }
                usuarioService.delete(usuario);
            } catch (MessagingException | IOException | TemplateException e) {
                throw new RuntimeException(e);
            }
        });
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

    public List<Notificacao> buscaTodasNaoVisualizadasBaseadaNoEmail(String email) {
        List<Notificacao> notificacoes = buscaTodos().stream()
                .collect(Collectors
                        .groupingBy(notificacao -> notificacao.getUsuario().getEmail()))
                .get(email);

        if (notificacoes == null) {
            return List.of();
        }

        return notificacoes.stream()
                .filter(notificacao -> !notificacao.isVisualizado())
                .collect(Collectors.toList());
    }

    public List<Notificacao> buscaTodasVisualizadasBaseadaNoEmail(String email) {
        List<Notificacao> notificacoes = buscaTodos().stream()
                .collect(Collectors
                        .groupingBy(notificacao -> notificacao.getUsuario().getEmail()))
                .get(email);

        if (notificacoes == null) {
            return List.of();
        }

        return notificacoes.stream()
                .filter(notificacao -> notificacao.isVisualizado())
                .collect(Collectors.toList());
    }

    public void marcaComoVisualizada(int id) {
        Optional<Notificacao> optionalNotificacao = notificacaoRepository.findById(id);
        optionalNotificacao.ifPresent(notificacao -> notificacao.setVisualizado(true));
        notificacaoRepository.save(optionalNotificacao.orElseThrow(NotificacaoNaoCadastradaException::new));
    }

    @Async
    @Scheduled(cron = "0 0 0/48 * * *")
    void deletaNotificacoesACada48Horas() {
        List<Notificacao> notificacoes = notificacaoRepository.findAll();
        notificacoes.stream().forEach(notificacao -> {
            Duration duracao = Duration.between(notificacao.getData(), LocalDateTime.now());
            if (duracao.toHours() >= 48 && notificacao.isVisualizado()) {
                notificacaoRepository.delete(notificacao);
            }
        });
    }

}
