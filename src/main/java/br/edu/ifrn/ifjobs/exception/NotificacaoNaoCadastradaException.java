package br.edu.ifrn.ifjobs.exception;

public class NotificacaoNaoCadastradaException extends RuntimeException {

    public NotificacaoNaoCadastradaException() {
        super("Notificação não cadastrada");
    }

    public NotificacaoNaoCadastradaException(String mensagem) {
        super(mensagem);
    }
}
