package br.edu.ifrn.ifjobs.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.model.Arquivo;
import br.edu.ifrn.ifjobs.model.Imagem;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.repository.ImagemRepository;

@Service
public class ImagemService {

    @Autowired
    private ImagemRepository imagemRepository;

    private UsuarioService usuarioService;

    public Imagem uploadFotoPerfilUsuario(int usuarioId, MultipartFile multipartFile)
            throws IOException, UsuarioNaoCadastradoException {
        Usuario usuario = usuarioService.buscaPorId(usuarioId);

        Arquivo arquivo = new Arquivo();
        arquivo.setNome("fotoPerfil_" + usuario.getId());
        arquivo.setDados(multipartFile.getBytes());
        arquivo.setTipoArquivo(multipartFile.getContentType());

        Imagem imagem = new Imagem();
        imagem.setArquivo(arquivo);

        usuario.setFotoPerfil(imagem);
        usuarioService.atualizaUsuario(usuario);

        return imagem;
    }

    public List<Imagem> buscaTodas() {
        return imagemRepository.findAll();
    }
}
