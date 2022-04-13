import { createContext } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { User } from "../../types/user";
import { getUserLocalStorage } from "../AuthContext/util";
import { IUserContext } from "./types";

export const UserContext = createContext({} as IUserContext);

export function UserProvider({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const { data, isLoading} = useQuery<User>(
    ["meUser"],
    async () => {
      let user = getUserLocalStorage();
      if(!user.email){
        window.location.href = "/logout";
      }
      const response = await api
        .get(`/usuario/email/${user.email}`)
        .catch((error) =>
          error.response.status === 401 || error.response.status === 403 || error.response.status === 500
            ? (
              auth.logout(),
              window.location.href = "/entrar?error=invalidCredentials"
              )
            : error
        );
      return response?.data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60, // 1 minute
      refetchInterval: 1000 * 60 * 5, // 5 minutes to refetch automatically
    }
  );
  return (
    <UserContext.Provider value={{ ...data, loadingData: isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
