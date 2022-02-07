package br.edu.ifrn.ifjobs.dto.usuario;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;

public class UsuarioInsertDTO implements Dto<Usuario, UsuarioInsertDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Usuario convertToEntity() {
        return modelMapper.map(this, Usuario.class);
    }

    @Override
    public UsuarioInsertDTO convertToDto(Usuario entity) {
        return modelMapper.map(entity, UsuarioInsertDTO.class);
    }

}
