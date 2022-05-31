export type User = {
  id?: number;
  email?: string;
  status?: "PENDENTE" | "CONCLUIDO" | "DESATIVADO";
  roles?: [
    {
      id: number;
      nomeRole: string;
      authority: string;
    }
  ];
  aluno?: {
    id: number;
    dadosPessoa: {
      nome: string;
      dataNasc: Date;
      localizacao: string;
    };
    resumo?: string;
    curso: string;
    periodo?: number;
    cpf?: string;
    curriculo?: number | {
      id: number;
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
    linkSite?: string;
    redesSociais?: {
      linkedin?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
    }
  };
  
};
