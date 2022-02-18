package br.edu.ifrn.ifjobs.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.exception.AlunoNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.AlunoNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.repository.AlunoRespository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRespository respository;

    public Aluno salvaAluno(Aluno aluno) throws AlunoNaoCadastradoException {
        Optional<Aluno> optional;
        optional = Optional.ofNullable(respository.save(aluno));
        return optional.orElseThrow(() -> new AlunoNaoCadastradoException("Dados inválidos!"));
    }

    public Aluno buscarPorId(int id) throws AlunoNaoEncontradoException {
        Optional<Aluno> findedById;
        findedById = respository.findById(id);

        Supplier<AlunoNaoEncontradoException> excecao;
        excecao = () -> new AlunoNaoEncontradoException("Aluno não encontrado!!");

        return findedById.orElseThrow(excecao);
    }

    public List<Aluno> buscaTodos() {
        return respository.findAll();
    }

}
