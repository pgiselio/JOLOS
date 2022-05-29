package br.edu.ifrn.ifjobs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.ifjobs.model.Notificacao;
import br.edu.ifrn.ifjobs.service.NotificacaoService;

@RestController
@RequestMapping("/notificacao")
public class NotificacaoController {

    @Autowired
    private NotificacaoService notificacaoService;

    @GetMapping("/usuario/{email}")
    public ResponseEntity<List<Notificacao>> buscaPorEmail(String email) {
        return ResponseEntity.ok(notificacaoService.buscaTodasNaoVisualizadasBaseadaNoEmail(email));
    }

    @GetMapping("/visualizar/{id}")
    public ResponseEntity<Notificacao> visualizar(@PathVariable(name = "id") int id) {
        notificacaoService.marcaComoVisualizada(id);
        return ResponseEntity.ok().build();
    }
}
