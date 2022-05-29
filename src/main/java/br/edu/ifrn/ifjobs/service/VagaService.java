package br.edu.ifrn.ifjobs.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.ifjobs.dto.empresa.EmpresaGetDTO;
import br.edu.ifrn.ifjobs.dto.vaga.VagaGetAllDTO;
import br.edu.ifrn.ifjobs.dto.vaga.VagaGetDTO;
import br.edu.ifrn.ifjobs.dto.vaga.VagaInsertDto;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.exception.VagaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.VagaNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.model.Notificacao;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.Vaga;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.model.enums.StatusVaga;
import br.edu.ifrn.ifjobs.repository.VagaRepository;

@Service
public class VagaService {

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private NotificacaoService notificacaoService;

    public Vaga salvarVaga(Vaga vaga) throws VagaNaoCadastradaException {
        Optional<Vaga> vagaOptional;
        vagaOptional = Optional.ofNullable(vaga);

        Supplier<VagaNaoCadastradaException> excessao;
        excessao = () -> new VagaNaoCadastradaException("Dados inválidos!!");

        vagaOptional.ifPresent(vaguinha -> {
            vaguinha.setStatus(StatusVaga.ATIVO);
            vaguinha.setDataCriacao(Date.valueOf(LocalDate.now()));
            vagaRepository.save(vaguinha);
        });

        return vagaOptional.orElseThrow(excessao);
    }

    public Vaga atualizarVaga(Vaga vaga) throws VagaNaoCadastradaException {
        Optional<Vaga> vagaOptional;
        vagaOptional = Optional.ofNullable(vaga);

        Supplier<VagaNaoCadastradaException> excessao;
        excessao = () -> new VagaNaoCadastradaException("Dados inválidos!!");

        vagaOptional.ifPresent(vagaRepository::save);

        return vagaOptional.orElseThrow(excessao);
    }

    public Vaga salvarVaga(VagaInsertDto dto) throws VagaNaoCadastradaException {
        Optional<VagaInsertDto> dtoOptional;
        dtoOptional = Optional.ofNullable(dto);

        Optional<Vaga> vagaOptional = dtoOptional.map(vagaDto -> {
            final Empresa empresa = empresaService.buscaPorCnpj(vagaDto.getCnpj());
            final Vaga vaga = vagaDto.convertDtoToEntity();
            vaga.setEmpresa(empresa);
            return vaga;
        });

        vagaOptional.ifPresent(vaga -> {
            vaga.setStatus(StatusVaga.ATIVO);
            vaga.setDataCriacao(Date.valueOf(LocalDate.now()));
            vagaRepository.save(vaga);

            usuarioService.buscaTodosPorStatus(StatusUsuario.CONCLUIDO)
                    .stream()
                    .filter(usuario -> usuario.getAluno() != null &&
                            usuario.getAluno().getCurso().equalsIgnoreCase(vaga.getCursoAlvo()))
                    .forEach(aluno -> {
                        Notificacao notificacao = new Notificacao();
                        notificacao.setTitulo("Nova vaga disponível");
                        notificacao.setDescricao("Você pode se candidatar a vaga " + vaga.getTitulo());
                        notificacao.setData(LocalDateTime.now());
                        notificacao.setUsuario(aluno);
                        notificacaoService.salva(notificacao);
                    });
        });

        return vagaOptional.orElseThrow(() -> new VagaNaoCadastradaException("Dados inválidos!!"));
    }

    public Vaga buscarPorId(int id) throws VagaNaoEncontradoException {
        Optional<Vaga> vagaBuscadaPorId;
        vagaBuscadaPorId = vagaRepository.findById(id);

        Supplier<VagaNaoEncontradoException> excessao;
        excessao = () -> new VagaNaoEncontradoException("Vaga não encontrada!!");

        return vagaBuscadaPorId.orElseThrow(excessao);
    }

    public VagaGetDTO buscaPorId(int id) throws VagaNaoEncontradoException, UsuarioNaoEncontradoException {
        Vaga vagaBuscadaPorId = buscarPorId(id);

        Set<Aluno> alunos = vagaBuscadaPorId.getAlunos();
        Set<Usuario> usuarios = alunos.stream().map(aluno -> {
            try {
                return usuarioService.buscaPorAlunoId(aluno.getId());
            } catch (UsuarioNaoEncontradoException e) {
                throw new RuntimeException(e.getMessage());
            }
        }).collect(Collectors.toSet());

        Empresa empresa = vagaBuscadaPorId.getEmpresa();
        Usuario usuarioEmpresa = usuarioService.buscaPorEmpresaId(empresa.getId());

        var vagaGetDTO = new VagaGetDTO();
        VagaGetDTO convertEntityToDto = vagaGetDTO.convertEntityToDto(vagaBuscadaPorId);

        convertEntityToDto.setAlunos(usuarios);

        EmpresaGetDTO empresaGetDto = convertEntityToDto.getEmpresa();
        empresaGetDto.setId(usuarioEmpresa.getId());
        convertEntityToDto.setEmpresa(empresaGetDto);

        return convertEntityToDto;
    }

