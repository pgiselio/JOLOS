import { CircularProgress } from "react-cssfx-loading/lib";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import { HeaderTitle } from "../../../components/header-title";
import { OutsetHeadersCornerRadius } from "../../../components/outset-radius-to-headers";
import { VagaCard } from "../../../components/vagaCard";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../services/api";
import { vaga } from "./vagaType";

export function VagasList() {
  const navigate = useNavigate();
  const { data, isFetching } = useQuery<vaga[]>(
    "vagas",
    async () => {
      const response = await api.get("/vaga/");
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
    }
  );
  let location = useLocation();
  const auth = useAuth();
  const isAluno = auth.type === "ALUNO";
  return (
    <section>
      <OutsetHeadersCornerRadius>
        <HeaderTitle>
          {isAluno ? <h2>Vagas disponíveis</h2>
          
          : (
            <>
              <h2>Vagas criadas</h2>
              <Button
                className="outlined"
                id="newVaga"
                onClick={() =>
                  navigate("criar", { state: { modalLocation: location } })
                }
                key="create-new-vaga-btn"
              >
                <i className="fas fa-plus"></i>
                Criar nova
              </Button>
            </>
          )}
        </HeaderTitle>
      </OutsetHeadersCornerRadius>
      <div className="content-grid">
        <div className="content">
          <div className="cards-container">
            {data?.map((vaga) => {
              return <VagaCard key={vaga.id} vaga={vaga} />;
            })}
          </div>
          {isFetching && (
            <p
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                paddingTop: "30px",
              }}
            >
              <CircularProgress
                color="var(--accent-color)"
                height="30px"
                width="30px"
                duration="1.5s"
              />
              Carregando...
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
