package br.edu.ifrn.ifjobs.dto.vaga;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.model.enums.StatusVaga;

public class VagaGetAllDTO implements Dto<Vaga, VagaGetAllDTO> {

    private int id;

    private String cursoAlvo;

    private String titulo;

    private String descricao;

    private String localizacao;

    private Date dataCriacao;

    private StatusVaga status;

    private Set<Usuario> alunos = new HashSet<>();

    private Empresa empresa;

    private ModelMapper modelMapper;

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
     * @return String return the cursoAlvo
     */
    public String getCursoAlvo() {
        return cursoAlvo;
    }

    /**
     * @param cursoAlvo the cursoAlvo to set
     */
    public void setCursoAlvo(String cursoAlvo) {
        this.cursoAlvo = cursoAlvo;
    }

    /**
     * @return String return the titulo
     */
    public String getTitulo() {
        return titulo;
    }

    /**
     * @param titulo the titulo to set
     */
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    /**
     * @return String return the descricao
     */
    public String getDescricao() {
        return descricao;
    }

    /**
     * @param descricao the descricao to set
     */
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    /**
     * @return String return the localizacao
     */
    public String getLocalizacao() {
        return localizacao;
    }

    /**
     * @param localizacao the localizacao to set
     */
    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    /**
     * @return Date return the dataCriacao
     */
    public Date getDataCriacao() {
        return dataCriacao;
    }

    /**
     * @param dataCriacao the dataCriacao to set
     */
    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    /**
     * @return StatusVaga return the status
     */
    public StatusVaga getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(StatusVaga status) {
        this.status = status;
    }

    /**
     * @return List<Usuario> return the alunos
     */
    public Set<Integer> getAlunos() {
        return alunos.stream()
                .filter(usuario -> usuario.getAluno() != null)
                .map(Usuario::getId)
                .collect(Collectors.toSet());
    }

    /**
     * @param alunos the alunos to set
     */
    public void setAlunos(Set<Usuario> alunos) {
        this.alunos = alunos;
    }

    @Override
    public Vaga convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Vaga.class);
    }

    @Override
    public VagaGetAllDTO convertEntityToDto(Vaga entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, VagaGetAllDTO.class);
    }

    /**
     * @return Empresa return the empresa
     */
    public Empresa getEmpresa() {
        return empresa;
    }

    /**
     * @param empresa the empresa to set
     */
    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public void setEmpresaID(int idUsuario) {
        this.empresa.setId(idUsuario);
    }

}
