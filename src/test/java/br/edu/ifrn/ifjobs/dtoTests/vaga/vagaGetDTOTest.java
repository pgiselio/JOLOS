package br.edu.ifrn.ifjobs.dtoTests.vaga;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import br.edu.ifrn.ifjobs.dto.vaga.VagaGetDTO;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.repository.AlunoRespository;
import br.edu.ifrn.ifjobs.repository.VagaRepository;
import org.springframework.test.context.ActiveProfiles;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
@ActiveProfiles("test")
public class vagaGetDTOTest {

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private AlunoRespository alunoRepository;

    @Test
    void testEntidadeParaDTO() {
        final Vaga vaga = vagaRepository.getById(1);

        final Aluno aluno = alunoRepository.findByCpf("11111111111");
        vaga.addAluno(aluno);

        final VagaGetDTO dto = new VagaGetDTO();
        final VagaGetDTO vagaConvertidaParaDto = dto.convertEntityToDto(vaga);

        final int qtdAlunos = vagaConvertidaParaDto.getAlunos().size();

        assertEquals(1, qtdAlunos);
    }
}
