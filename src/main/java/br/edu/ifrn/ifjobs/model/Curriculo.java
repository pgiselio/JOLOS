package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

@Entity
@Component
public class Curriculo implements Serializable {

    private static final long serialVersionUID = 2L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Embedded
    private Arquivo pdf;

    @Column(nullable = false, length = 150)
    private String linkVideo;

    private Date dataImport;

    public Curriculo() {
    }

    public Curriculo(int id, Arquivo pdf, Date dataImport) {
        this.id = id;
        this.pdf = pdf;
        this.dataImport = dataImport;
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
     * @return Arquivo return the pdf
     */
    public Arquivo getPdf() {
        return pdf;
    }

    /**
     * @param pdf the pdf to set
     */
    public void setPdf(Arquivo pdf) {
        this.pdf = pdf;
    }

    /**
     * @return Date return the dataImport
     */
    public Date getDataImport() {
        return dataImport;
    }

    /**
     * @param dataImport the dataImport to set
     */
    public void setDataImport(Date dataImport) {
        this.dataImport = dataImport;
    }

}
