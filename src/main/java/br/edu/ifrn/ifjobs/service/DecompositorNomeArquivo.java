package br.edu.ifrn.ifjobs.service;

import org.springframework.stereotype.Service;

@Service
public class DecompositorNomeArquivo {

    public static String pegaNomeArquivo(String nomeArquivo) {
        return nomeArquivo.substring(0, nomeArquivo.indexOf("."));
    }

    public static String pegaExtensaoArquivo(String nomeArquivo) {
        return nomeArquivo.substring(nomeArquivo.indexOf(".") + 1);
    }

    public static String pegaPrimeiroeUltimoNome(String nomeArquivo) {
        String[] nomeDescomposto = nomeArquivo.split(" ");
        String primeiroNome = nomeDescomposto[0];
        String ultimoNome = nomeDescomposto[nomeDescomposto.length - 1];
        return primeiroNome + " " + ultimoNome;
    }
}
