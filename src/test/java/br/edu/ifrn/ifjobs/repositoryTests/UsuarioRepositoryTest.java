package br.edu.ifrn.ifjobs.repositoryTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import br.edu.ifrn.ifjobs.model.Role;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.repository.RoleRepository;
import br.edu.ifrn.ifjobs.repository.UsuarioRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void testCriandoUsuario() {
        Usuario usuario = new Usuario();
        usuario.setEmail("jolos2@jolos.com");
        usuario.setSenha("jolos");
        usuario.setStatus(StatusUsuario.PENDENTE);

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        Usuario usuarioExistente = entityManager.find(Usuario.class, usuarioSalvo.getId());

        assertEquals(usuario.getEmail(), usuarioExistente.getEmail());
    }

    @Test
    void testBuscaUsuarioPorEmail() {
        String email = "jolos@jolos.com";

        Usuario usuario = usuarioRepository.findUsuarioByEmail(email);

        assertNotNull(usuario);
    }

    @Test
    void testAddRoleParaNovoUsuario() {
        Usuario usuario = new Usuario();
        usuario.setEmail("jolos4@jolos.com");
        usuario.setSenha("jolos");
        usuario.setStatus(StatusUsuario.PENDENTE);

        Role roleUsuario = roleRepository.findByNome("Usuario");
        usuario.addRole(roleUsuario);

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        assertEquals(1, usuarioSalvo.getRoles().size());
    }

    @Test
    void testAddRoleParaUsuarioExistente() {
        Usuario usuario = usuarioRepository.findById(1).get();

        Role roleUsuario = roleRepository.findByNome("Usuario");
        usuario.addRole(roleUsuario);

        Role roleAdmin = new Role(2);
        usuario.addRole(roleAdmin);

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        assertEquals(2, usuarioSalvo.getRoles().size());
    }

}
