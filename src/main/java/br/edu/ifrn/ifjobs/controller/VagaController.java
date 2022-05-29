package br.edu.ifrn.ifjobs.controller;

import java.util.List;

import javax.validation.Valid;

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

import br.edu.ifrn.ifjobs.dto.DTOConversor;
import br.edu.ifrn.ifjobs.dto.vaga.VagaGetAllDTO;
import br.edu.ifrn.ifjobs.dto.vaga.VagaGetDTO;
import br.edu.ifrn.ifjobs.dto.vaga.VagaInsertDto;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
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
    public ResponseEntity<Vaga> criaVaga(@RequestBody @Valid final VagaInsertDto vaga) {
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
    @CacheEvict(value = "vagas", allEntries = true)
    @CachePut(value = "vagas")
    public ResponseEntity<List<VagaGetAllDTO>> buscaTodasVagas() {
        List<VagaGetAllDTO> vagas = vagaService.buscaTodasVagas();
        return ResponseEntity.ok(vagas);
    }

    @GetMapping("/lista/{id}")
    public ResponseEntity<VagaGetDTO> dtoVagaBuscadaPorId(
            @PathVariable(name = "id") int id) {
        VagaGetDTO vagaBuscadaPorId;

        try {
            vagaBuscadaPorId = vagaService.buscaPorId(id);
        } catch (VagaNaoEncontradoException | UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(vagaBuscadaPorId);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Vaga> atualizaCampos(@PathVariable(name = "id") int id,
            @RequestBody JsonPatch jsonPatch) {

        Vaga vagaAtualizada;

        try {
            vagaAtualizada = vagaService.atualizaCampos(id, jsonPatch);
        } catch (VagaNaoEncontradoException | VagaNaoCadastradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (JsonProcessingException | IllegalArgumentException | JsonPatchException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(vagaAtualizada);
    }

    @PatchMapping("/{vagaId}/addAluno/{alunoId}")
    public ResponseEntity<VagaGetDTO> addAluno(@PathVariable(name = "vagaId") int vagaId,
            @PathVariable(name = "alunoId") int alunoId) {
        Vaga vaga;

        try {
            vaga = vagaService.addAlunoParaVaga(vagaId, alunoId);
        } catch (VagaNaoEncontradoException | UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        VagaGetDTO dto = DTOConversor.convertEntityToDto(vaga, VagaGetDTO.class);
        return ResponseEntity.ok(dto);
    }

    @PatchMapping("/{vagaId}/removeAluno/{alunoId}")
    public ResponseEntity<VagaGetDTO> desinscreveAluno(@PathVariable(name = "vagaId") int vagaId,
            @PathVariable(name = "alunoId") int alunoId) {

        try {
            vagaService.desinscreverAlunoDaVaga(vagaId, alunoId);
        } catch (VagaNaoEncontradoException | UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok().build();
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
