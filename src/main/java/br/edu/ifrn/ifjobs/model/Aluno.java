package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Type;
import org.springframework.stereotype.Component;

@Entity
@Component
public class Aluno implements Serializable {

    private static final long serialVersionUID = 3L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private Pessoa dadosPessoa;

    @Column
    @Type(type = "text")
    private String resumo;

    @Column(nullable = false, length = 100)
    private String curso;

    @Column(nullable = true)
    private int periodo;

    @Column(unique = true, nullable = false, length = 11)
    private String cpf;

    @OneToOne(cascade = CascadeType.ALL)
    @Basic(fetch = FetchType.LAZY)
    private Curriculo curriculo;

    public Aluno() {
    }

    public Aluno(String curso,
            int periodo, String cpf, Pessoa pessoa) {
        this.curso = curso;
        this.periodo = periodo;
        this.dadosPessoa = pessoa;
        this.cpf = cpf;
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
     * @return String return the curso
     */
    public String getCurso() {
        return curso;
    }

    /**
     * @param curso the curso to set
     */
    public void setCurso(String curso) {
        this.curso = curso;
    }

    /**
     * @return int return the periodo
     */
    public int getPeriodo() {
        return periodo;
    }

    /**
     * @param periodo the periodo to set
     */
    public void setPeriodo(int periodo) {
        this.periodo = periodo;
    }

    /**
     * @return String return the cpf
     */
    public String getCpf() {
        return cpf;
    }

    /**
     * @param cpf the cpf to set
     */
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    /**
     * @return Curriculo return the curriculo
     */
    public Curriculo getCurriculo() {
        return curriculo;
    }

    /**
     * @param curriculo the curriculo to set
     */
    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }

    /**
     * @return Pessoa return the dadosPessoa
     */
    public Pessoa getDadosPessoa() {
        return dadosPessoa;
    }

    /**
     * @param dadosPessoa the dadosPessoa to set
     */
    public void setDadosPessoa(Pessoa dadosPessoa) {
        this.dadosPessoa = dadosPessoa;
    }

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

}
