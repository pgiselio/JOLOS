package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
@Table(name = "imagem")
@Component
public class Imagem implements Serializable {

    private static final long serialVersionUID = 2831283L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private Arquivo arquivo;

    public Imagem() {
    }

    public Imagem(int id, Arquivo arquivo) {
        this.id = id;
        this.arquivo = arquivo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Arquivo getArquivo() {
        return arquivo;
    }

    public void setArquivo(Arquivo arquivo) {
        this.arquivo = arquivo;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((arquivo == null) ? 0 : arquivo.hashCode());
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
        Imagem other = (Imagem) obj;
        if (arquivo == null) {
            if (other.arquivo != null)
                return false;
        } else if (!arquivo.equals(other.arquivo))
            return false;
        return id == other.id;
    }

}
