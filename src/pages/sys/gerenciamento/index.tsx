import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import CircularProgressFluent from "../../../components/circular-progress-fluent";
import { api } from "../../../services/api";

export default function GerenciamentoPage() {
  const { data } = useQuery(
    "GerenciamentoUsuariosList",
    async () => {
      const response = await api.get("/usuario/");
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
    }
  );
  return (
    <div className="content">
      <ul>
        {data ? (
          data?.map((usuario: any) => (
            <li key={usuario.id}>
              {usuario.email + " "} Tipo: {" " + usuario.tipoUsuario}
            </li>
          ))
        ) : (
          <CircularProgressFluent />
        )}
      </ul>
      <Link to="cadastrar/empresa">Cadastrar Nova Empresa</Link>
    </div>
  );
}