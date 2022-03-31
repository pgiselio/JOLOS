package br.edu.ifrn.ifjobs.dto.vaga;

import javax.validation.constraints.NotBlank;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Vaga;

public class VagaInsertDto implements Dto<Vaga, VagaInsertDto> {

    @NotBlank(message = "Curso alvo não informado!")
    private String cursoAlvo;

    @NotBlank(message = "Descrição da vaga não informada!")
    private String titulo;

    @NotBlank(message = "Descrição da vaga não informada!")
    private String descricao;

    @NotBlank(message = "Localização não informada!")
    private String localizacao;

    @NotBlank(message = "Empresa não informada!")
    private String cnpj;

    private ModelMapper modelMapper;

    @Override
    public Vaga convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Vaga.class);
    }

    @Override
    public VagaInsertDto convertEntityToDto(Vaga entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, VagaInsertDto.class);
    }

    public String getCursoAlvo() {
        return cursoAlvo;
    }

    public void setCursoAlvo(String cursoAlvo) {
        this.cursoAlvo = cursoAlvo;
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

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

}
