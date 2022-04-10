package br.edu.ifrn.ifjobs.dto.usuario;

import java.util.HashSet;
import java.util.Set;

import org.modelmapper.ModelMapper;

import br.edu.ifrn.ifjobs.dto.Dto;
import br.edu.ifrn.ifjobs.dto.aluno.AlunoGetDTO;
import br.edu.ifrn.ifjobs.dto.empresa.EmpresaGetDTO;
import br.edu.ifrn.ifjobs.model.Role;
import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;

public class UsuarioGetDTO implements Dto<Usuario, UsuarioGetDTO> {

    private int id;

    private String email;

    private StatusUsuario status;

    private Set<Role> roles = new HashSet<>();

    private AlunoGetDTO aluno;

    private EmpresaGetDTO empresa;

    private ModelMapper modelMapper;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public StatusUsuario getStatus() {
        return status;
    }

    public void setStatus(StatusUsuario status) {
        this.status = status;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public AlunoGetDTO getAluno() {
        return aluno;
    }

    public void setAluno(AlunoGetDTO aluno) {
        this.aluno = aluno;
    }

    public EmpresaGetDTO getEmpresa() {
        return empresa;
    }

    public void setEmpresa(EmpresaGetDTO empresa) {
        this.empresa = empresa;
    }

    @Override
    public Usuario convertDtoToEntity() {
        modelMapper = new ModelMapper();
        return modelMapper.map(this, Usuario.class);
    }

    @Override
    public UsuarioGetDTO convertEntityToDto(Usuario entity) {
        modelMapper = new ModelMapper();
        return modelMapper.map(entity, UsuarioGetDTO.class);
    }

}
