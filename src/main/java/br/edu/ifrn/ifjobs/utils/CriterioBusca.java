package br.edu.ifrn.ifjobs.utils;

public class CriterioBusca {

    private String chave;
    private String operacao;
    private Object valor;
    private boolean orPredicate;

    public CriterioBusca() {
    }

    public CriterioBusca(String chave, String operacao, Object valor) {
        this.chave = chave;
        this.operacao = operacao;
        this.valor = valor;
    }

    public String getChave() {
        return chave;
    }

    public void setChave(String chave) {
        this.chave = chave;
    }

    public String getOperacao() {
        return operacao;
    }

    public void setOperacao(String operacao) {
        this.operacao = operacao;
    }

    public Object getValor() {
        return valor;
    }

    public void setValor(Object valor) {
        this.valor = valor;
    }

    public boolean isOrPredicate() {
        return orPredicate;
    }

    public void setOrPredicate(boolean orPredicate) {
        this.orPredicate = orPredicate;
    }

    @Override
    public String toString() {
        return "CriterioBusca [chave=" + chave + ", operacao=" + operacao + ", valor=" + valor + "]";
    }

}
