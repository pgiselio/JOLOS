package br.edu.ifrn.ifjobs.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

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

    public Mensagem atualizaMensagem(Mensagem mensagem) throws MensagemNaoEncontradaException {
        Optional<Mensagem> mensagemOptional;
        mensagemOptional = Optional.ofNullable(mensagem);

        Supplier<MensagemNaoEncontradaException> excessao;
        excessao = () -> new MensagemNaoEncontradaException("Mensagem não encontrada!!");

        mensagemOptional.ifPresent(mensagemRepository::save);

        return mensagemOptional.orElseThrow(excessao);
    }

    public Mensagem atualizaCampos(final int id, JsonPatch patch)
            throws MensagemNaoEncontradaException, MensagemNaoCadastradoException, JsonPatchException,
            JsonProcessingException, IllegalArgumentException {
        ObjectMapper mapper = new ObjectMapper();

        Mensagem mensagemBuscadaPorId = buscarPorId(id);

        JsonNode convertValue;
        convertValue = mapper.convertValue(mensagemBuscadaPorId, JsonNode.class);

        JsonNode patched = patch.apply(convertValue);

        Mensagem mensagemConvertida = mapper.treeToValue(patched, Mensagem.class);

        return atualizaMensagem(mensagemConvertida);
    }
}
