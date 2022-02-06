package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Pessoa implements Serializable {

    @Column(nullable = false, length = 300)
    private String nome;

    private Date dataNasc;

    @Column(nullable = false, length = 200)
    private String localizacao;

    public Pessoa() {
    }

    public Pessoa(String nome, Date dataNasc, String localizacao) {
        this.nome = nome;
        this.dataNasc = dataNasc;
        this.localizacao = localizacao;
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

}
