package br.edu.ifrn.ifjobs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.ifjobs.model.Usuario;
import br.edu.ifrn.ifjobs.model.enums.StatusUsuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

        @Query(value = """
                        SELECT *
                        FROM usuario u
                        WHERE u.email like ?1 AND u.senha like ?2
                        """, nativeQuery = true)
        public Optional<Usuario> findByEmailAndPassword(String email, String senha);

        @Query("SELECT u FROM Usuario u WHERE u.email = ?1")
        public Usuario findUsuarioByEmail(String email);

        @Query(value = """
                        SELECT *
                        FROM usuario u
                        WHERE u.empresa_id = ?1
                        """, nativeQuery = true)
        public Optional<Usuario> findUsuarioByEmpresaId(int id);

        @Query(value = """
                        SELECT *
                        FROM usuario u
                        WHERE u.aluno_id = ?1
                        """, nativeQuery = true)
        public Optional<Usuario> findUsuarioByAlunoId(int id);

        @Query(value = """
                        SELECT u
                        FROM Usuario u
                        WHERE u.status = ?1
                        """)
        List<Usuario> findAllByStatus(StatusUsuario status);
}
