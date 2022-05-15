package br.edu.ifrn.ifjobs.dto.usuario;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Usuario;
import io.jsonwebtoken.impl.Base64Codec;
import io.jsonwebtoken.impl.TextCodec;

/**
 * Essa classe serve para ser dto para envio de email
 */
public class UsuarioEmailDTO implements Dto<Usuario, UsuarioEmailDTO> {

    public String email;
    public String senha;
    public String codigoAutenticacao;

    public UsuarioEmailDTO() {
        super();
    }

    public UsuarioEmailDTO(Usuario usuario) {
        this.email = usuario.getEmail();
        this.codigoAutenticacao = usuario.getCodigoAutenticacao();
        this.senha = TextCodec.BASE64.decodeToString(usuario.getSenha());
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
