package br.edu.ifrn.ifjobs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Role;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.TipoUsuario;
import br.edu.ifrn.ifjobs.repository.RoleRepository;
import br.edu.ifrn.ifjobs.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Usuario create(Usuario usuario) throws UsuarioNaoCadastradoException {
        Optional<Usuario> optional;
        optional = Optional.ofNullable(usuario);

        optional.ifPresent(user -> {
            Role roleUsuario = roleRepository.findByTipoUsuario(TipoUsuario.USUARIO);
            user.addRole(roleUsuario);
            usuarioRepository.save(user);
        });

        return optional.orElseThrow(() -> new UsuarioNaoCadastradoException("Erro ao efetuar cadastro!"));
    }

    public Usuario getById(int id) throws UsuarioNaoEncontradoException {
        Optional<Usuario> usuarioFindById = usuarioRepository.findById(id);
        return usuarioFindById.orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado!!"));
    }

    public List<Usuario> getAll() {
        return usuarioRepository.findAll();
    }

    public Usuario delete(Usuario usuario) {
        usuarioRepository.delete(usuario);
        return usuario;
    }

}
