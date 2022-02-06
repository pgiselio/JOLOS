package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.springframework.stereotype.Component;

@Component
@Embeddable
public class Arquivo implements Serializable {

    private static final long serialVersionUID = 1L;

    private String nome;

    @Column(nullable = false)
    private String tipoArquivo;

    @Column(nullable = false)
    private byte[] dados;

    public Arquivo() {
    }

    public Arquivo(String nome, String tipoArquivo, byte[] dados) {
        this.nome = nome;
        this.tipoArquivo = tipoArquivo;
        this.dados = dados;
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
     * @return String return the tipoArquivo
     */
    public String getTipoArquivo() {
        return tipoArquivo;
    }

    /**
     * @param tipoArquivo the tipoArquivo to set
     */
    public void setTipoArquivo(String tipoArquivo) {
        this.tipoArquivo = tipoArquivo;
    }

    /**
     * @return byte[] return the dados
     */
    public byte[] getDados() {
        return dados;
    }

    /**
     * @param dados the dados to set
     */
    public void setDados(byte[] dados) {
        this.dados = dados;
    }

}
