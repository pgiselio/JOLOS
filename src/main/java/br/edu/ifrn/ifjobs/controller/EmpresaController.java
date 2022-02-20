package br.edu.ifrn.ifjobs.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.service.EmpresaService;

@RestController
@RequestMapping(path = "/empresa")
public class EmpresaController {

    private EmpresaService empresaService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Empresa>> buscaTodos() {
        List<Empresa> empresas;
        empresas = empresaService.getAll();
        return ResponseEntity.ok(empresas);
    }

}
