package br.edu.ifrn.ifjobs.controller;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.dto.empresa.EmpresaInsertDTO;
import br.edu.ifrn.ifjobs.exception.EmpresaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.EmpresaNaoEncontradaException;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.service.EmpresaService;

@RestController
@RequestMapping(path = "/empresa")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping("/create")
    @ResponseBody
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
    @ResponseBody
    public ResponseEntity<Empresa> buscaPorId(@PathVariable(name = "id") int id) {
        Empresa empresa;

        try {
            empresa = empresaService.getById(id);
        } catch (EmpresaNaoEncontradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(empresa);
    }

    @GetMapping("/cnpj")
    @ResponseBody
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
    @ResponseBody
    public ResponseEntity<List<Empresa>> buscaTodos() {
        List<Empresa> empresas;
        empresas = empresaService.getAll();
        return ResponseEntity.ok(empresas);
    }

    @PatchMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Empresa> atualizaCampo(@PathVariable(name = "id") int id,
            Map<Object, Object> campos) {
        Empresa buscadaPorId;

        try {
            buscadaPorId = empresaService.getById(id);
        } catch (EmpresaNaoEncontradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        campos.forEach((chave, valor) -> {
            Field campo = ReflectionUtils.findField(Empresa.class, (String) chave);
            campo.setAccessible(true);
            ReflectionUtils.setField(campo, buscadaPorId, valor);
        });

        Empresa empresaAtualizada;

        try {
            empresaAtualizada = empresaService.createEmpresa(buscadaPorId);
        } catch (EmpresaNaoCadastradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(empresaAtualizada);
    }

    @PutMapping("/{id}")
    @ResponseBody
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
    @ResponseBody
    public ResponseEntity<Empresa> deletaEmpresa(@PathVariable(name = "id") int id) {
        Empresa empresa;

        try {
            empresa = empresaService.getById(id);
        } catch (EmpresaNaoEncontradaException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        empresaService.delete(empresa);

        return ResponseEntity.ok(empresa);
    }
}
