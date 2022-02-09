package br.edu.ifrn.ifjobs.dto.usuario;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.TipoUsuario;

public class UsuarioLoginGetDTO implements Dto<Usuario, UsuarioLoginGetDTO> {

    private int id;
    private String email;
    private TipoUsuario tipoUsuario;

    public UsuarioLoginGetDTO() {
    }

    public UsuarioLoginGetDTO(int id, String email, TipoUsuario tipoUsuario) {
        this.id = id;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }

    private ModelMapper modelMapper;

    @Override
    public Usuario convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Usuario.class);
    }

    @Override
    public UsuarioLoginGetDTO convertEntityToDto(Usuario entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, UsuarioLoginGetDTO.class);
    }

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
     * @return TipoUsuario return the tipoUsuario
     */
    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    /**
     * @param tipoUsuario the tipoUsuario to set
     */
    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

}
