package br.edu.ifrn.ifjobs.dto.usuario;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;

public class UsuarioInsertGetDTO implements Dto<Usuario, UsuarioInsertGetDTO> {

    private int id;
    private String nome;
    private String email;
    private int alunoId;

    public UsuarioInsertGetDTO() {
    }

    public UsuarioInsertGetDTO(int id, String nome, String email, int alunoId) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.alunoId = alunoId;
    }

    private ModelMapper modelMapper;

    @Override
    public Usuario convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Usuario.class);
    }

    public int getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(int alunoId) {
        this.alunoId = alunoId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public UsuarioInsertGetDTO convertEntityToDto(Usuario entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, UsuarioInsertGetDTO.class);
    }

}
