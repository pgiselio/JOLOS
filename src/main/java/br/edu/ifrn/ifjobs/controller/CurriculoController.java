package br.edu.ifrn.ifjobs.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.exception.CurriculoNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Arquivo;
import br.edu.ifrn.ifjobs.model.Curriculo;
import br.edu.ifrn.ifjobs.service.CurriculoService;

@RestController
@RequestMapping("/curriculo")
public class CurriculoController {

    @Autowired
    private CurriculoService service;

    @PostMapping("/{link}")
    public ResponseEntity<Curriculo> uploadLink(@PathVariable(name = "link") String link) {
        Curriculo curriculo = service.uploadLink(link);
        return ResponseEntity.ok(curriculo);
    }

    @PatchMapping("/{id}/{link}")
    public ResponseEntity<Curriculo> atualizaLink(@PathVariable(name = "id") int id,
            @PathVariable(name = "link") String link) {
        Curriculo curriculo;

        try {
            curriculo = service.atualizaLink(id, link);
        } catch (CurriculoNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(curriculo);
    }

    @PostMapping(path = "/upload")
    public void upload(@RequestParam MultipartFile arquivo) {
        try {
            service.uploadArquivo(arquivo);
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível salvar o arquivo");
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadPorId(@PathVariable(name = "id") int id) {
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
