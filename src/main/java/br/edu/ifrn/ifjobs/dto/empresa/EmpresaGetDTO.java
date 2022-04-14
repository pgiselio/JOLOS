package br.edu.ifrn.ifjobs.dto.empresa;

import br.edu.ifrn.ifjobs.model.Pessoa;
import br.edu.ifrn.ifjobs.model.RedesSociais;

public class EmpresaGetDTO {

    private int id;

    private Pessoa dadosPessoa;

    private String cnpj;

    private String resumo;

    private String telefone;

    private RedesSociais redesSociais;

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

    public RedesSociais getRedesSociais() {
        return redesSociais;
    }

    public void setRedesSociais(RedesSociais redesSociais) {
        this.redesSociais = redesSociais;
    }

}
