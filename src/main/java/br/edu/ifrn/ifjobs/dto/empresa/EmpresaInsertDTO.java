package br.edu.ifrn.ifjobs.dto.empresa;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.br.CNPJ;
import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.model.Pessoa;

public class EmpresaInsertDTO implements Dto<Empresa, EmpresaInsertDTO> {

    private Pessoa dadosPessoais;

    @CNPJ(message = "CNPJ inválido!!")
    private String cnpj;

    @NotBlank(message = "Resumo da empresa não informado!")
    private String resumo;

    @NotBlank(message = "Telefone não informado!")
    private String telefone;

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

    /**
     * @return Pessoa return the dadosPessoais
     */
    public Pessoa getDadosPessoais() {
        return dadosPessoais;
    }

    /**
     * @param dadosPessoais the dadosPessoais to set
     */
    public void setDadosPessoais(Pessoa dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
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

}
