package br.edu.ifrn.ifjobs.controller;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.dto.mensagem.MensagemInsertDTO;
import br.edu.ifrn.ifjobs.exception.MensagemNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.MensagemNaoEncontradaException;
import br.edu.ifrn.ifjobs.model.Mensagem;
import br.edu.ifrn.ifjobs.service.MensagemService;

@RestController
@RequestMapping("/mensagem")
public class MensagemController {

    @Autowired
    private MensagemService mensagemService;

    @PostMapping("/create")
    public ResponseEntity<Mensagem> salvaMensagem(@RequestBody MensagemInsertDTO dto) {
        final Mensagem mensagem = dto.convertDtoToEntity();
        Mensagem mensagemSalva;

        try {
            mensagemSalva = mensagemService.salvaMensagem(mensagem);
        } catch (MensagemNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(mensagemSalva, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @CacheEvict(value = "cachemensagem", allEntries = true)
    @CachePut("cachemensagem")
    public ResponseEntity<Mensagem> buscarPorId(@PathVariable(name = "id") int id) {
        Mensagem mensagemBuscadaPorId;

        try {
            mensagemBuscadaPorId = mensagemService.buscarPorId(id);
        } catch (MensagemNaoEncontradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(mensagemBuscadaPorId);
    }

    @GetMapping("/")
    @CacheEvict(value = "cachemensagens", allEntries = true)
    @CachePut("cachemensagens")
    public ResponseEntity<List<Mensagem>> buscaTodasMensagens() {
        List<Mensagem> mensagens = mensagemService.buscaTodasMensagens();
        return ResponseEntity.ok(mensagens);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Mensagem> atualizaCampo(@PathVariable(name = "id") int id, JsonPatch jsonPatch) {
        Mensagem mensagemAtualizada;

        try {
            mensagemAtualizada = mensagemService.atualizaCampos(id, jsonPatch);
        } catch (MensagemNaoEncontradaException | MensagemNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (JsonProcessingException | IllegalArgumentException | JsonPatchException e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(mensagemAtualizada);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Mensagem> delete(@PathVariable(name = "id") int id) {
        try {
            mensagemService.delete(id);
        } catch (MensagemNaoEncontradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
