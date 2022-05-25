package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

@Component
@Entity
public class Empresa implements Serializable {

    private static final long serialVersionUID = 10L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private Pessoa dadosPessoa;

    @Column(nullable = false, length = 20, unique = true)
    private String cnpj;

    @Column(columnDefinition = "TEXT")
    private String resumo;

    @Column(nullable = false, length = 12)
    private String telefone;

    private RedesSociais redesSociais;

    private String linkSite;

    public RedesSociais getRedesSociais() {
        return redesSociais;
    }

    public void setRedesSociais(RedesSociais redesSociais) {
        this.redesSociais = redesSociais;
    }

    public Empresa() {
    }

    public Empresa(int id, Pessoa dadoPessoa,
            String cnpj, String resumo, String telefone) {
        this.id = id;
        this.dadosPessoa = dadoPessoa;
        this.cnpj = cnpj;
        this.resumo = resumo;
        this.telefone = telefone;
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

    /**
     * @return String return the cnpj
     */
    public String getCnpj() {
        return cnpj;
    }

    /**
     * @param cnpj the cnpj to set
     */
    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    /**
     * @return String return the resumo
     */
    public String getResumo() {
        return resumo;
    }

    /**
     * @param resumo the resumo to set
     */
    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    /**
     * @return String return the telefone
     */
    public String getTelefone() {
        return telefone;
    }

    /**
     * @param telefone the telefone to set
     */
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getLinkSite() {
        return linkSite;
    }

    public void setLinkSite(String linkSite) {
        this.linkSite = linkSite;
    }

    @Override
    public String toString() {
        return "Empresa [cnpj=" + cnpj + ", dadosPessoa=" + dadosPessoa + ", id=" + id + ", resumo=" + resumo
                + ", telefone=" + telefone + ", linkSite=" + linkSite + "]";
    }

}
