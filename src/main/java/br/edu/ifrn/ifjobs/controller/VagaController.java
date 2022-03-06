package br.edu.ifrn.ifjobs.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import br.edu.ifrn.ifjobs.exception.VagaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.VagaNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.service.VagaService;

@RestController
@RequestMapping(path = "/vaga")
public class VagaController {

    @Autowired
    private VagaService vagaService;

    @PostMapping("/create")
    public ResponseEntity<Vaga> criaVaga(@RequestBody final Vaga vaga) {
        Vaga vagaSalva;

        try {
            vagaSalva = vagaService.salvarVaga(vaga);
        } catch (VagaNaoCadastradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(vagaSalva, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vaga> buscaPorId(@PathVariable(name = "id") int id) {
        Vaga vagaBuscada;

        try {
            vagaBuscada = vagaService.buscarPorId(id);
        } catch (VagaNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(vagaBuscada);
    }

    @GetMapping("/")
    public ResponseEntity<List<Vaga>> buscaTodasVagas() {
        List<Vaga> todasVagas = vagaService.buscaTodasVagas();
        return ResponseEntity.ok(todasVagas);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Vaga> atualizaCampos(@PathVariable(name = "id") int id,
            @RequestBody Map<Object, Object> campos) {

        Vaga vagaAtualizada;

        try {
            vagaAtualizada = vagaService.atualizaCampos(id, campos);
        } catch (VagaNaoEncontradoException | VagaNaoCadastradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(vagaAtualizada);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Vaga> delete(@PathVariable(name = "id") int id) {
        try {
            vagaService.delete(id);
        } catch (VagaNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
