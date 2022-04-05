package br.edu.ifrn.ifjobs.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.edu.ifrn.ifjobs.exception.CurriculoNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Arquivo;
import br.edu.ifrn.ifjobs.model.Curriculo;
import br.edu.ifrn.ifjobs.service.CurriculoService;

@RestController
@RequestMapping("/curriculo")
public class CurriculoController {

    @Autowired
    private CurriculoService service;

    @PostMapping(path = "/upload")
    public void upload(@RequestParam MultipartFile arquivo) {
        try {
            service.uploadArquivo(arquivo);
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível salvar o arquivo");
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> buscaPorId(@PathVariable(name = "id") int id) {
        Curriculo curriculo;

        try {
            curriculo = service.buscaPorId(id);
        } catch (CurriculoNaoEncontradoException e) {
            throw new RuntimeException(e.getMessage());
        }

        Arquivo arquivo = curriculo.getPdf();
        String texto = "inline; filename=\\" + arquivo.getNome() + "\\";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(arquivo.getTipoArquivo()))
                .header(HttpHeaders.CONTENT_DISPOSITION, texto)
                .body(new ByteArrayResource(arquivo.getDados()));
    }
}
