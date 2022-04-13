export interface IUser{
    email?: string;
    token?: string;
    type?: string;
}

export interface IContext extends IUser {
    signin: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loadingUserFromLocalStorage: boolean;
}

export interface IAuthProvider {
    children: JSX.Element
}