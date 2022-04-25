package br.edu.ifrn.ifjobs.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

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
        optional = Optional.ofNullable(respository.saveAndFlush(aluno));
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

    public Aluno buscaPorCpf(String cpf) {
        Optional<String> optional;
        optional = Optional.ofNullable(cpf);

        Supplier<IllegalArgumentException> argumentoIlegal;
        argumentoIlegal = () -> new IllegalArgumentException("Cpf inválido!");

        String cpfNaoNulo = optional.orElseThrow(argumentoIlegal);

        return respository.findByCpf(cpfNaoNulo);
    }

    public Aluno atualizaCampo(int id, JsonPatch patch) throws AlunoNaoEncontradoException, AlunoNaoCadastradoException,
            JsonProcessingException, IllegalArgumentException, JsonPatchException {
        ObjectMapper mapper = new ObjectMapper();

        Aluno alunoBuscadoPorId = buscarPorId(id);

        JsonNode convertValue;
        convertValue = mapper.convertValue(alunoBuscadoPorId, JsonNode.class);

        JsonNode patched = patch.apply(convertValue);

        Aluno alunoModificado = mapper.treeToValue(patched, Aluno.class);

        return salvaAluno(alunoModificado);
    }

    public void delete(Aluno aluno) {
        respository.delete(aluno);
    }

}
