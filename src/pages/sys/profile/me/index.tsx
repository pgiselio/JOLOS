import { useAuth } from "../../../../hooks/useAuth";
import Error404 from "../../../404";
import AlunoProfilePage from "../a/[id]";
import EmpresaProfilePage from "../e/[id]";

export function MeProfilePage() {
  const auth = useAuth();
  if(auth.type === "ALUNO"){
    return <AlunoProfilePage email={auth.email}/>
  }else if (auth.type === "EMPRESA"){
    return <EmpresaProfilePage email={auth.email}/>
  }else{
    return <Error404/>
  }
}
