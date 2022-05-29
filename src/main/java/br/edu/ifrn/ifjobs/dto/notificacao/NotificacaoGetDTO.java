package br.edu.ifrn.ifjobs.dto.notificacao;

import java.time.LocalDateTime;

import br.edu.ifrn.ifjobs.dto.usuario.UsuarioInsertGetDTO;

public class NotificacaoGetDTO {

    private int id;
    private String titulo;
    private String descricao;
    private LocalDateTime data;
    private boolean visualizado;
    private UsuarioInsertGetDTO usuario;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public boolean isVisualizado() {
        return visualizado;
    }

    public void setVisualizado(boolean visualizado) {
        this.visualizado = visualizado;
    }

    public UsuarioInsertGetDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioInsertGetDTO usuario) {
        this.usuario = usuario;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        return obj instanceof NotificacaoGetDTO other && id != other.id;
    }

}
