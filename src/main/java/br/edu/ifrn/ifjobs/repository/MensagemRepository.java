package br.edu.ifrn.ifjobs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifrn.ifjobs.model.Mensagem;

public interface MensagemRepository extends JpaRepository<Mensagem, Integer> {

}
