package br.edu.ifrn.ifjobs.exception;

public class TokenInvalidoException extends RuntimeException {

    private static final String MENSAGEM_DE_ERRO = "Token inválido";

    public TokenInvalidoException(String message) {
        super(message);
    }

    public TokenInvalidoException() {
        super(MENSAGEM_DE_ERRO);
    }
    
}
