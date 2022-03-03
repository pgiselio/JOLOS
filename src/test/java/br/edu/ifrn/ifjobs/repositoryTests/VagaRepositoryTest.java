package br.edu.ifrn.ifjobs.repositoryTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.sql.Date;
import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Pessoa;
import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.model.enums.StatusVaga;
import br.edu.ifrn.ifjobs.repository.AlunoRespository;
import br.edu.ifrn.ifjobs.repository.VagaRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class VagaRepositoryTest {

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private AlunoRespository alunoRespository;

    @Test
    void testCriandoVaga() {
        Date data = Date.valueOf(LocalDate.now());

        var vaga = new Vaga();
        vaga.setTitulo("Backend Developer");
        vaga.setDescricao("Vaga para desenvolvedor Backend Java...");
        vaga.setDataCriacao(data);
        vaga.setLocalizacao("João Câmara - RN");
        vaga.setStatus(StatusVaga.ATIVA);
        vaga.setCursoAlvo("informática");

        Vaga vagaSalva = vagaRepository.save(vaga);

        assertEquals(vaga, vagaSalva);
    }

    @Test
    void testBuscaVagaPorId() {
        final int ID = 1;

        Vaga vaga = vagaRepository.getById(ID);

        assertNotNull(vaga);
    }

    @Test
    void testAddAlunoParaNovaVaga() {
        Date data = Date.valueOf(LocalDate.now());

        var vaga = new Vaga();
        vaga.setTitulo("Frontend Developer");
        vaga.setDescricao("Vaga para desenvolvedor Frontend React...");
        vaga.setDataCriacao(data);
        vaga.setLocalizacao("Natal - RN");
        vaga.setStatus(StatusVaga.ATIVA);
        vaga.setCursoAlvo("informática");

        Aluno aluno = alunoRespository.findByCpf("11111111111");
        vaga.addAluno(aluno);

        Vaga vagaSalva = vagaRepository.save(vaga);

        assertEquals(vaga, vagaSalva);
    }

    @Test
    void testAddAlunoParaVagaExistente() {
        Vaga vaga = vagaRepository.findById(1).get();

        Aluno aluno = alunoRespository.findByCpf("11111111111");
        vaga.addAluno(aluno);

        Pessoa pessoa = new Pessoa("Bolsonaro", null, "Santa Cruz - RN");
        var outroAluno = new Aluno("ELTROTECNICA", 1, "33333333333", pessoa);
        vaga.addAluno(outroAluno);

        Vaga vagaSalva = vagaRepository.save(vaga);

        assertEquals(vaga, vagaSalva);
    }
}
