export type CadastroContextType = {
  step: number;
  setStep: (step: number) => void;
  verificationCode: string;
  setVerificationCode: (verificationCode: string) => void;
  email: string;
  setEmail: (email: string) => void;
};

export type userAlunoType = {
  dadosPessoa: {
    nome: string;
    dataNasc: Date;
    localizacao: string;
  };
  resumo: string;
  curso: string;
  periodo: 0;
  cpf: string;
};
