package br.edu.ifrn.ifjobs.dto.empresa;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.br.CNPJ;
import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.model.Pessoa;
import br.edu.ifrn.ifjobs.model.RedesSociais;

public class EmpresaInsertDTO implements Dto<Empresa, EmpresaInsertDTO> {

    private Pessoa dadosPessoais;

    @CNPJ(message = "CNPJ inválido!!")
    private String cnpj;

    private String resumo;

    @NotBlank(message = "Telefone não informado!")
    private String telefone;

    private RedesSociais redesSociais;

    private String linkSite;

    private ModelMapper modelMapper;

    public EmpresaInsertDTO() {
    }

    public EmpresaInsertDTO(Pessoa dadosPessoais, String cnpj,
            String resumo, String telefone) {
        this.dadosPessoais = dadosPessoais;
        this.cnpj = cnpj;
        this.resumo = resumo;
        this.telefone = telefone;
    }

    @Override
    public Empresa convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Empresa.class);
    }

    @Override
    public EmpresaInsertDTO convertEntityToDto(Empresa entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, EmpresaInsertDTO.class);
    }

    public Pessoa getDadosPessoais() {
        return dadosPessoais;
    }

    public void setDadosPessoais(Pessoa dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public RedesSociais getRedesSociais() {
        return redesSociais;
    }

    public void setRedesSociais(RedesSociais redesSociais) {
        this.redesSociais = redesSociais;
    }

    public String getLinkSite() {
        return linkSite;
    }

    public void setLinkSite(String linkSite) {
        this.linkSite = linkSite;
    }

}
