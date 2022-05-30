package br.edu.ifrn.ifjobs.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.ifjobs.dto.DTOConversor;
import br.edu.ifrn.ifjobs.dto.notificacao.NotificacaoGetDTO;
import br.edu.ifrn.ifjobs.model.Notificacao;
import br.edu.ifrn.ifjobs.service.NotificacaoService;

@RestController
@RequestMapping("/notificacao")
public class NotificacaoController {

    @Autowired
    private NotificacaoService notificacaoService;

    @GetMapping("/usuario/{email}")
    public ResponseEntity<List<NotificacaoGetDTO>> buscaPorEmail(@PathVariable(name = "email") String email) {
        List<Notificacao> notificacoesNaoVisualizadas;
        notificacoesNaoVisualizadas = notificacaoService.buscaTodasNaoVisualizadasBaseadaNoEmail(email);

        List<NotificacaoGetDTO> notificacoesDTO = notificacoesNaoVisualizadas.stream()
                .map(notificacao -> DTOConversor.convertEntityToDto(notificacao, NotificacaoGetDTO.class))
                .collect(Collectors.toList());

        notificacoesDTO.sort((notificacao1, notificacao2) -> notificacao2.getData().compareTo(notificacao1.getData()));
        return ResponseEntity.ok(notificacoesDTO);
    }

    @GetMapping("/usuario/{email}/visualizada")
    public ResponseEntity<List<NotificacaoGetDTO>> buscaPorEmailVisualizada(
            @PathVariable(name = "email") String email) {
        List<Notificacao> notificacoesVisualizadas;
        notificacoesVisualizadas = notificacaoService.buscaTodasVisualizadasBaseadaNoEmail(email);

        List<NotificacaoGetDTO> notificacoesDTO = notificacoesVisualizadas.stream()
                .map(notificacao -> DTOConversor.convertEntityToDto(notificacao, NotificacaoGetDTO.class))
                .collect(Collectors.toList());

        notificacoesDTO.sort((notificacao1, notificacao2) -> notificacao2.getData().compareTo(notificacao1.getData()));
        return ResponseEntity.ok(notificacoesDTO);
    }

    @GetMapping("/marcarComoLido/{id}")
    public ResponseEntity<ResponseStatus> visualizar(@PathVariable(name = "id") int id) {
        notificacaoService.marcaComoVisualizada(id);
        return ResponseEntity.ok().build();
    }
}
