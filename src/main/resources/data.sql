
INSERT INTO role_tb (nome_role)
VALUES ('USUARIO');

INSERT INTO role_tb (nome_role)
VALUES ('ADMIN');

INSERT INTO aluno (nome, localizacao, curso, periodo, cpf)
VALUES ('Lucas Mateus', 'João Câmara', 'INFORMATICA', 1, '11111111111');

INSERT INTO empresa (id, nome, localizacao, cnpj, resumo, telefone)
VALUES (1,'Esig', 'João Câmara - RN', '22222222222', 'somos uma empresa massinha', '84999999999');

INSERT INTO usuario (email, senha, status, aluno_id, codigo_auth, CONTADOR_DE_NOTIFICACOES_DE_PENDENCIA)
VALUES ('jolos@jolos.com', '$2a$10$Cm9aPsc23ugEI7uqcGLPz.L89GVU2wlkKE1ddOJA6O76IxEGo9wHG','CONCLUIDO', 1, 213343, 0);

INSERT INTO usuario (email, senha, status, empresa_id, codigo_auth, CONTADOR_DE_NOTIFICACOES_DE_PENDENCIA)
VALUES ('java@jolos.com', '123jolos', 'CONCLUIDO', 1, 123123, 0);

INSERT INTO usuario (email, senha, status, codigo_auth, CONTADOR_DE_NOTIFICACOES_DE_PENDENCIA)
VALUES ('lucas.jdev1@gmail.com', '$2a$10$Cm9aPsc23ugEI7uqcGLPz.L89GVU2wlkKE1ddOJA6O76IxEGo9wHG', 'PENDENTE', 123456, 0);

INSERT INTO vaga (curso_alvo, titulo, descricao, localizacao, empresa_id)
VALUES ('Informática', 'Fullstack developer', 'você vai crescer assim como o software', 'João Câmara - RN', 1)