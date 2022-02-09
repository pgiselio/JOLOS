package br.edu.ifrn.ifjobs.dto.usuario;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;

public class UsuarioInsertDTO implements Dto<Usuario, UsuarioInsertDTO> {

    @Email(message = "Formato de email inválido!!")
    @NotBlank(message = "Email não informado!!")
    private String email;

    @NotBlank(message = "não informada")
    private String senha;

    private ModelMapper modelMapper;

    @Override
    public Usuario convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Usuario.class);
    }

    @Override
    public UsuarioInsertDTO convertEntityToDto(Usuario entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, UsuarioInsertDTO.class);
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

}
