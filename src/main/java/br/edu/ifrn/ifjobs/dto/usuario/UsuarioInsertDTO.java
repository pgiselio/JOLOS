package br.edu.ifrn.ifjobs.dto.usuario;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.br.CPF;
import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;

public class UsuarioInsertDTO implements Dto<Usuario, UsuarioInsertDTO> {

    @NotBlank(message = "Nome não informado!!")
    private String nome;

    @Email(message = "Formato de email inválido!!")
    @NotBlank(message = "Email não informado!!")
    private String email;

    @NotBlank(message = "não informada")
    private String senha;

    @NotBlank(message = "CPF não informado!!")
    @CPF(message = "Formato de CPF inválido!!")
    private String cpf;

    private ModelMapper modelMapper;

    @Override
    public Usuario convertToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Usuario.class);
    }

    @Override
    public UsuarioInsertDTO convertToDto(Usuario entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, UsuarioInsertDTO.class);
    }

}
