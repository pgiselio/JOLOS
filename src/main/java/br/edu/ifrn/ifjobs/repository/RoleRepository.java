package br.edu.ifrn.ifjobs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.edu.ifrn.ifjobs.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query("SELECT r FROM Role r WHERE r.nomeRole = ?1")
    public Role findByNome(String nome);
}
