package br.edu.ifrn.ifjobs.serviceTests;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import br.edu.ifrn.ifjobs.model.Notificacao;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.repository.NotificacaoRepository;
import br.edu.ifrn.ifjobs.repository.UsuarioRepository;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@EnableScheduling
@ActiveProfiles("test")
class NotificacaoServiceTest {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private String email;

    @Scheduled(cron = "0/10 * * * * *")
    void testNotificaACada10Segundos() throws InterruptedException {
        System.out.println("Teste de notificação: " + LocalDateTime.now());
    }

    void testNotificacaoRepository() {
        System.out.println("Teste de notificação: " + LocalDateTime.now());
        Notificacao notificacao = new Notificacao();
        notificacao.setTitulo("Teste 1");
        notificacao.setDescricao("Teste de notificação");
        notificacao.setData(LocalDateTime.now());

        Notificacao outraNotificacao = new Notificacao();
        outraNotificacao.setTitulo("Teste 2");
        outraNotificacao.setDescricao("Teste de notificação");
        outraNotificacao.setData(LocalDateTime.now());

        Usuario usuario = new Usuario();
        email = RandomStringUtils.randomAlphabetic(8) + "@gmail.com";
        usuario.setEmail(email);
        usuario.setSenha(RandomStringUtils.random(8, true, true));
        usuario.setStatus(StatusUsuario.PENDENTE);

        usuarioRepository.save(usuario);

        notificacao.setUsuario(usuario);
        notificacaoRepository.save(notificacao);

        outraNotificacao.setUsuario(usuario);
        notificacaoRepository.save(outraNotificacao);
    }

    @Test
    void buscaTodasNaoVisualizadasBaseadaNoID() {
        testNotificacaoRepository();
        List<Notificacao> notificacoes = notificacaoRepository.findAll()
                .stream()
                .collect(Collectors
                        .groupingBy(n -> n.getUsuario().getEmail()))
                .get(email);
        notificacoes = notificacoes.stream()
                .filter(notificacao -> !notificacao.isVisualizado())
                .collect(Collectors.toList());

        System.out.println(notificacoes);
    }
}
