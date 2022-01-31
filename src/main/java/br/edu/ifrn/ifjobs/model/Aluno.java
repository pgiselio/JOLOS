package br.edu.ifrn.ifjobs.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.springframework.stereotype.Component;

import br.edu.ifrn.ifjobs.model.enums.StatusAluno;

@Entity
@Component
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String curso;

    private int periodo;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusAluno status;

    private Date dataNasc;

    @Column(nullable = false)
    private String localizacao;

    @Column(unique = true, nullable = false)
    private String cpf;

    @OneToOne
    private Curriculo idCurriculo;

    public Aluno() {
    }

    public Aluno(String nome, String curso,
            int periodo, StatusAluno status, Date dataNasc,
            String localizacao, String cpf) {
        this.nome = nome;
        this.curso = curso;
        this.periodo = periodo;
        this.status = status;
        this.dataNasc = dataNasc;
        this.localizacao = localizacao;
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
     * @return String return the nome
     */
    public String getNome() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
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
     * @return StatusAluno return the status
     */
    public StatusAluno getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(StatusAluno status) {
        this.status = status;
    }

    /**
     * @return Date return the dataNasc
     */
    public Date getDataNasc() {
        return dataNasc;
    }

    /**
     * @param dataNasc the dataNasc to set
     */
    public void setDataNasc(Date dataNasc) {
        this.dataNasc = dataNasc;
    }

    /**
     * @return String return the localizacao
     */
    public String getLocalizacao() {
        return localizacao;
    }

    /**
     * @param localizacao the localizacao to set
     */
    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
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
     * @return Curriculo return the idCurriculo
     */
    public Curriculo getIdCurriculo() {
        return idCurriculo;
    }

    /**
     * @param idCurriculo the idCurriculo to set
     */
    public void setIdCurriculo(Curriculo idCurriculo) {
        this.idCurriculo = idCurriculo;
    }

}
