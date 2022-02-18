package br.edu.ifrn.ifjobs.controller;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
    @ResponseBody
    public ResponseEntity<Aluno> salvaAluno(@RequestBody @Valid AlunoInsertDTO dto) {
        Aluno aluno = dto.convertDtoToEntity();
        Aluno alunoSalvo;

        try {
            alunoSalvo = alunoService.salvaAluno(aluno);
        } catch (AlunoNaoCadastradoException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.ok().body(alunoSalvo);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Aluno> buscaPorId(@PathVariable(name = "id") int id) {
        Aluno aluno;

        try {
            aluno = alunoService.buscarPorId(id);
        } catch (AlunoNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok().body(aluno);
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Aluno>> buscaTodos() {
        List<Aluno> alunos;
        alunos = alunoService.buscaTodos();
        return ResponseEntity.ok().body(alunos);
    }

    @PatchMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Aluno> atualizaCampo(@PathVariable(name = "id") int id,
            Map<Object, Object> campos) {
        Aluno buscadoPorId;

        try {
            buscadoPorId = alunoService.buscarPorId(id);
        } catch (AlunoNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        campos.forEach((chave, valor) -> {
            Field campo = ReflectionUtils.findField(Aluno.class, (String) chave);
            campo.setAccessible(true);
            ReflectionUtils.setField(campo, buscadoPorId, valor);
        });

        Aluno alunoAtualizado;

        try {
            alunoAtualizado = alunoService.salvaAluno(buscadoPorId);
        } catch (AlunoNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok().body(alunoAtualizado);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Aluno> atualizaAluno(@PathVariable(name = "id") int id,
            AlunoInsertDTO dto) {
        Aluno aluno = dto.convertDtoToEntity();
        Aluno alunoSalvo;

        try {
            alunoSalvo = alunoService.salvaAluno(aluno);
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
