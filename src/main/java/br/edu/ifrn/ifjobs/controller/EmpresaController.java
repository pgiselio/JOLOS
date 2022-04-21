package br.edu.ifrn.ifjobs.controller;

import java.util.List;
import javax.validation.Valid;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.dto.empresa.EmpresaInsertDTO;
import br.edu.ifrn.ifjobs.exception.EmpresaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.EmpresaNaoEncontradaException;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.service.EmpresaService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping(path = "/empresa")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping("/create")
    public ResponseEntity<Empresa> salvaEmpresa(@RequestBody @Valid EmpresaInsertDTO dto) {
        Empresa empresa = dto.convertDtoToEntity();
        Empresa empresaSalva;

        try {
            empresaSalva = empresaService.createEmpresa(empresa);
        } catch (EmpresaNaoCadastradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(empresaSalva, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> buscaPorId(@PathVariable(name = "id") int id) {
        Empresa empresa;

        try {
            empresa = empresaService.buscaPorId(id);
        } catch (EmpresaNaoEncontradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(empresa);
    }

    @GetMapping("/cnpj")
    @ApiResponse(responseCode = "200", description = "Retorna uma empresa baseada no cnpj")
    public ResponseEntity<Empresa> buscaPorCnpj(@RequestParam String cnpj) {
        Empresa empresa;

        try {
            empresa = empresaService.buscaPorCnpj(cnpj);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(empresa);
    }

    @GetMapping
    public ResponseEntity<List<Empresa>> buscaTodos() {
        List<Empresa> empresas;
        empresas = empresaService.getAll();
        return ResponseEntity.ok(empresas);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Empresa> atualizaCampo(@PathVariable(name = "id") int id,
            @RequestBody JsonPatch jsonPatch) {
        Empresa empresaAtualizada;

        try {
            empresaAtualizada = empresaService.atualizaCampos(id, jsonPatch);
        } catch (EmpresaNaoEncontradaException | EmpresaNaoCadastradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (JsonProcessingException | JsonPatchException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "JsonPatch inválido");
        }

        return ResponseEntity.ok(empresaAtualizada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> atualizaEmpresa(@PathVariable(name = "id") int id,
            EmpresaInsertDTO dto) {
        Empresa empresa = dto.convertDtoToEntity();
        Empresa empresaSalva;

        try {
            empresaSalva = empresaService.createEmpresa(empresa);
        } catch (EmpresaNaoCadastradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(empresaSalva);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Empresa> deletaEmpresa(@PathVariable(name = "id") int id) {
        Empresa empresa;

        try {
            empresa = empresaService.buscaPorId(id);
        } catch (EmpresaNaoEncontradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        empresaService.delete(empresa);

        return ResponseEntity.ok(empresa);
    }
}
