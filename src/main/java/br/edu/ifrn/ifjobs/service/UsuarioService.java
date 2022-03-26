package br.edu.ifrn.ifjobs.service;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;

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

    @Autowired
    private UsuarioRepository usuarioRepository;

    private Usuario usuarioGlobal;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RoleRepository roleRepository;

    public Usuario create(UsuarioInsertDTO dto) throws UsuarioNaoCadastradoException {
        Optional<UsuarioInsertDTO> optional;
        optional = Optional.ofNullable(dto);

        processoDeSalvarUsuarioeDispararEmail(optional);

        Optional<Usuario> usuarioOptional;
        usuarioOptional = Optional.ofNullable(usuarioGlobal);

        return usuarioOptional.orElseThrow(() -> new UsuarioNaoCadastradoException("Usuário não encontrado"));
    }

    private void processoDeSalvarUsuarioeDispararEmail(Optional<UsuarioInsertDTO> optional) {
        optional.ifPresent(usuarioDto -> {
            Usuario usuario = usuarioDto.convertDtoToEntity();

            Email email = new Email();
            email.setAssunto("IF Jobs - Confirmação de cadastro");

            configPadraoAoCriarUsuario(usuario, email);
            mensagemEmailBaseadoNoTipoUsuario(usuarioDto.getTipoUsuario(), email);
            enviaEmail(email);

            usuarioGlobal = usuarioRepository.save(usuario);
        });
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

        optional.ifPresent(user -> {
            Email email = new Email();
            configPadraoAoCriarUsuario(user, email);
            enviaEmail(email);

            usuarioGlobal = usuarioRepository.save(user);
        });

        Optional<Usuario> optional2;
        optional2 = Optional.ofNullable(usuarioGlobal);

        return optional2.orElseThrow(() -> new UsuarioNaoCadastradoException("Usuário não cadastrado!"));
    }

    private void mensagemEmailBaseadoNoTipoUsuario(TipoUsuario tipoUsuario, Email email) {
        switch (tipoUsuario) {
            case ALUNO:
                email.setMensagem("""
                        <h1>Car@ estudante...</h1>
                        """);
                break;
            case EMPRESA:
                email.setMensagem("""
                        <h1>Car@ empresa</h1>
                        """);
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

        emailOptional.ifPresent(emailUser -> {
            final Usuario usuarioBuscadoPorEmail;
            usuarioBuscadoPorEmail = usuarioRepository.findUsuarioByEmail(emailUser);

            usuarioGlobal = usuarioBuscadoPorEmail;
        });

        Optional<Usuario> usuarioOptional;
        usuarioOptional = Optional.ofNullable(usuarioGlobal);

        return usuarioOptional.orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado!"));
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
