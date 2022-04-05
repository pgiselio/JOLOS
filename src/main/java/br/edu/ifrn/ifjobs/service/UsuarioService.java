package br.edu.ifrn.ifjobs.service;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import javax.mail.MessagingException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import br.edu.ifrn.ifjobs.dto.usuario.UsuarioInsertDTO;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Email;
import br.edu.ifrn.ifjobs.model.Role;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.model.enums.TipoUsuario;
import br.edu.ifrn.ifjobs.repository.RoleRepository;
import br.edu.ifrn.ifjobs.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Value("${spring.mail.username}")
    private String emailBase;

    @Value("${spring.html.CadastroAluno}")
    private String caminhoArquivoEmailAluno;

    @Value("${spring.html.CadastroEmpresa}")
    private String caminhoArquivoEmailEmpresa;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmailService emailService;

    public Usuario create(UsuarioInsertDTO dto) throws UsuarioNaoCadastradoException {
        Optional<UsuarioInsertDTO> optional;
        optional = Optional.ofNullable(dto);

        Optional<Usuario> usuarioOptional;
        usuarioOptional = processoDeSalvarUsuarioeDispararEmail(optional);

        return usuarioOptional.orElseThrow(() -> new UsuarioNaoCadastradoException("Usuário não encontrado"));
    }

    private Optional<Usuario> processoDeSalvarUsuarioeDispararEmail(Optional<UsuarioInsertDTO> optional) {
        return optional.map(dto -> {
            Usuario usuario = dto.convertDtoToEntity();

            Email email = new Email();
            email.setAssunto("IF Jobs - Confirmação de cadastro");

            configPadraoAoCriarUsuario(usuario, email);

            verificaSeEPossivelEnviarEmail(dto, email);

            enviaEmail(email);

            addRolesParaUsuarioBaseadoNoTipoUsuario(usuario, dto.getTipoUsuario());

            return usuarioRepository.save(usuario);
        });
    }

    private void verificaSeEPossivelEnviarEmail(UsuarioInsertDTO dto, Email email) {
        try {
            mensagemEmailBaseadoNoTipoUsuario(dto.getTipoUsuario(), email);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao tentar encontrar arquivo de email");
        }
    }

    private void addRolesParaUsuarioBaseadoNoTipoUsuario(Usuario usuario, TipoUsuario tipoUsuario) {
        Role role = roleRepository.findByTipoUsuario(tipoUsuario);
        usuario.addRole(role);
    }

    private void configPadraoAoCriarUsuario(Usuario usuario, Email email) {
        criptografaSenha(usuario);
        usuario.setStatus(StatusUsuario.PENDENTE);
        addRolePadraoParaUsuario(usuario);

        configPadraoAoCriarEmail(email, usuario);
    }

    private void configPadraoAoCriarEmail(Email email, Usuario usuario) {
        email.setHtml(true);
        email.setDestinatario(usuario.getEmail());
        email.setRemetente(this.emailBase);
    }

    public Usuario create(Usuario usuario) throws UsuarioNaoCadastradoException {
        Optional<Usuario> optional;
        optional = Optional.ofNullable(usuario);

        Optional<Usuario> usuarioOptional;
        usuarioOptional = optional.map(user -> {
            Email email = new Email();
            configPadraoAoCriarUsuario(user, email);
            enviaEmail(email);

            return usuarioRepository.save(user);
        });

        return usuarioOptional.orElseThrow(() -> new UsuarioNaoCadastradoException("Usuário não cadastrado!"));
    }

    private void mensagemEmailBaseadoNoTipoUsuario(TipoUsuario tipoUsuario, Email email) throws IOException {
        final Document doc;

        switch (tipoUsuario) {
            case ALUNO:
                doc = Jsoup.parse(new File(caminhoArquivoEmailAluno), "UTF-8");
                email.setMensagem(doc.toString());
                break;
            case EMPRESA:
                doc = Jsoup.parse(new File(caminhoArquivoEmailEmpresa), "UTF-8");
                email.setMensagem(doc.toString());
                break;
            default:
                throw new IllegalArgumentException("Tipo de usuário inválido para criação!");
        }
    }

    private void addRolePadraoParaUsuario(Usuario user) {
        Role roleUsuario = roleRepository.findByTipoUsuario(TipoUsuario.USUARIO);
        user.addRole(roleUsuario);
    }

    private void criptografaSenha(Usuario usuario) {
        BCryptPasswordEncoder ciptografo = new BCryptPasswordEncoder();
        usuario.setSenha(ciptografo.encode(usuario.getSenha()));
    }

    private void enviaEmail(Email email) {
        try {
            emailService.enviaEmail(email);
        } catch (UnsupportedEncodingException | MessagingException e) {
            throw new RuntimeException("Erro ao enviar email, logo não cadastrado!");
        }
    }

    public Usuario buscaPorId(int id) throws UsuarioNaoEncontradoException {
        Optional<Usuario> usuarioFindById = usuarioRepository.findById(id);
        return usuarioFindById.orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado!!"));
    }

    public Usuario buscaPorEmail(String email) throws UsuarioNaoEncontradoException {
        Optional<String> emailOptional;
        emailOptional = Optional.ofNullable(email);

        Optional<Usuario> usuarioOptional;
        usuarioOptional = emailOptional.map(emailUser -> {
            final Usuario usuarioBuscadoPorEmail;
            usuarioBuscadoPorEmail = usuarioRepository.findUsuarioByEmail(emailUser);

            return usuarioBuscadoPorEmail;
        });

        return usuarioOptional.orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado!"));
    }

    public Usuario buscaPorEmpresaId(int id) throws UsuarioNaoEncontradoException {
        Optional<Usuario> usuarioFindById;
        usuarioFindById = usuarioRepository.findUsuarioByEmpresaId(id);

        Supplier<UsuarioNaoEncontradoException> excessao;
        excessao = () -> new UsuarioNaoEncontradoException("Usuário não encontrado!");

        return usuarioFindById.orElseThrow(excessao);
    }

    public List<Usuario> getAll() {
        return usuarioRepository.findAll();
    }

    public Usuario atualizaCampos(int id, Map<Object, Object> campos)
            throws UsuarioNaoEncontradoException, UsuarioNaoCadastradoException {
        Usuario buscadoPorId = buscaPorId(id);

        campos.forEach((chave, valor) -> {
            Field campo = ReflectionUtils.findField(Usuario.class, (String) chave);
            campo.setAccessible(true);
            ReflectionUtils.setField(campo, buscadoPorId, valor);
        });

        return create(buscadoPorId);
    }

    public Usuario delete(Usuario usuario) throws Exception {
        Optional<Usuario> usuarioOptional;
        usuarioOptional = Optional.ofNullable(usuario);

        usuarioOptional.ifPresent(user -> {
            user.setStatus(StatusUsuario.DESATIVADO);
            user = usuarioRepository.save(user);
        });

        return usuarioOptional.orElseThrow(Exception::new);
    }

}
