package br.edu.ifrn.ifjobs.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.ifjobs.model.Aluno;

@Repository
public interface AlunoRespository extends CrudRepository<Aluno, Integer> {

}
