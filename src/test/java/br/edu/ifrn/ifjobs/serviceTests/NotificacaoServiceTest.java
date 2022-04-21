package br.edu.ifrn.ifjobs.serviceTests;

import java.time.LocalDateTime;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootTest
@EnableScheduling
class NotificacaoServiceTest {

    @Scheduled(cron = "0/10 * * * * *")
    void testNotificaACada10Segundos() throws InterruptedException {
        System.out.println("Teste de notificação: " + LocalDateTime.now());
    }
}
