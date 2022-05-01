export type vaga = {
  id: number;
  titulo: string;
  status: "ATIVO" | "INATIVO" | null;
  descricao: string;
  localizacao: string;
  dataCriacao: string;
  cursoAlvo: string;
  empresa: {
    id: number;
    dadosPessoa: {
      nome: string;
    };
  }
  alunos: number[];
};

