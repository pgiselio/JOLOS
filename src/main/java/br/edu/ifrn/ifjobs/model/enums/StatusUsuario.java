package br.edu.ifrn.ifjobs.model.enums;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.edu.ifrn.ifjobs.model.Usuario;

@JsonDeserialize(as = Usuario.class)
public enum StatusUsuario {

    PENDENTE, CONCLUIDO, DESATIVADO
}
