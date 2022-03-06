package br.edu.ifrn.ifjobs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.ifjobs.model.Role;
import br.edu.ifrn.ifjobs.model.enums.TipoUsuario;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query("SELECT r FROM Role r WHERE r.nomeRole = ?1")
    public Role findByTipoUsuario(TipoUsuario nomeRole);
}
