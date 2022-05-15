package br.edu.ifrn.ifjobs.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import javax.mail.MessagingException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.exception.EmpresaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.EmpresaNaoEncontradaException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.repository.EmpresaRepository;
import freemarker.template.TemplateException;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository repository;

    @Value("${spring.html.CadastroSucessoEmpresa}")
    private String caminhoArquivoEmailSucessoCadastroEmpresa;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EmailService emailService;

    public Empresa createEmpresa(Empresa empresa) throws EmpresaNaoCadastradaException {
        Optional<Empresa> optional;
        optional = Optional.ofNullable(repository.save(empresa));

        Supplier<EmpresaNaoCadastradaException> excessao;
        excessao = () -> new EmpresaNaoCadastradaException("Erro ao efetuar cadastro!");

        optional.ifPresent(enterprise -> {
            Empresa e = repository.save(enterprise);
            Usuario buscaPorEmpresaId;
            try {
                buscaPorEmpresaId = usuarioService.buscaPorEmpresaId(e.getId());
            } catch (UsuarioNaoEncontradoException erro) {
                throw new RuntimeException(erro);
            }
            buscaPorEmpresaId.setStatus(StatusUsuario.CONCLUIDO);
            String senha = new BCryptPasswordEncoder().encode(geraSenhaAleatoria());
            buscaPorEmpresaId.setSenha(senha);
            try {
                emailService.enviaEmailComArquivo(buscaPorEmpresaId, caminhoArquivoEmailSucessoCadastroEmpresa,
                        "IF Jobs - Cadastro realizado com sucesso",
                        new File("src/main/resources/docs/form_cadastro_empresa.docx"));
            } catch (IOException | TemplateException | MessagingException erro) {
                throw new RuntimeException(erro);
            }
        });

        return optional.orElseThrow(excessao);

    }

    private String geraSenhaAleatoria() {
        String senha = "";
        for (int i = 0; i < 8; i++) {
            senha += (char) (Math.random() * 26 + 'a');
        }
        return senha;
    }

    public Empresa buscaPorId(int id) throws EmpresaNaoEncontradaException {
        Optional<Empresa> empresaFindById = repository.findById(id);

        Supplier<EmpresaNaoEncontradaException> excessao;
        excessao = () -> new EmpresaNaoEncontradaException("Empresa não encontrada!!");

        return empresaFindById.orElseThrow(excessao);
    }

    public List<Empresa> getAll() {
        return repository.findAll();
    }

    public Empresa buscaPorCnpj(String cnpj) {
        Optional<String> optional;
        optional = Optional.ofNullable(cnpj);

        Supplier<IllegalArgumentException> excessao;
        excessao = () -> new IllegalArgumentException("Cnpj inválido!");

        String cnpjNaoNulo = optional.orElseThrow(excessao);

        Optional<Empresa> empresaOptional;
        empresaOptional = Optional.ofNullable(repository.findByCnpj(cnpjNaoNulo));

        return empresaOptional.orElseThrow(excessao);
    }

    public Empresa atualizaCampos(int id, JsonPatch patch)
            throws EmpresaNaoEncontradaException, EmpresaNaoCadastradaException, JsonPatchException,
            JsonProcessingException {
        Empresa buscadaPorId = buscaPorId(id);

        final ObjectMapper objectMapper = new ObjectMapper();
        final JsonNode convertValue;
        convertValue = objectMapper.convertValue(buscadaPorId, JsonNode.class);

        final JsonNode patched = patch.apply(convertValue);

        final Empresa empresaAtualizada = objectMapper.treeToValue(patched, Empresa.class);

        return atualizaEmpresa(empresaAtualizada);
    }

    public Empresa atualizaEmpresa(Empresa empresa) throws EmpresaNaoCadastradaException {
        Optional<Empresa> optional;
        optional = Optional.ofNullable(empresa);

        Supplier<EmpresaNaoCadastradaException> excessao;
        excessao = () -> new EmpresaNaoCadastradaException("Erro ao efetuar atualização!");

        optional.ifPresent(repository::save);

        return optional.orElseThrow(excessao);
    }

    public void delete(Empresa empresa) {
        repository.delete(empresa);
    }

}
