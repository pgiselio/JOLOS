package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Mensagem implements Serializable {

    private static final long serialVersionUID = 12312L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String texto;

    @Column(nullable = false)
    private Vaga vaga;

    @Column(nullable = false)
    private Usuario usuario;

    @ManyToOne
    private Mensagem mensagemForum;

    public Mensagem(int id, String texto, Vaga vaga, Usuario usuario, Mensagem mensagemForum) {
        this.id = id;
        this.texto = texto;
        this.vaga = vaga;
        this.usuario = usuario;
        this.mensagemForum = mensagemForum;
    }

    public Mensagem() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Vaga getVaga() {
        return vaga;
    }

    public void setVaga(Vaga vaga) {
        this.vaga = vaga;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Mensagem getMensagemForum() {
        return this.mensagemForum;
    }

    public void setMensagemForum(Mensagem mensagemForum) {
        this.mensagemForum = mensagemForum;
    }

}
