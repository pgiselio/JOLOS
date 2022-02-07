package br.edu.ifrn.ifjobs.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.dto.usuario.UsuarioInsertDTO;
import br.edu.ifrn.ifjobs.dto.usuario.UsuarioLoginEnvioDTO;
import br.edu.ifrn.ifjobs.dto.usuario.UsuarioLoginRetornoDTO;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.service.UsuarioService;

@RestController
@RequestMapping(path = "/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<Usuario> create(@RequestBody UsuarioInsertDTO dto) {
        Usuario usuario = dto.convertToEntity();
        Usuario usuarioSalvo;

        try {
            usuarioSalvo = usuarioService.create(usuario);
        } catch (UsuarioNaoCadastradoException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok().body(usuarioSalvo);
    }

    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<UsuarioLoginRetornoDTO> login(@RequestBody @Valid UsuarioLoginEnvioDTO dto) {
        Usuario usuario = dto.convertToEntity();
        Usuario usuarioLogin;

        try {
            usuarioLogin = usuarioService.login(usuario);
        } catch (UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        var conversor = new UsuarioLoginRetornoDTO();
        UsuarioLoginRetornoDTO convertToDto = conversor.convertToDto(usuarioLogin);

        return ResponseEntity.ok().body(convertToDto);
    }

}
