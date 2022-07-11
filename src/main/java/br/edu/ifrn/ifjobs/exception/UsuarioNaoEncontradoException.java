package br.edu.ifrn.ifjobs.exception;

public class UsuarioNaoEncontradoException extends RuntimeException {

    public UsuarioNaoEncontradoException(String menssagem) {
        super(menssagem);
    }
}
