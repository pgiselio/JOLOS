package br.edu.ifrn.ifjobs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;

@Entity
public class Role implements GrantedAuthority {

    private static final Long serialVersionUID = 54L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nomeRole;

    @Override
    public String getAuthority() {
        return this.nomeRole;
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
    public String getNomeRole() {
        return nomeRole;
    }

    /**
     * @param nomeRole the nomeRole to set
     */
    public void setNomeRole(String nomeRole) {
        this.nomeRole = nomeRole;
    }

}
