package br.edu.ifrn.ifjobs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario login(Usuario usuario) throws UsuarioNaoEncontradoException {
        Optional<Usuario> usuarioBuscado = repository
                .findByEmailAndPassword(usuario.getEmail(),
                        usuario.getSenha());
        return usuarioBuscado
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Falha ao validar!"));
    }

    public Usuario create(Usuario usuario) throws UsuarioNaoCadastradoException {
        Optional<Usuario> optional;
        optional = Optional.ofNullable(repository.save(usuario));
        return optional.orElseThrow(() -> new UsuarioNaoCadastradoException("Erro ao efetuar cadastro!"));
    }

    public Usuario getById(int id) throws UsuarioNaoEncontradoException {
        Optional<Usuario> usuarioFindById = repository.findById(id);
        return usuarioFindById.orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado!!"));
    }

    public List<Usuario> getAll() {
        return repository.findAll();
    }

}
