import { createContext, useEffect, useState } from "react";
import { queryClient } from "../../services/queryClient";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>();
  const [loadingUserState, setLoadingUserState] = useState(true);
  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
    setLoadingUserState(false);
  }, []);

  async function signin(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const payload = {
      token: response.Authorization.replace("Bearer ", ""),
      email,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  }
  function logout() {
    setUser(null);
    setUserLocalStorage(null);
    queryClient.invalidateQueries(["meUser"]);
  }
  return (
    <AuthContext.Provider value={{ ...user, signin, logout, loadingUserState }}>
      {children}
    </AuthContext.Provider>
  );
}
