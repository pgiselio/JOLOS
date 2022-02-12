package br.edu.ifrn.ifjobs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifrn.ifjobs.model.Empresa;

public interface EmailRepository extends JpaRepository<Empresa, Integer> {

}
