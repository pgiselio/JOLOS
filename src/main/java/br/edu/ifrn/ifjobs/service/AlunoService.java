package br.edu.ifrn.ifjobs.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.dto.aluno.AlunoInsertDTO;
import br.edu.ifrn.ifjobs.exception.AlunoNaoCadastradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.repository.AlunoRespository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRespository respository;

    @Autowired
    private ModelMapper modelMapper;

    public Aluno salvaAluno(Aluno aluno) throws AlunoNaoCadastradoException {
        Optional<Aluno> optional;
        optional = Optional.ofNullable(respository.save(aluno));
        return optional.orElseThrow(() -> new AlunoNaoCadastradoException("Dados inválidos!"));
    }

    public Aluno toAluno(AlunoInsertDTO dto) {
        return modelMapper.map(dto, Aluno.class);
    }
}
