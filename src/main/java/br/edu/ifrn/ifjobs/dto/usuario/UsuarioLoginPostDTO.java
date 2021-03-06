package br.edu.ifrn.ifjobs.dto.usuario;

import javax.validation.constraints.Email;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;

public class UsuarioLoginPostDTO implements Dto<Usuario, UsuarioLoginPostDTO> {

    @Email(message = "Formato de email Inválido!!")
    private String email;

    private String senha;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Usuario convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Usuario.class);
    }

    @Override
    public UsuarioLoginPostDTO convertEntityToDto(Usuario entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, UsuarioLoginPostDTO.class);
    }

    public UsuarioLoginPostDTO() {
    }

    public UsuarioLoginPostDTO(String email, String senha) {
        this.email = email;
        this.senha = senha;
    }

    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return String return the senha
     */
    public String getSenha() {
        return senha;
    }

    /**
     * @param senha the senha to set
     */
    public void setSenha(String senha) {
        this.senha = senha;
    }

    /**
     * @return ModelMapper return the modelMapper
     */
    public ModelMapper getModelMapper() {
        return modelMapper;
    }

    /**
     * @param modelMapper the modelMapper to set
     */
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

}
