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

    @Autowired
    private UsuarioService usuarioService;

    public Imagem uploadFotoPerfilUsuario(int usuarioId, MultipartFile multipartFile)
            throws IOException, UsuarioNaoCadastradoException {
        Usuario usuario = usuarioService.buscaPorId(usuarioId);

        var arquivo = new Arquivo();
        arquivo.setDados(multipartFile.getBytes());

        String extensaoArquivo = DecompositorNomeArquivo.pegaExtensaoArquivo(multipartFile.getOriginalFilename());
        arquivo.setTipoArquivo(extensaoArquivo);

        if (usuario.getFotoPerfil() != null) {
            Imagem imagem = _setAquivoEmImagem(arquivo);
            _salvaImagemNoUsuarioPassado(usuario, imagem);
            return imagem;
        }

        arquivo.setNome("fotoPerfil_" + usuario.getId());

        Imagem imagem = _setAquivoEmImagem(arquivo);
        _salvaImagemNoUsuarioPassado(usuario, imagem);

        return imagem;
    }

    private Imagem _setAquivoEmImagem(Arquivo arquivo) {
        var imagem = new Imagem();
        imagem.setArquivo(arquivo);
        return imagem;
    }

    private void _salvaImagemNoUsuarioPassado(Usuario usuario, Imagem imagem) throws UsuarioNaoCadastradoException {
        usuario.setFotoPerfil(imagem);
        usuarioService.atualizaUsuario(usuario);
    }

    public List<Imagem> buscaTodas() {
        return imagemRepository.findAll();
    }
}
