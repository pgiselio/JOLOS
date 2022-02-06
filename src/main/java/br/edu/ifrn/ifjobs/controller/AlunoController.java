package br.edu.ifrn.ifjobs.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.ifjobs.dto.aluno.AlunoInsertDTO;
import br.edu.ifrn.ifjobs.exception.AlunoNaoCadastradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.service.AlunoService;

@RestController
@RequestMapping(path = "/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<Aluno> create(@RequestBody @Valid AlunoInsertDTO dto) {
        Aluno aluno = alunoService.toAluno(dto);
        var alunoSalvo = new Aluno();

        try {
            alunoSalvo = alunoService.salvaAluno(aluno);
        } catch (AlunoNaoCadastradoException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.ok().body(alunoSalvo);
    }

}
