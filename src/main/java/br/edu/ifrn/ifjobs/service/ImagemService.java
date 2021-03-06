package br.edu.ifrn.ifjobs.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
        Optional<Imagem> container = Optional.ofNullable(usuario.getFotoPerfil());

        Arquivo arquivo = _construcaoBaseDeArquivo(multipartFile);

        Imagem fotoPerfil = _atualizaOuCriaImagem(usuario, container, arquivo);

        return fotoPerfil;
    }

    private Imagem _atualizaOuCriaImagem(Usuario usuario, Optional<Imagem> foto, Arquivo arquivo) {
        return foto.map(imagem -> {
            final Imagem imgPerfil = atualizarImagem(arquivo, imagem);
            _tratamentoParaSalvarImagemEmUsuario(usuario, imgPerfil);
            return imgPerfil;
        }).orElseGet(() -> {
            return _criaImagemParaUsuario(usuario, arquivo);
        });
    }

    private Imagem _criaImagemParaUsuario(Usuario usuario, Arquivo arquivo) {
        arquivo.setNome("fotoPerfil_" + usuario.getId());
        final Imagem imgPerfil = _updateImagem(arquivo);
        _tratamentoParaSalvarImagemEmUsuario(usuario, imgPerfil);
        return imgPerfil;
    }

    private Imagem atualizarImagem(Arquivo arquivo, Imagem imagem) {
        final Imagem img = imagemRepository.getById(imagem.getId());

        final Arquivo file = img.getArquivo();
        file.setDados(arquivo.getDados());
        file.setTipoArquivo(arquivo.getTipoArquivo());

        img.setArquivo(file);

        final Imagem imgPerfil = imagemRepository.save(img);
        return imgPerfil;
    }

    private Arquivo _construcaoBaseDeArquivo(MultipartFile multipartFile) throws IOException {
        var arquivo = new Arquivo();
        arquivo.setDados(multipartFile.getBytes());

        String extensaoArquivo = DecompositorNomeArquivo.pegaExtensaoArquivo(multipartFile.getOriginalFilename());
        arquivo.setTipoArquivo(extensaoArquivo);
        return arquivo;
    }

    private void _tratamentoParaSalvarImagemEmUsuario(Usuario usuario, Imagem fotoPerfil) {
        try {
            _salvaImagemNoUsuarioPassado(usuario, fotoPerfil);
        } catch (UsuarioNaoCadastradoException e) {
            throw new RuntimeException(e);
        }
    }

    private Imagem _updateImagem(Arquivo arquivo) {
        var imagem = new Imagem();
        imagem.setArquivo(arquivo);
        return imagem;
    }

    private void _salvaImagemNoUsuarioPassado(Usuario usuario, Imagem imagem) throws UsuarioNaoCadastradoException {
        usuario.setFotoPerfil(imagem);
        System.out.println(usuario);
        Usuario user = usuarioService.atualizaUsuario(usuario);
        System.out.println(user);
    }

    public List<Imagem> buscaTodas() {
        return imagemRepository.findAll();
    }

    public Imagem getFotoPerfil(int idUsuario) throws UsuarioNaoCadastradoException {
        return usuarioService.buscaPorId(idUsuario).getFotoPerfil();
    }
}
