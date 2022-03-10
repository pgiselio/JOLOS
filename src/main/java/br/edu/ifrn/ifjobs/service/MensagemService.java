package br.edu.ifrn.ifjobs.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import br.edu.ifrn.ifjobs.exception.MensagemNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.MensagemNaoEncontradaException;
import br.edu.ifrn.ifjobs.model.Mensagem;
import br.edu.ifrn.ifjobs.repository.MensagemRepository;

@Service
public class MensagemService {

    @Autowired
    private MensagemRepository mensagemRepository;

    public Mensagem salvaMensagem(final Mensagem mensagem) throws MensagemNaoCadastradoException {
        Optional<Mensagem> mensagemOptional;
        mensagemOptional = Optional.ofNullable(mensagem);

        Supplier<MensagemNaoCadastradoException> excessao;
        excessao = () -> new MensagemNaoCadastradoException("Mensagem não cadastrada!!");

        mensagemOptional.ifPresent(mensagemRepository::save);

        return mensagemOptional.orElseThrow(excessao);
    }

    public Mensagem buscarPorId(final int id) throws MensagemNaoEncontradaException {
        Optional<Mensagem> mensagemBuscadaPorId;
        mensagemBuscadaPorId = mensagemRepository.findById(id);

        Supplier<MensagemNaoEncontradaException> excessao;
        excessao = () -> new MensagemNaoEncontradaException("Mensagem não encontrada!!");

        return mensagemBuscadaPorId.orElseThrow(excessao);
    }

    public List<Mensagem> buscaTodasMensagens() {
        return mensagemRepository.findAll();
    }

    public void delete(int id) throws MensagemNaoEncontradaException {
        final Mensagem mensagem = buscarPorId(id);
        mensagemRepository.delete(mensagem);
    }

    public Mensagem atualizaCampos(final int id, Map<Object, Object> campos)
            throws MensagemNaoEncontradaException, MensagemNaoCadastradoException {
        Mensagem mensagemBuscadaPorId = buscarPorId(id);

        campos.forEach((chave, valor) -> {
            Field campo = ReflectionUtils.findField(Mensagem.class, (String) chave);
            campo.setAccessible(true);
            ReflectionUtils.setField(campo, mensagemBuscadaPorId, valor);
        });

        return salvaMensagem(mensagemBuscadaPorId);
    }
}
