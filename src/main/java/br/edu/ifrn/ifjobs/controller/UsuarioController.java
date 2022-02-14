package br.edu.ifrn.ifjobs.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.edu.ifrn.ifjobs.dto.usuario.UsuarioInsertDTO;
import br.edu.ifrn.ifjobs.dto.usuario.UsuarioLoginGetDTO;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoCadastradoException;
import br.edu.ifrn.ifjobs.exception.UsuarioNaoEncontradoException;
import br.edu.ifrn.ifjobs.model.Email;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;
import br.edu.ifrn.ifjobs.service.EmailService;
import br.edu.ifrn.ifjobs.service.UsuarioService;

@RestController
@RequestMapping(path = "/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<Usuario> createAluno(@RequestBody @Valid UsuarioInsertDTO dto) {
        Usuario usuario = dto.convertDtoToEntity();

        BCryptPasswordEncoder ciptografo = new BCryptPasswordEncoder();
        usuario.setSenha(ciptografo.encode(usuario.getSenha()));
        usuario.setStatus(StatusUsuario.PENDENTE);

        Usuario usuarioSalvo;

        try {
            usuarioSalvo = usuarioService.create(usuario);
        } catch (UsuarioNaoCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        try {
            enviaEmailParaUsuarioSalvo(usuarioSalvo);
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(usuarioSalvo, HttpStatus.CREATED);
    }

    private void enviaEmailParaUsuarioSalvo(Usuario usuarioSalvo)
            throws MessagingException, UnsupportedEncodingException {
        Email email = new Email();
        email.setDestinatario(usuarioSalvo.getEmail());
        email.setMensagem("""
                <h1>Cadastro pendente!</h1>
                <p>Seu cadastro ainda não foi finalizado!</p>
                    """);
        email.setRemetente("lucas.jdev1@gmail.com");
        email.setAssunto("Cadastro IFJobs!!!");
        email.setHtml(true);

        emailService.enviaEmail(email);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<UsuarioLoginGetDTO> buscarPorId(@PathVariable(name = "id") int id) {
        Usuario usuario;

        try {
            usuario = usuarioService.getById(id);
        } catch (UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        UsuarioLoginGetDTO usuarioLoginGetDTO = new UsuarioLoginGetDTO();
        usuarioLoginGetDTO = usuarioLoginGetDTO.convertEntityToDto(usuario);

        return ResponseEntity.ok().body(usuarioLoginGetDTO);
    }

    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<List<UsuarioLoginGetDTO>> buscaUsuarios() {
        List<Usuario> usuarios = usuarioService.getAll();

        List<UsuarioLoginGetDTO> list = usuarios.stream().map(usuario -> {
            UsuarioLoginGetDTO u = new UsuarioLoginGetDTO();
            return u.convertEntityToDto(usuario);
        }).toList();

        return ResponseEntity.ok().body(list);
    }
}
