package br.edu.ifrn.ifjobs.service;

import java.time.Instant;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.exception.AlunoNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.AlunoNaoEncontradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Arquivo;
import br.edu.ifrn.ifjobs.model.Curriculo;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.repository.AlunoRespository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRespository respository;

    @Autowired
    private UsuarioService usuarioService;

    public Aluno salvaAluno(Aluno aluno, String token) throws AlunoNaoCadastradoException {
        Optional<Aluno> optional;
        optional = Optional.ofNullable(aluno);

        optional.ifPresent(student -> {
            String email = GeradorTokenService.pegaEmailDoToken(token);

            Usuario usuario;
            try {
                usuario = usuarioService.buscaPorEmail(email);
            } catch (UsuarioNaoEncontradoException e) {
                throw new RuntimeException(e);
            }

            var curriculo = new Curriculo();
            curriculo.setDataImport(new Date(Instant.now().toEpochMilli()));
            student.setCurriculo(curriculo);

            var pdf = new Arquivo();
            pdf.setNome("curriculo" + usuario.getId());
            pdf.setTipoArquivo("pdf");
            pdf.setDados(new byte[0]);
            student.getCurriculo().setPdf(pdf);

            student = respository.save(student);
            usuario.setAluno(student);
            usuario.setStatus(StatusUsuario.CONCLUIDO);
            usuario.setCodigoAutenticacao(StringUtils.EMPTY);
            try {
                usuarioService.atualizaUsuario(usuario);
            } catch (UsuarioNaoCadastradoException e) {
                throw new RuntimeException(e);
            }

        });

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

    public Aluno atualizaAluno(Aluno aluno) throws AlunoNaoCadastradoException {
        Optional<Aluno> optional;
        optional = Optional.ofNullable(aluno);

        optional.ifPresent(student -> {
            respository.save(student);
        });

        return optional.orElseThrow(() -> new AlunoNaoCadastradoException("Dados inválidos!"));
    }

    public Aluno atualizaCampo(int id, JsonPatch patch) throws AlunoNaoEncontradoException, AlunoNaoCadastradoException,
            JsonProcessingException, IllegalArgumentException, JsonPatchException {
        ObjectMapper mapper = new ObjectMapper();

        Aluno alunoBuscadoPorId = buscarPorId(id);

        JsonNode convertValue;
        convertValue = mapper.convertValue(alunoBuscadoPorId, JsonNode.class);

        JsonNode patched = patch.apply(convertValue);

        Aluno alunoModificado = mapper.treeToValue(patched, Aluno.class);

        return atualizaAluno(alunoModificado);
    }

    public void delete(Aluno aluno) {
        respository.delete(aluno);
    }

}
