package br.edu.ifrn.ifjobs.service;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.edu.ifrn.ifjobs.exception.AlunoNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.CurriculoNaoEncontradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Arquivo;
import br.edu.ifrn.ifjobs.model.Curriculo;
import br.edu.ifrn.ifjobs.model.Pessoa;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.repository.CurriculoRepository;

@Service
public class CurriculoService {

    @Autowired
    private CurriculoRepository curriculoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AlunoService alunoService;

    public void uploadArquivo(MultipartFile multipartFile, String email)
            throws IOException, UsuarioNaoEncontradoException {
        final Arquivo arquivo = construcaoArquivoBaseadoNoMultipartFile(multipartFile, email);

        construcaoCurriculoBaseadoNoArquivo(arquivo);

    }

    public Curriculo uploadLink(String link) {
        final Curriculo curriculo = construcaoCurriculoBaseadoNoLink(link);

        return curriculoRepository.save(curriculo);
    }

    public Curriculo atualizaLink(int id, final String link) throws CurriculoNaoEncontradoException {
        Optional<Curriculo> curriculoOptional = curriculoRepository.findById(id);

        curriculoOptional.ifPresent(curriculo -> {
            curriculo.setLinkVideo(link);
            curriculoRepository.save(curriculo);
        });

        Supplier<CurriculoNaoEncontradoException> excessao;
        excessao = () -> new CurriculoNaoEncontradoException("Curriculo não encontrado");

        return curriculoOptional.orElseThrow(excessao);
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

    public void atualizaArquivo(MultipartFile multipartFile, String email)
            throws IOException, UsuarioNaoEncontradoException {
        Usuario usuario = usuarioService.buscaPorEmail(email);
        Aluno aluno = usuario.getAluno();
        Curriculo curriculo = aluno.getCurriculo();
        Arquivo arquivo = curriculo.getPdf();

        arquivo.setDados(multipartFile.getBytes());
        curriculo.setPdf(arquivo);
        curriculo.setDataImport(Date.valueOf(LocalDate.now()));
        aluno.setCurriculo(curriculo);
        try {
            alunoService.salvaAluno(aluno);
        } catch (AlunoNaoCadastradoException e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    private Curriculo construcaoCurriculoBaseadoNoArquivo(final Arquivo arquivo) {
        final Curriculo curriculo = new Curriculo();
        curriculo.setPdf(arquivo);
        curriculo.setDataImport(Date.valueOf(LocalDate.now()));
        return curriculo;
    }

    private Curriculo construcaoCurriculoBaseadoNoLink(final String link) {
        final Curriculo curriculo = new Curriculo();
        curriculo.setLinkVideo(link);
        curriculo.setDataImport(Date.valueOf(LocalDate.now()));
        return curriculo;
    }

    private Arquivo construcaoArquivoBaseadoNoMultipartFile(MultipartFile multipartFile, String email)
            throws IOException, UsuarioNaoEncontradoException {
        Usuario usuario = usuarioService.buscaPorEmail(email);
        final Aluno aluno = usuario.getAluno();
        final Pessoa dadosPessoais = aluno.getDadosPessoa();

        String nome = dadosPessoais.getNome();
        String[] nomeDescomposto = nome.split(" ");
        String primeiroNome = nomeDescomposto[0];
        String ultimoNome = nomeDescomposto[nomeDescomposto.length - 1];

        String contentType = multipartFile.getOriginalFilename();
        var contentTypeOptional = Optional.ofNullable(contentType);
        String extensao = contentTypeOptional.stream()
                .reduce("", (content, contentTypeDecomposto) -> {
                    String[] nomeArquivo = contentTypeDecomposto.split("\\.");
                    return nomeArquivo[nomeArquivo.length - 1];
                });

        final Arquivo arquivo = new Arquivo();
        arquivo.setNome(primeiroNome + ultimoNome + aluno.getId());
        arquivo.setDados(multipartFile.getBytes());
        arquivo.setTipoArquivo(extensao);

        final Curriculo curriculo = new Curriculo();
        curriculo.setPdf(arquivo);
        curriculo.setDataImport(Date.valueOf(LocalDate.now()));

        aluno.setCurriculo(curriculo);
        try {
            alunoService.salvaAluno(aluno);
        } catch (AlunoNaoCadastradoException e) {
            throw new RuntimeException(e.getMessage());
        }

        return arquivo;
    }
}
