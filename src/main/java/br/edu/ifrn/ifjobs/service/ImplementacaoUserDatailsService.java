package br.edu.ifrn.ifjobs.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.repository.UsuarioRepository;

@Service
public class ImplementacaoUserDatailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(username);
        Optional<Usuario> optional = Optional.ofNullable(usuario);
        usuario = optional.orElseThrow(() -> new UsernameNotFoundException("Usuário não foi encontrado!"));

        return new User(usuario.getUsername(), usuario.getPassword(), usuario.getAuthorities());
    }

}
