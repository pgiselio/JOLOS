package br.edu.ifrn.ifjobs.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.dto.usuario.UsuarioInsertDTO;
import br.edu.ifrn.ifjobs.dto.usuario.UsuarioLoginGetDTO;
import br.edu.ifrn.ifjobs.dto.usuario.UsuarioLoginPostDTO;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.service.UsuarioService;

@RestController
@RequestMapping(path = "/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/createAluno")
    @ResponseBody
    public ResponseEntity<Usuario> createAluno(@RequestBody @Valid UsuarioInsertDTO dto) {
        Usuario usuario = dto.convertDtoToEntity();
        usuario.setStatus(StatusUsuario.PENDENTE);
        BCryptPasswordEncoder ciptografo = new BCryptPasswordEncoder();
        usuario.setSenha(ciptografo.encode(usuario.getSenha()));

        Usuario usuarioSalvo;

        try {
            usuarioSalvo = usuarioService.create(usuario);
        } catch (UsuarioNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return new ResponseEntity<>(usuarioSalvo, HttpStatus.CREATED);
    }

    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<UsuarioLoginGetDTO> login(@RequestBody @Valid UsuarioLoginPostDTO dto) {
        Usuario usuario = dto.convertDtoToEntity();
        Usuario usuarioLogin;

        try {
            usuarioLogin = usuarioService.login(usuario);
        } catch (UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        var conversor = new UsuarioLoginGetDTO();
        UsuarioLoginGetDTO convertToDto;
        convertToDto = conversor.convertEntityToDto(usuarioLogin);

        return ResponseEntity.ok().body(convertToDto);
    }

}
