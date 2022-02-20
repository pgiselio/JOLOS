package br.edu.ifrn.ifjobs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Empresa;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {

    @Query(value = """
            SELECT *
            FROM Empresa e
            WHERE e.cnpj = ?1
            """)
    public Aluno findByCnpj(String cnpj);
}
