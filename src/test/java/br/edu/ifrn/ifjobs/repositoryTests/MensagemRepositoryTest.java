package br.edu.ifrn.ifjobs.repositoryTests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import br.edu.ifrn.ifjobs.model.Mensagem;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.repository.MensagemRepository;
import br.edu.ifrn.ifjobs.repository.UsuarioRepository;
import br.edu.ifrn.ifjobs.repository.VagaRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class MensagemRepositoryTest {

    @Autowired
    private MensagemRepository mensagemRepository;

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    void testCriandoMensagem() {
        var mensagem = new Mensagem();

        Vaga vaga = vagaRepository.getById(1);
        mensagem.setVaga(vaga);
        mensagem.setTexto(vaga.getTitulo());

        Usuario usuario = usuarioRepository.getById(1);
        mensagem.setUsuario(usuario);

        Mensagem mensagemSalva = mensagemRepository.save(mensagem);

        assertEquals(mensagem, mensagemSalva);
    }

    void criaVaga(Vaga vaga) {

    }
}
