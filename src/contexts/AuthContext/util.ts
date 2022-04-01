import { api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("user");
  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const request = await api.post("/entrar", { email, senha: password });
    const getUser = await api.get(`/usuario/email/${email}`, {
      headers: {
        Authorization: request.data.Authorization.replace("Bearer ", ""),
      },
    });
    console.log(getUser.data);
    
    let usertype;
    if (getUser.data?.aluno) {
      usertype = "ALUNO";
    } else if (getUser.data?.empresa) {
      usertype = "EMPRESA";
    } else {
      usertype = "ADMIN";
    }

    return {...request.data, usertype};
  } catch (error) {
    console.error(error);
    return null;
  }
}
