import { User } from "../../types/user";

export interface IUserContext extends User {
    loadingData: boolean;
}