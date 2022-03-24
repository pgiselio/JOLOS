package br.edu.ifrn.ifjobs.service;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.edu.ifrn.ifjobs.exception.CurriculoNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Arquivo;
import br.edu.ifrn.ifjobs.model.Curriculo;
import br.edu.ifrn.ifjobs.repository.CurriculoRepository;

@Service
public class CurriculoService {

    @Autowired
    private CurriculoRepository curriculoRepository;

    public void uploadArquivo(MultipartFile multipartFile) throws IOException {
        final Arquivo arquivo = construcaoArquivoBaseadoNoMultipartFile(multipartFile);

        final Curriculo curriculo = construcaoCurriculoBaseadoNoArquivo(arquivo);

        curriculoRepository.save(curriculo);
    }

    public void removeArquivo(int id) throws CurriculoNaoEncontradoException {
        Curriculo curriculo = buscaPorId(id);
        curriculoRepository.delete(curriculo);
    }

    public Curriculo buscaPorId(int id) throws CurriculoNaoEncontradoException {
        Optional<Curriculo> curriculoBuscadoPorId;
        curriculoBuscadoPorId = curriculoRepository.findById(id);

        return curriculoBuscadoPorId.orElseThrow(
                () -> new CurriculoNaoEncontradoException("Currículo não encontrado!!"));
    }

    private Curriculo construcaoCurriculoBaseadoNoArquivo(final Arquivo arquivo) {
        final Curriculo curriculo = new Curriculo();
        curriculo.setPdf(arquivo);
        curriculo.setDataImport(Date.valueOf(LocalDate.now()));
        return curriculo;
    }

    private Arquivo construcaoArquivoBaseadoNoMultipartFile(MultipartFile multipartFile) throws IOException {
        final Arquivo arquivo = new Arquivo();
        arquivo.setNome(multipartFile.getName());
        arquivo.setDados(multipartFile.getBytes());
        arquivo.setTipoArquivo(multipartFile.getContentType());
        return arquivo;
    }
}
