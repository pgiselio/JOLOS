import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);


export function AuthProvider ({children}: IAuthProvider){
    const [user, setUser] = useState<IUser | null>();
    const [loadingUserState, setLoadingUserState] = useState(true);
    useEffect(() =>{
        const user = getUserLocalStorage();
        if(user){
            setUser(user);
        }
        setLoadingUserState(false);
    }, []);

    async function authenticate(email: string, password: string) {
        const response = await LoginRequest(email, password);

        const payload = { token: response.token, email };
        
        setUser(payload);
        setUserLocalStorage(payload);
    }
    function logout(){
        setUser(null);
        setUserLocalStorage(null);
    }
    return(
        <AuthContext.Provider value={{...user, authenticate, logout, loadingUserState}}>
            {children}
        </AuthContext.Provider>
    );
}

