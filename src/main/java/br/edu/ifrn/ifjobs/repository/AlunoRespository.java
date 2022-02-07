package br.edu.ifrn.ifjobs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.ifjobs.model.Aluno;

@Repository
public interface AlunoRespository extends JpaRepository<Aluno, Integer> {

    @Query(value = """
                SELECT id
                FROM aluno a
                WHERE a.cpf = ?1
            """, nativeQuery = true)
    public int findIdByCpf(String cpf);
}
