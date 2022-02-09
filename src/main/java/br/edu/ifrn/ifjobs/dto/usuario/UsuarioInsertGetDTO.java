package br.edu.ifrn.ifjobs.dto.usuario;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;

public class UsuarioInsertGetDTO implements Dto<Usuario, UsuarioInsertGetDTO> {

    private int id;
    private String email;

    public UsuarioInsertGetDTO() {
    }

    public UsuarioInsertGetDTO(int id, String email) {
        this.id = id;
        this.email = email;
    }

    private ModelMapper modelMapper;

    @Override
    public Usuario convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Usuario.class);
    }

    @Override
    public UsuarioInsertGetDTO convertEntityToDto(Usuario entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, UsuarioInsertGetDTO.class);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
