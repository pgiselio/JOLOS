package br.edu.ifrn.ifjobs.dto.usuario;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;

/**
 * Essa classe serve para ser dto para envio de email
 */
public class UsuarioEmailDTO implements Dto<Usuario, UsuarioEmailDTO> {

    public String email;
    public String senha;
    public String codigoAutenticacao;
    public String token;

    public UsuarioEmailDTO() {
        super();
    }

    public UsuarioEmailDTO(Usuario usuario) {
        this.email = usuario.getEmail();
        this.codigoAutenticacao = usuario.getCodigoAutenticacao();
        this.senha = usuario.getSenha();
        if(usuario.getToken() != null) {
            this.token = usuario.getToken()
                                .replace("Bearer ", "");
        }
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCodigoAutenticacao() {
        return codigoAutenticacao;
    }

    public void setCodigoAutenticacao(String codigoAutenticacao) {
        this.codigoAutenticacao = codigoAutenticacao;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    private ModelMapper modelMapper;

    @Override
    public Usuario convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Usuario.class);
    }

    @Override
    public UsuarioEmailDTO convertEntityToDto(Usuario entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, UsuarioEmailDTO.class);
    }
}
