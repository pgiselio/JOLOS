package br.edu.ifrn.ifjobs.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import br.edu.ifrn.ifjobs.exception.VagaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.VagaNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.repository.VagaRepository;

@Service
public class VagaService {

    @Autowired
    private VagaRepository vagaRepository;

    public Vaga salvarVaga(Vaga vaga) throws VagaNaoCadastradaException {
        Optional<Vaga> vagaOptional;
        vagaOptional = Optional.ofNullable(vaga);

        Supplier<VagaNaoCadastradaException> excessao;
        excessao = () -> new VagaNaoCadastradaException("Dados inválidos!!");

        vagaOptional.ifPresent(vagaRepository::save);

        return vagaOptional.orElseThrow(excessao);
    }

    public Vaga buscarPorId(int id) throws VagaNaoEncontradoException {
        Optional<Vaga> vagaBuscadaPorId;
        vagaBuscadaPorId = vagaRepository.findById(id);

        Supplier<VagaNaoEncontradoException> excessao;
        excessao = () -> new VagaNaoEncontradoException("Vaga não encontrada!!");

        return vagaBuscadaPorId.orElseThrow(excessao);
    }

    public List<Vaga> buscaTodasVagas() {
        return vagaRepository.findAll();
    }

    public void delete(int id) throws VagaNaoEncontradoException {
        Vaga vaga = buscarPorId(id);
        vagaRepository.delete(vaga);
    }

    /**
     * 
     * @param id     é a identificação da vaga
     * @param campos os campos que irão ser modificados, exceto o campo ALUNOS, pois
     *               ainda não está pronto para modificações
     * @return vaga atualizada
     * @throws VagaNaoEncontradoException
     * @throws VagaNaoCadastradaException
     */
    public Vaga atualizaCampos(int id, Map<Object, Object> campos)
            throws VagaNaoEncontradoException, VagaNaoCadastradaException {
        Vaga vagaBuscadaPorId = buscarPorId(id);

        campos.forEach((chave, valor) -> {
            Field campo = ReflectionUtils.findField(Vaga.class, (String) chave);
            campo.setAccessible(true);
            ReflectionUtils.setField(campo, vagaBuscadaPorId, valor);
        });

        return salvarVaga(vagaBuscadaPorId);
    }

    /**
     * 
     * @param id    é a identificação da vaga
     * @param aluno é a entidade que será salva
     * @return
     * @throws VagaNaoEncontradoException
     * @throws VagaNaoCadastradaException
     */
    public Vaga addAlunoParaVaga(int id, Aluno aluno) throws VagaNaoEncontradoException, VagaNaoCadastradaException {
        final Vaga vaga = buscarPorId(id);
        vaga.addAluno(aluno);
        return salvarVaga(vaga);
    }
}