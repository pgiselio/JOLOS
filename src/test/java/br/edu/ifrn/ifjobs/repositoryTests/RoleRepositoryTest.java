package br.edu.ifrn.ifjobs.repositoryTests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import br.edu.ifrn.ifjobs.model.Role;
import br.edu.ifrn.ifjobs.repository.RoleRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class RoleRepositoryTest {

    @Autowired
    RoleRepository repository;

    @Test
    public void testCreateRoles() {
        Role usuario = new Role("Usuario");
        Role admin = new Role("Admin");
        Role empresa = new Role("Empresa");
        Role aluno = new Role("Aluno");

        repository.saveAll(List.of(usuario, admin, empresa, aluno));

        List<Role> listRoles = repository.findAll();

        assertEquals(4, listRoles.size());
    }
}
