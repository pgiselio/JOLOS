package br.edu.ifrn.ifjobs.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.dto.usuario.UsuarioInsertDTO;
import br.edu.ifrn.ifjobs.dto.usuario.UsuarioLoginGetDTO;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.service.UsuarioService;

@RestController
@RequestMapping(path = "/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @CrossOrigin("*")
    @PostMapping("/create")
    public ResponseEntity<Usuario> createAluno(@RequestBody @Valid UsuarioInsertDTO dto) {
        Usuario usuarioSalvo;

        try {
            usuarioSalvo = usuarioService.create(dto);
        } catch (UsuarioNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(usuarioSalvo, HttpStatus.CREATED);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> buscaPorEmail(@PathVariable(name = "email") String email) {
        Usuario usuario;

        try {
            usuario = usuarioService.buscaPorEmail(email);
        } catch (UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable(name = "id") int id) {
        Usuario usuario;

        try {
            usuario = usuarioService.buscaPorId(id);
        } catch (UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok().body(usuario);
    }

    @GetMapping("/empresa/{id}")
    public ResponseEntity<Usuario> buscarPorEmpresaId(@PathVariable(name = "id") int id) {
        Usuario usuario;

        try {
            usuario = usuarioService.buscaPorEmpresaId(id);
        } catch (UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok().body(usuario);
    }

    @GetMapping("/")
    public ResponseEntity<List<UsuarioLoginGetDTO>> buscaUsuarios() {
        List<Usuario> usuarios = usuarioService.getAll();

        List<UsuarioLoginGetDTO> list = usuarios.stream().map(usuario -> {
            UsuarioLoginGetDTO u = new UsuarioLoginGetDTO();
            return u.convertEntityToDto(usuario);
        }).toList();

        return ResponseEntity.ok().body(list);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Usuario> atualizaCampo(@PathVariable(name = "id") int id,
            @RequestBody Map<Object, Object> campos) {
        Usuario usuarioAtualizado;

        try {
            usuarioAtualizado = usuarioService.atualizaCampos(id, campos);
        } catch (UsuarioNaoEncontradoException | UsuarioNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Usuario> deletaUsuario(UsuarioInsertDTO dto) {
        Usuario usuario = dto.convertDtoToEntity();
        Usuario usuarioDeletado;
        try {
            usuarioDeletado = usuarioService.delete(usuario);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return ResponseEntity.ok().body(usuarioDeletado);
    }
}
