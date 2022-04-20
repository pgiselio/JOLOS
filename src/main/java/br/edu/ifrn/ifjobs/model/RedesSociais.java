package br.edu.ifrn.ifjobs.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class RedesSociais implements Serializable {

    private static final long serialVersionUID = 123113212312411L;

    @Column(length = 300)
    private String linkedin;

    @Column(length = 300)
    private String instagram;

    @Column(length = 300)
    private String facebook;

    @Column(length = 300)
    private String twitter;

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getTwitter() {
        return twitter;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

}
