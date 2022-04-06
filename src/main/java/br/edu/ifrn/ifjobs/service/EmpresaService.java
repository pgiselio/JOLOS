package br.edu.ifrn.ifjobs.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import br.edu.ifrn.ifjobs.exception.EmpresaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.EmpresaNaoEncontradaException;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.repository.EmpresaRepository;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository repository;

    public Empresa createEmpresa(Empresa empresa) throws EmpresaNaoCadastradaException {
        Optional<Empresa> optional;
        optional = Optional.ofNullable(repository.save(empresa));

        Supplier<EmpresaNaoCadastradaException> excessao;
        excessao = () -> new EmpresaNaoCadastradaException("Erro ao efetuar cadastro!");

        return optional.orElseThrow(excessao);
    }

    public Empresa buscaPorId(int id) throws EmpresaNaoEncontradaException {
        Optional<Empresa> empresaFindById = repository.findById(id);

        Supplier<EmpresaNaoEncontradaException> excessao;
        excessao = () -> new EmpresaNaoEncontradaException("Empresa não encontrada!!");

        return empresaFindById.orElseThrow(excessao);
    }

    public List<Empresa> getAll() {
        return repository.findAll();
    }

    public Empresa buscaPorCnpj(String cnpj) {
        Optional<String> optional;
        optional = Optional.ofNullable(cnpj);

        Supplier<IllegalArgumentException> excessao;
        excessao = () -> new IllegalArgumentException("Cnpj inválido!");

        String cnpjNaoNulo = optional.orElseThrow(excessao);

        return repository.findByCnpj(cnpjNaoNulo);
    }

    public Empresa atualizaCampos(int id, Map<Object, Object> campos)
            throws EmpresaNaoEncontradaException, EmpresaNaoCadastradaException {
        Empresa buscadaPorId = buscaPorId(id);

        campos.forEach((chave, valor) -> {
            Field campo = ReflectionUtils.findField(Empresa.class, (String) chave);
            campo.setAccessible(true);
            ReflectionUtils.setField(campo, buscadaPorId, valor);
        });

        return createEmpresa(buscadaPorId);
    }

    public void delete(Empresa empresa) {
        repository.delete(empresa);
    }

}
