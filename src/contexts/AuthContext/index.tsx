import { createContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { User } from "../../types/user";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>();
  const [loadingUserFromLocalStorage, setLoadingUserFromLocalStorage] =
    useState(true);
  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
    setLoadingUserFromLocalStorage(false);
  }, []);

  const { data: userInfo } = useQuery<User>(
    ["meUser"],
    async () => {
      let user = getUserLocalStorage();
      if (!user?.email) {
        window.location.href = "/logout";
      }
      const response = await api
        .get(`/usuario/email/${user.email}`)
        .catch((error) =>
          error.response.status === 401 ||
          error.response.status === 403 ||
          error.response.status === 500
            ? (logout(),
              (window.location.href = "/entrar?error=invalidCredentials"))
            : error
        );
      return response?.data;
    },
    {
      enabled: !!user?.token,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 1, // 1 minute
      refetchInterval: 1000 * 60 * 5, // 5 minutes to refetch automatically
    }
  );
  
  let authorities = useRef<string[]>([]);
  useEffect(() => {
    let authoritiesAux: string[] = [];
    userInfo?.roles?.forEach((role: any) => {
      authoritiesAux.push(role.nomeRole);
    });
    authorities.current = authoritiesAux;
  }, [userInfo?.roles]);

  async function signin(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const payload = {
      token: response.Authorization.replace("Bearer ", ""),
      email,
      type: response.usertype,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  }
  function logout() {
    setUser(null);
    setUserLocalStorage(null);
    queryClient.setQueryData("meUser", undefined);
    queryClient.invalidateQueries("meUser");
    queryClient.removeQueries("meUser");
  }
  return (
    <AuthContext.Provider
      value={{
        ...user,
        signin,
        logout,
        loadingUserFromLocalStorage,
        userInfo,
        authorities: authorities.current,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
