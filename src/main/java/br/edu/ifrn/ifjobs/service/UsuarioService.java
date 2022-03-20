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

    @Autowired
    private EmailService emailService;

    @Autowired
    private RoleRepository roleRepository;

    public Usuario create(Usuario usuario) throws UsuarioNaoCadastradoException {
        Optional<Usuario> optional;
        optional = Optional.ofNullable(usuario);

        optional.ifPresent(user -> {
            criptografaSenha(user);
            user.setStatus(StatusUsuario.PENDENTE);
            addRolePadraoParaUsuario(user);
            Email email = new Email();
            email.setHtml(true);
            email.setDestinatario(user.getEmail());
            email.setMensagem("""
                    <h1>Teste</h1>
                    """);
            email.setAssunto("Cadastro IF Jobs!!");
            email.setRemetente(this.emailBase);

            try {
                emailService.enviaEmail(email);
            } catch (MessagingException | UnsupportedEncodingException e) {
                user = null;
            }

            usuarioRepository.save(user);
        });

        return optional.orElseThrow(() -> new UsuarioNaoCadastradoException("Erro ao efetuar cadastro!"));
    }

    private void addRolePadraoParaUsuario(Usuario user) {
        Role roleUsuario = roleRepository.findByTipoUsuario(TipoUsuario.USUARIO);
        user.addRole(roleUsuario);
    }

    private void criptografaSenha(Usuario usuario) {
        BCryptPasswordEncoder ciptografo = new BCryptPasswordEncoder();
        usuario.setSenha(ciptografo.encode(usuario.getSenha()));
    }

    public Usuario buscaPorId(int id) throws UsuarioNaoEncontradoException {
        Optional<Usuario> usuarioFindById = usuarioRepository.findById(id);
        return usuarioFindById.orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado!!"));
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
