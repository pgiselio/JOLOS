export type User = {
  id?: 0;
  email?: string;
  senha?: string;
  status?: string;
  aluno?: {
    id: 0;
    dadosPessoa: {
      nome: string;
      dataNasc: Date;
      localizacao: string;
    };
    curso?: string;
    periodo?: 0;
    cpf: string;
    curriculo?: {
      id: 0;
      pdf: {
        nome: string;
        tipoArquivo: string;
        dados: [string];
      };
      dataImport: Date;
    };
  };
  empresa?: {
    id: 0;
    dadosPessoa: {
      nome: string;
      dataNasc: Date;
      localizacao: string;
    };
    cnpj: string;
    resumo?: string;
    telefone?: string;
  };
  authorities?: [
    {
      authority: string;
    }
  ];
};
