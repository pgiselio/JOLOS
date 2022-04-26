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
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
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

    @PostMapping(path = "/upload/{email}")
    public ResponseEntity<String> upload(@RequestParam(name = "arquivo") MultipartFile arquivo,
            @PathVariable(name = "email") String email) {
        try {
            service.uploadArquivo(arquivo, email);
        } catch (IOException | UsuarioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.ok("Arquivo salvo com sucesso");
    }

    @PatchMapping(path = "/atualizaArquivo/{email}")
    public ResponseEntity<String> atualizaArquivo(@RequestParam(name = "arquivo") MultipartFile arquivo,
            @PathVariable(name = "email") String email) {
        try {
            service.atualizaArquivo(arquivo, email);
        } catch (IOException | UsuarioNaoEncontradoException e) {
            throw new RuntimeException("Não foi possível salvar o arquivo");
        }

        return ResponseEntity.ok("Arquivo salvo com sucesso");
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource> downloadPorId(@PathVariable(name = "id") int id) {
        Curriculo curriculo;

        try {
            curriculo = service.buscaPorId(id);
        } catch (CurriculoNaoEncontradoException e) {
            throw new RuntimeException(e.getMessage());
        }

        Arquivo arquivo = curriculo.getPdf();
        String texto = "inline; filename=\\" + arquivo.getNome() + "." + arquivo.getTipoArquivo() + "\\";

        String tipoArquivo = arquivo.getTipoArquivo();
        String headerArquivo = tipoArquivo(tipoArquivo);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(headerArquivo))
                .header(HttpHeaders.CONTENT_DISPOSITION, texto)
                .body(new ByteArrayResource(arquivo.getDados()));
    }

    private String tipoArquivo(String tipoArquivo) {
        return switch (tipoArquivo) {
            case "pdf" -> "application/pdf";
            default -> "application/octet-stream";
        };
    }
}
