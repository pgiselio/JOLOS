package br.edu.ifrn.ifjobs.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.model.Imagem;
import br.edu.ifrn.ifjobs.service.ImagemService;

@RestController
@RequestMapping("/imagem")
public class ImagemController {

    @Autowired
    private ImagemService imagemService;

    @PostMapping("/uploadFotoPerfil/{id}")
    public ResponseEntity<?> uploadFotoPerfil(@PathVariable(name = "id") int id,
            @RequestParam(name = "arquivo") MultipartFile arquivo) {
        try {
            imagemService.uploadFotoPerfilUsuario(id, arquivo);
        } catch (UsuarioNaoCadastradoException e) {
            ResponseEntity.status(404).body(e);
        } catch (IOException e) {
            ResponseEntity.status(417);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/fotoPerfil/{idUsuario}")
    public ResponseEntity<?> getFotoPerfil(@PathVariable(name = "idUsuario") int idUsuario) {
        var fotoPerfil = new Imagem();
        try {
            fotoPerfil = imagemService.getFotoPerfil(idUsuario);
        } catch (UsuarioNaoCadastradoException e) {
            ResponseEntity.status(404).body(e);
        }
        return ResponseEntity.ok(fotoPerfil);
    }

}
