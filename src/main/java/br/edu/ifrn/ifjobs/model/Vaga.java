package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;

import org.hibernate.annotations.Type;

import br.edu.ifrn.ifjobs.model.enums.StatusVaga;

@Entity
public class Vaga implements Serializable {

    private static final long serialVersionUID = 123120L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String cursoAlvo;

    @Column(length = 100, nullable = false)
    private String titulo;

    @Column(nullable = false)
    @Type(type = "text")
    private String descricao;

    @Column(length = 300)
    private String localizacao;

    private Date dataCriacao;

    @Enumerated(EnumType.STRING)
    private StatusVaga status;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "vaga_aluno", joinColumns = @JoinColumn(name = "vaga_id"), inverseJoinColumns = @JoinColumn(name = "aluno_id"))
    private Set<Aluno> alunos = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Set<Empresa> empresas = new HashSet<>();

    public Vaga(int id, String cursoAlvo, String titulo,
            String descricao, String localizacao, Date dataCriacao) {
        this.id = id;
        this.cursoAlvo = cursoAlvo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.localizacao = localizacao;
        this.dataCriacao = dataCriacao;
    }

    public Vaga() {

    }

    public StatusVaga getStatus() {
        return status;
    }

    public void setStatus(StatusVaga status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCursoAlvo() {
        return cursoAlvo;
    }

    public void setCursoAlvo(String cursoAlvo) {
        this.cursoAlvo = cursoAlvo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }

    public Set<Empresa> getEmpresas() {
        return empresas;
    }

    public void setEmpresas(Set<Empresa> empresas) {
        this.empresas = empresas;
    }

    public void addAluno(Aluno aluno) {
        this.alunos.add(aluno);
    }

    public void addEmpresa(Empresa empresa) {
        this.empresas.add(empresa);
    }

}
