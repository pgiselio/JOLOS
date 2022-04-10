package br.edu.ifrn.ifjobs.dto.aluno;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Curriculo;
import br.edu.ifrn.ifjobs.model.Pessoa;

public class AlunoGetDTO implements Dto<Aluno, AlunoGetDTO> {

    private int id;

    private Pessoa dadosPessoa;

    private String curso;

    private int periodo;

    private String cpf;

    private Curriculo curriculo;

    private ModelMapper modelMapper;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Pessoa getDadosPessoa() {
        return dadosPessoa;
    }

    public void setDadosPessoa(Pessoa dadosPessoa) {
        this.dadosPessoa = dadosPessoa;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public int getPeriodo() {
        return periodo;
    }

    public void setPeriodo(int periodo) {
        this.periodo = periodo;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public int getCurriculo() {
        return curriculo.getId();
    }

    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }

    @Override
    public Aluno convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Aluno.class);
    }

    @Override
    public AlunoGetDTO convertEntityToDto(Aluno entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, AlunoGetDTO.class);
    }

}
