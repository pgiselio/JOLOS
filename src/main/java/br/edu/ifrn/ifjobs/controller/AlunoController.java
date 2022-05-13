package br.edu.ifrn.ifjobs.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.dto.aluno.AlunoInsertDTO;
import br.edu.ifrn.ifjobs.exception.AlunoNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.AlunoNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.service.AlunoService;

@RestController
@RequestMapping(path = "/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping("/create")
    public ResponseEntity<Aluno> salvaAluno(@RequestBody @Valid AlunoInsertDTO dto, HttpServletRequest request) {
        Aluno aluno = dto.convertDtoToEntity();
        Aluno alunoSalvo;

        try {
            alunoSalvo = alunoService.salvaAluno(aluno, request.getHeader("Authorization"));
        } catch (AlunoNaoCadastradoException e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body(alunoSalvo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscaPorId(@PathVariable(name = "id") int id) {
        Aluno aluno;

        try {
            aluno = alunoService.buscarPorId(id);
        } catch (AlunoNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok().body(aluno);
    }

    @GetMapping("/cpf")
    public ResponseEntity<Aluno> buscaPorCpf(@RequestParam String cpf) {
        Aluno aluno;

        try {
            aluno = alunoService.buscaPorCpf(cpf);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(aluno);
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> buscaTodos() {
        List<Aluno> alunos;
        alunos = alunoService.buscaTodos();
        return ResponseEntity.ok().body(alunos);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Aluno> atualizaCampo(@PathVariable(name = "id") int id,
            @RequestBody JsonPatch jsonPatch) {
        Aluno alunoAtualizado;

        try {
            alunoAtualizado = alunoService.atualizaCampo(id, jsonPatch);
        } catch (AlunoNaoEncontradoException | AlunoNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (JsonProcessingException | IllegalArgumentException | JsonPatchException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().body(alunoAtualizado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizaAluno(@PathVariable(name = "id") int id,
            AlunoInsertDTO dto) {
        Aluno aluno = dto.convertDtoToEntity();
        Aluno alunoSalvo;

        try {
            alunoSalvo = alunoService.atualizaAluno(aluno);
        } catch (AlunoNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }

        return ResponseEntity.ok(alunoSalvo);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Aluno> deletaAluno(@PathVariable(name = "id") int id) {
        Aluno aluno;

        try {
            aluno = alunoService.buscarPorId(id);
        } catch (AlunoNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        alunoService.delete(aluno);

        return ResponseEntity.ok(aluno);
    }
}
