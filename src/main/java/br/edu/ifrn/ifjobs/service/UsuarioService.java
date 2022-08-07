package br.edu.ifrn.ifjobs.service;

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

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.dto.usuario.UsuarioInsertDTO;
import br.edu.ifrn.ifjobs.dto.usuario.UsuarioUpdateSenhaDTO;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Role;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.model.enums.TipoUsuario;
import br.edu.ifrn.ifjobs.repository.RoleRepository;
import br.edu.ifrn.ifjobs.repository.UsuarioRepository;
import freemarker.template.TemplateException;

@Service
public class UsuarioService {

    @Value("${spring.html.CadastroAluno}")
    private String caminhoArquivoEmailAluno;

    @Value("${spring.html.CadastroEmpresa}")
    private String caminhoArquivoEmailEmpresa;

    @Value("${spring.html.RecuperacaoSenha}")
    private String caminhoArquivoEmailRecuperacaoSenha;

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
            Optional.ofNullable(dto.getSenha()).ifPresentOrElse(senha -> {
                usuario.setSenha(new BCryptPasswordEncoder().encode(senha));
            }, () -> {
                usuario.setSenha(new BCryptPasswordEncoder().encode(StringUtils.EMPTY));
            });

            String codigo = geraCodigoVerificacao();
            usuario.setCodigoAutenticacao(codigo);
            usuario.setStatus(StatusUsuario.PENDENTE);
            usuario.addRole(roleRepository.findByTipoUsuario(TipoUsuario.USUARIO));

            usuarioRepository.save(usuario);

            enviaEmailParaUsuarioBaseadoNoTipoUsuario(dto.getTipoUsuario(), usuario);

            addRolesParaUsuarioBaseadoNoTipoUsuario(usuario, dto.getTipoUsuario());

            return usuarioRepository.save(usuario);
        });
    }

    private String geraCodigoVerificacao() {
        return RandomStringUtils.randomNumeric(6);
    }

    @Async
    private void enviaEmailParaUsuarioBaseadoNoTipoUsuario(TipoUsuario tipoUsuario, Usuario usuario) {
        try {
            mensagemEmailBaseadoNoTipoUsuario(tipoUsuario, usuario);
        } catch (IOException | MessagingException | TemplateException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private void addRolesParaUsuarioBaseadoNoTipoUsuario(Usuario usuario, TipoUsuario tipoUsuario) {
        Role role = roleRepository.findByTipoUsuario(tipoUsuario);
        usuario.addRole(role);
    }

    public Usuario atualizaUsuario(Usuario usuario) throws UsuarioNaoCadastradoException {
        Optional<Usuario> optional;
        optional = Optional.ofNullable(usuario);

        optional.ifPresent(user -> {
            Usuario otherUser = usuarioRepository.getById(user.getId());
            otherUser.setAluno(user.getAluno());
            otherUser.setEmpresa(user.getEmpresa());
            otherUser.setStatus(user.getStatus());
            otherUser.setCodigoAutenticacao(user.getCodigoAutenticacao());
            otherUser.setFotoPerfil(user.getFotoPerfil());

            usuarioRepository.save(otherUser);
        });

        return optional.orElseThrow(() -> new UsuarioNaoCadastradoException("Usuário não cadastrado!"));
    }

    private void mensagemEmailBaseadoNoTipoUsuario(TipoUsuario tipoUsuario, Usuario usuario)
            throws IOException, MessagingException, TemplateException {
        switch (tipoUsuario) {
            case ALUNO:
                emailService.enviaEmail(usuario, caminhoArquivoEmailAluno, "IF Jobs - Confirmação de cadastro");
                break;
            case EMPRESA:
                emailService.enviaEmail(usuario, caminhoArquivoEmailEmpresa, "IF Jobs - Confirmação de cadastro");
                break;
            default:
                throw new IllegalArgumentException("Tipo de usuário inválido para criação!");
        }
    }

    public String validaCodigo(String email, String codigo) throws UsuarioNaoEncontradoException {
        Usuario usuario = buscaPorEmail(email);
        if (usuario.getCodigoAutenticacao().equals(codigo)) {
            int umMinuto = 60 * 1000;
            int dezMinutos = 10 * umMinuto;
            return GeradorTokenService.geraToken(usuario.getEmail(), dezMinutos);
        }
        throw new RuntimeException("Código inválido!");
    }

    public List<Usuario> buscaTodosPorStatus(StatusUsuario status) {
        return usuarioRepository.findAllByStatus(status);
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

    public Usuario buscaPorAlunoId(int id) throws UsuarioNaoEncontradoException {
        Optional<Usuario> usuarioFindById;
        usuarioFindById = usuarioRepository.findUsuarioByAlunoId(id);

        Supplier<UsuarioNaoEncontradoException> excessao;
        excessao = () -> new UsuarioNaoEncontradoException("Usuário não encontrado!");

        return usuarioFindById.orElseThrow(excessao);
    }

    public List<Usuario> getAll() {
        return usuarioRepository.findAll();
    }

    public Usuario atualizaCampos(int id, JsonPatch patch)
            throws UsuarioNaoEncontradoException, JsonProcessingException,
            IllegalArgumentException, JsonPatchException, UsuarioNaoCadastradoException {
        ObjectMapper mapper = new ObjectMapper();

        Usuario usuarioBuscadoPorId = buscaPorId(id);

        JsonNode convertValue;
        convertValue = mapper.convertValue(usuarioBuscadoPorId, JsonNode.class);

        JsonNode patched = patch.apply(convertValue);

        Usuario usuarioModificado = mapper.treeToValue(patched, Usuario.class);

        return atualizaUsuario(usuarioModificado);
    }

    public Usuario atualizaSenha(UsuarioUpdateSenhaDTO updateSenhaDto)
            throws UsuarioNaoEncontradoException, UsuarioNaoCadastradoException {
        String emailUsuario = GeradorTokenService.pegaEmailDoToken(updateSenhaDto.getToken());
        Usuario usuarioBuscadoPorEmail = buscaPorEmail(emailUsuario);
        boolean tokenValido = ValidadadorTokenService.validaTempoExpiracao(updateSenhaDto.getToken());
        if (tokenValido) {
            String senhaCriptografada = new BCryptPasswordEncoder().encode(updateSenhaDto.getSenha());
            usuarioBuscadoPorEmail.setSenha(senhaCriptografada);
            return atualizaUsuario(usuarioBuscadoPorEmail);
        }
        throw new RuntimeException("Token inválido!");
    }

    public void recuperaSenha(String email)
            throws UsuarioNaoEncontradoException, IOException, MessagingException, TemplateException {
        Usuario usuario = buscaPorEmail(email);
        int dezMinutos = 10 * 60 * 1000;
        String token = GeradorTokenService.geraToken(email, dezMinutos);
        usuario.setToken(token);
        usuarioRepository.save(usuario);

        emailService.enviaEmail(usuario, caminhoArquivoEmailRecuperacaoSenha, "IF Jobs - Recuperação de senha");

    }

    public Usuario delete(Usuario usuario) {
        Optional<Usuario> usuarioOptional;
        usuarioOptional = Optional.ofNullable(usuario);

        usuarioOptional.ifPresent(user -> {
            user.setStatus(StatusUsuario.DESATIVADO);
            user = usuarioRepository.save(user);
        });

        return usuarioOptional.orElseThrow(RuntimeException::new);
    }

}
