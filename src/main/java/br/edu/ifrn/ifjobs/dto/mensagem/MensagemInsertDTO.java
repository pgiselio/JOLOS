package br.edu.ifrn.ifjobs.dto.mensagem;

import javax.validation.constraints.NotBlank;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.model.Mensagem;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.Vaga;

public class MensagemInsertDTO implements Dto<Mensagem, MensagemInsertDTO> {

    private int id;

    @NotBlank(message = "texto vazio")
    private String texto;

    private Vaga vaga;

    private Usuario usuario;

    private Mensagem resposta;

    private ModelMapper modelMapper;

    public MensagemInsertDTO(int id, String texto, Vaga vaga, Usuario usuario,
            Mensagem resposta) {
        this.id = id;
        this.texto = texto;
        this.vaga = vaga;
        this.usuario = usuario;
        this.resposta = resposta;
    }

    public MensagemInsertDTO() {

    }

    @Override
    public Mensagem convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Mensagem.class);
    }

    @Override
    public MensagemInsertDTO convertEntityToDto(Mensagem entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, MensagemInsertDTO.class);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Vaga getVaga() {
        return vaga;
    }

    public void setVaga(Vaga vaga) {
        this.vaga = vaga;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Mensagem getResposta() {
        return resposta;
    }

    public void setResposta(Mensagem resposta) {
        this.resposta = resposta;
    }

}
