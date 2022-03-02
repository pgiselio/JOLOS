package br.edu.ifrn.ifjobs.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

import br.edu.ifrn.ifjobs.model.enums.TipoUsuario;

@Entity
@Table(name = "role_tb")
public class Role implements GrantedAuthority {

    private static final Long serialVersionUID = 54L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private TipoUsuario nomeRole;

    public Role() {

    }

    public Role(int id, TipoUsuario nomeRole) {
        this.id = id;
        this.nomeRole = nomeRole;
    }

    public Role(TipoUsuario nomeRole) {
        this.nomeRole = nomeRole;
    }

    public Role(int id) {
        this.id = id;
    }

    @Override
    public String getAuthority() {
        return this.nomeRole.toString();
    }

    /**
     * @return int return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return String return the nomeRole
     */
    public TipoUsuario getNomeRole() {
        return nomeRole;
    }

    /**
     * @param nomeRole the nomeRole to set
     */
    public void setNomeRole(TipoUsuario nomeRole) {
        this.nomeRole = nomeRole;
    }

}
