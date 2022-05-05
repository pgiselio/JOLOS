import { User } from "../../types/user";

export interface IUser{
    email?: string;
    token?: string;
}

export interface IContext extends IUser {
    signin: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loadingUserFromLocalStorage: boolean;
    userInfo?: User;
    authorities?: string[];
}

export interface IAuthProvider {
    children: JSX.Element
}