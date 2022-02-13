package br.edu.ifrn.ifjobs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.exception.EmpresaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.EmpresaNaoEncontradaException;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.repository.EmpresaRepository;

@Service
public class EmpresaService {

    private EmpresaRepository repository;

    public Empresa createEmpresa(Empresa empresa) throws EmpresaNaoCadastradaException {
        Optional<Empresa> optional;
        optional = Optional.ofNullable(repository.save(empresa));
        return optional.orElseThrow(() -> new EmpresaNaoCadastradaException("Erro ao efetuar cadastro!"));
    }

    public Empresa getById(int id) throws EmpresaNaoEncontradaException {
        Optional<Empresa> empresaFindById = repository.findById(id);
        return empresaFindById.orElseThrow(() -> new EmpresaNaoEncontradaException("Empresa não encontrada!!"));
    }

    public List<Empresa> getAll() {
        return repository.findAll();
    }

}
