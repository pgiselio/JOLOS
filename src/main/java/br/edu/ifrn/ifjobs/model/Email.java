package br.edu.ifrn.ifjobs.model;

import org.springframework.stereotype.Component;

@Component
public class Email {

    private String destinatario;
    private String remetente;
    private String assunto;
    private String mensagem;
    private boolean isHtml;

    public Email() {
    }

    public boolean isHtml() {
        return isHtml;
    }

    public void setHtml(boolean isHtml) {
        this.isHtml = isHtml;
    }

    public String getAssunto() {
        return assunto;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public Email(String destinatario, String remetente, String mensagem) {
        this.destinatario = destinatario;
        this.remetente = remetente;
        this.mensagem = mensagem;
    }

    /**
     * @return String return the destinatario
     */
    public String getDestinatario() {
        return destinatario;
    }

    /**
     * @param destinatario the destinatario to set
     */
    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    /**
     * @return String return the remetente
     */
    public String getRemetente() {
        return remetente;
    }

    /**
     * @param remetente the remetente to set
     */
    public void setRemetente(String remetente) {
        this.remetente = remetente;
    }

    /**
     * @return String return the mensagem
     */
    public String getMensagem() {
        return mensagem;
    }

    /**
     * @param mensagem the mensagem to set
     */
    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

}
