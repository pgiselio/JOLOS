package br.edu.ifrn.ifjobs.dto.aluno;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;
import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Curriculo;
import br.edu.ifrn.ifjobs.model.Pessoa;

public class AlunoInsertDTO implements Dto<Aluno, AlunoInsertDTO> {

    private Pessoa dadosPessoa;

    private String resumo;

    @NotBlank(message = "O curso não foi informado!!")
    @Length(max = 100, message = "Você excedeu a quantidade de caracteres")
    private String curso;

    private int periodo;

    @NotBlank(message = "CPF não foi informado!!")
    @CPF(message = "CPF inválido!!")
    private String cpf;

    private ModelMapper modelMapper;

    public AlunoInsertDTO() {
    }

    public AlunoInsertDTO(Pessoa dadosPessoa, String curso,
            int periodo, String cpf) {
        this.dadosPessoa = dadosPessoa;
        this.curso = curso;
        this.periodo = periodo;
        this.cpf = cpf;
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

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    /**
     * @return String return the curso
     */
    public String getCurso() {
        return curso;
    }

    /**
     * @param curso the curso to set
     */
    public void setCurso(String curso) {
        this.curso = curso;
    }

    /**
     * @return int return the periodo
     */
    public int getPeriodo() {
        return periodo;
    }

    /**
     * @param periodo the periodo to set
     */
    public void setPeriodo(int periodo) {
        this.periodo = periodo;
    }

    /**
     * @return String return the cpf
     */
    public String getCpf() {
        return cpf;
    }

    /**
     * @param cpf the cpf to set
     */
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @Override
    public Aluno convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Aluno.class);
    }

    @Override
    public AlunoInsertDTO convertEntityToDto(Aluno entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, AlunoInsertDTO.class);
    }

}
