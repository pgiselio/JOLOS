package br.edu.ifrn.ifjobs.dto.aluno;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import br.edu.ifrn.ifjobs.model.Curriculo;
import br.edu.ifrn.ifjobs.model.Pessoa;

public class AlunoInsertDTO {

    // @NotBlank(message = "Dados pessoais não informados!!")
    private Pessoa dadosPessoa;

    @NotBlank(message = "O curso não foi informado!!")
    @Length(max = 100, message = "Você excedeu a quantidade de caracteres")
    private String curso;

    private int periodo;

    @NotBlank(message = "CPF não foi informado!!")
    @CPF(message = "CPF inválido!!")
    private String cpf;

    @NotNull(message = "O currículo não foi informado!!")
    private Curriculo curriculo;

    public AlunoInsertDTO() {
    }

    public AlunoInsertDTO(Pessoa dadosPessoa, String curso,
            int periodo, String cpf, Curriculo curriculo) {
        this.dadosPessoa = dadosPessoa;
        this.curso = curso;
        this.periodo = periodo;
        this.cpf = cpf;
        this.curriculo = curriculo;
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

    /**
     * @return Curriculo return the curriculo
     */
    public Curriculo getCurriculo() {
        return curriculo;
    }

    /**
     * @param curriculo the curriculo to set
     */
    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }

}
