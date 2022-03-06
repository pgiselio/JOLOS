package br.edu.ifrn.ifjobs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.ifjobs.model.Vaga;

@Repository
public interface VagaRepository extends JpaRepository<Vaga, Integer> {

}
