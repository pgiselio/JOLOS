package br.edu.ifrn.ifjobs.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;

@Entity
public class Usuario implements UserDetails {

    private static final long serialVersionUID = 212312L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false, length = 300)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false, length = 25)
    @Enumerated(EnumType.STRING)
    private StatusUsuario status;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuarios_roles", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToOne
    private Aluno aluno;

    @OneToOne
    private Empresa empresa;

    @Column(name = "codigo_auth")
    private String codigoAutenticacao;

    public Usuario() {
    }

    public Usuario(int id, String email, String senha, StatusUsuario status) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.status = status;
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
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return String return the senha
     */
    public String getSenha() {
        return senha;
    }

    /**
     * @param senha the senha to set
     */
    public void setSenha(String senha) {
        this.senha = senha;
    }

    /**
     * @return StatusUsuario return the status
     */
    public StatusUsuario getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(StatusUsuario status) {
        this.status = status;
    }

    /**
     * @return Aluno return the aluno
     */
    public Aluno getAluno() {
        return aluno;
    }

    /**
     * @param aluno the aluno to set
     */
    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    /**
     * @return Empresa return the empresa
     */
    public Empresa getEmpresa() {
        return empresa;
    }

    /**
     * @param empresa the empresa to set
     */
    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    /**
     * @return Set<Role> return the roles
     */
    public Set<Role> getRoles() {
        return roles;
    }

    /**
     * @param roles the Set<Role> to set
     */
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getCodigoAutenticacao() {
        return codigoAutenticacao;
    }

    public void setCodigoAutenticacao(String codigoAutenticacao) {
        this.codigoAutenticacao = codigoAutenticacao;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        roles.forEach(role -> authorities.add(
                new SimpleGrantedAuthority(role.getNomeRole().toString())));

        return authorities;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return this.senha;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "Usuario [aluno=" + aluno + ", email=" + email + ", empresa=" + empresa + ", id=" + id + ", roles="
                + roles + ", status=" + status + "]";
    }
}
