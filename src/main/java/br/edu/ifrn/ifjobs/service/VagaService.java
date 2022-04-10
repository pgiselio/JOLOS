package br.edu.ifrn.ifjobs.service;

import java.lang.reflect.Field;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import br.edu.ifrn.ifjobs.dto.vaga.VagaGetAllDTO;
import br.edu.ifrn.ifjobs.dto.vaga.VagaGetDTO;
import br.edu.ifrn.ifjobs.dto.vaga.VagaInsertDto;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.exception.VagaNaoCadastradaException;
import br.edu.ifrn.ifjobs.exception.VagaNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Aluno;
import br.edu.ifrn.ifjobs.model.Empresa;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.Vaga;
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

    public List<VagaGetAllDTO> buscaTodasVagas() {
        List<Vaga> vagas = vagaRepository.findAll();

        return vagas.stream().map(vaga -> {
            Empresa empresa = vaga.getEmpresa();
            System.out.println(empresa);
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
     * @param id     é a identificação da vaga
     * @param campos os campos que irão ser modificados, exceto o campo ALUNOS, pois
     *               ainda não está pronto para modificações
     * @return vaga atualizada
     * @throws VagaNaoEncontradoException
     * @throws VagaNaoCadastradaException
     */
    public Vaga atualizaCampos(int id, Map<Object, Object> campos)
            throws VagaNaoEncontradoException, VagaNaoCadastradaException {
        Vaga vagaBuscadaPorId = buscarPorId(id);

        campos.forEach((chave, valor) -> {
            Field campo = ReflectionUtils.findField(Vaga.class, (String) chave);
            campo.setAccessible(true);
            ReflectionUtils.setField(campo, vagaBuscadaPorId, valor);
        });

        return salvarVaga(vagaBuscadaPorId);
    }

    public VagaGetDTO addAlunoParaVaga(int vagaId, int alunoId)
            throws VagaNaoEncontradoException, UsuarioNaoEncontradoException {
        final Vaga vaga = buscarPorId(vagaId);
        final Usuario usuario = usuarioService.buscaPorAlunoId(alunoId);
        vaga.addAluno(usuario.getAluno());
        VagaGetDTO dto = new VagaGetDTO();
        VagaGetDTO convertedToDto = dto.convertEntityToDto(vaga);
        try {
            salvarVaga(vaga);
        } catch (VagaNaoCadastradaException e) {
            throw new RuntimeException(e.getMessage());
        }
        return convertedToDto;
    }
}
