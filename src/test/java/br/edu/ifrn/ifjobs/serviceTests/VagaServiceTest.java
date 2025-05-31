package br.edu.ifrn.ifjobs.serviceTests;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.repository.VagaRepository;
import br.edu.ifrn.ifjobs.service.UsuarioService;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
class VagaServiceTest {

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Test
    void testBuscaVagasComEmpresaMostrandoIdDeUsuario() {
        List<Vaga> vagas = vagaRepository.findAll();
        List<Usuario> usuarios = vagas.stream().map(vaga -> {
            Empresa empresa = vaga.getEmpresa();
            int empresaId = empresa.getId();
            Usuario usuario;
            try {
                usuario = usuarioService.buscaPorEmpresaId(empresaId);
            } catch (UsuarioNaoEncontradoException e) {
                System.out.println(e.getMessage());
                return null;
            }
            System.out.println(usuario);
            return usuario;
        }).toList();
        assertNotNull(usuarios);
    }
}
