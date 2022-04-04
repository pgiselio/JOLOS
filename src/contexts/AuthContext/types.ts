export interface IUser{
    email?: string;
    token?: string;
    type?: string;
}

export interface userInfo {
    id: number;
    email: string;
    authorizition: [{authority: string}];
    empresa?: {
        id: number,
        dadosPessoa: {
          nome: string;
        },
        cnpj: string;
      }
    aluno?: {
        id: number;
        dadosPessoa: {
            nome: string;
        }
    }
}

export interface IContext extends IUser {
    signin: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loadingUserState: boolean;
}

export interface IAuthProvider {
    children: JSX.Element
}