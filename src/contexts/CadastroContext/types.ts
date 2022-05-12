export interface CadastroContextType {
  step: number;
  setStep: (step: number) => void;
  verificationCode: string | undefined;
  setVerificationCode: (verificationCode: string | undefined) => void;
  email: string;
  setEmail: (email: string) => void;
  token: string;
  setToken: (token: string) => void;
};

export type userAlunoType = {
  dadosPessoa: {
    nome: string;
    dataNasc: Date;
    localizacao: string;
  };
  curso: string;
  periodo: 0;
  cpf: string;
};