    public List<VagaGetAllDTO> buscaTodasVagas() {
        List<Vaga> vagas = vagaRepository.findAll();

        return vagas.stream().map(vaga -> {
            Empresa empresa = vaga.getEmpresa();
            Usuario usuario = usuarioBuscadoPorEmpresaId(empresa.getId());

            VagaGetAllDTO dto = new VagaGetAllDTO();
            VagaGetAllDTO convertEntityToDto = dto.convertEntityToDto(vaga);
            convertEntityToDto.setEmpresaID(usuario.getId());

            Set<Aluno> alunos = vaga.getAlunos();

            Set<Usuario> listAlunos;
            listAlunos = alunos.stream()
                    .map(aluno -> {
                        try {
                            return usuarioService.buscaPorAlunoId(aluno.getId());
                        } catch (UsuarioNaoEncontradoException e) {
                            throw new RuntimeException(e.getMessage());
                        }
                    })
                    .collect(Collectors.toSet());

            convertEntityToDto.setAlunos(listAlunos);
            return convertEntityToDto;
        }).toList();
    }

    private Usuario usuarioBuscadoPorEmpresaId(int id) {
        Usuario usuario;
        try {
            usuario = usuarioService.buscaPorEmpresaId(id);
        } catch (UsuarioNaoEncontradoException e) {
            throw new RuntimeException(e.getMessage());
        }
        return usuario;
    }

    public void delete(int id) throws VagaNaoEncontradoException {
        Vaga vaga = buscarPorId(id);
        vagaRepository.delete(vaga);
    }

    /**
     * 
     * @param id    é a identificação da vaga
     * @param patch os campos que irão ser modificados
     * @return vaga atualizada
     * @throws VagaNaoEncontradoException
     * @throws VagaNaoCadastradaException
     * @throws JsonPatchException
     * @throws IllegalArgumentException
     * @throws JsonProcessingException
     */
    public Vaga atualizaCampos(int id, JsonPatch patch)
            throws VagaNaoEncontradoException, VagaNaoCadastradaException, JsonPatchException, JsonProcessingException,
            IllegalArgumentException {
        ObjectMapper mapper = new ObjectMapper();

        Vaga vaga = buscarPorId(id);

        JsonNode convertValue;
        convertValue = mapper.convertValue(vaga, JsonNode.class);

        JsonNode patched = patch.apply(convertValue);

        Vaga vagaConvertida = mapper.treeToValue(patched, Vaga.class);

        return atualizarVaga(vagaConvertida);

    }

    public Vaga addAlunoParaVaga(int vagaId, int alunoId)
            throws VagaNaoEncontradoException, UsuarioNaoEncontradoException {
        final Vaga vaga = buscarPorId(vagaId);

        if (vaga.getStatus() == StatusVaga.INATIVO) {
            throw new RuntimeException("vaga inativa, não é possível adicionar aluno");
        }

        final Usuario usuario = usuarioService.buscaPorAlunoId(alunoId);
        final Aluno aluno = usuario.getAluno();

        if (!aluno.getCurso().equalsIgnoreCase(vaga.getCursoAlvo())) {
            throw new RuntimeException("Curso diferente do que está vaga");
        }

        vaga.addAluno(aluno);

        Vaga vagaAtualizada;
        try {
            vagaAtualizada = atualizarVaga(vaga);
        } catch (VagaNaoCadastradaException e) {
            throw new RuntimeException(e.getMessage());
        }

        Notificacao notificacao = new Notificacao();
        notificacao.setTitulo("Um novo candidato para a vaga " + vaga.getTitulo());
        notificacao.setData(LocalDateTime.now());

        Empresa empresa = vaga.getEmpresa();
        Usuario usuarioEmpresa = usuarioService.buscaPorEmpresaId(empresa.getId());
        notificacao.setUsuario(usuarioEmpresa);
        notificacaoService.salva(notificacao);

        return vagaAtualizada;
    }

    public void desinscreverAlunoDaVaga(int vagaId, int alunoId)
            throws VagaNaoEncontradoException, UsuarioNaoEncontradoException {
        final Vaga vaga = buscarPorId(vagaId);
        final Usuario usuario = usuarioService.buscaPorAlunoId(alunoId);
        vaga.removeAluno(usuario.getAluno());
        try {
            atualizarVaga(vaga);
        } catch (VagaNaoCadastradaException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
