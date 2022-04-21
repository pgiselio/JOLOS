import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";

import Error404 from "../../../404";
import { TabsMenu, TabsMenuItem } from "../../../../components/tabs-menu";
import { vaga } from "../vagaType";
import { useQuery } from "react-query";
import { api } from "../../../../services/api";
import { Skeleton } from "../../../../components/skeleton-load";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { VagaPageStyle } from "./styles";
import { PillItem, PillList } from "../../../../components/pill";
import { Button } from "../../../../components/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { queryClient } from "../../../../services/queryClient";

import { useAuth } from "../../../../hooks/useAuth";

export default function VagaPage() {
  let params = useParams();
  let subscribeBtnRef = useRef<HTMLButtonElement>(null);
  const { data, isFetching } = useQuery<vaga>(
    [`vaga-${params.id}`],
    async () => {
      const response = await api
        .get(`/vaga/lista/${params.id}`)
        .catch((error) => (error.response.status === 400 ? null : error));
      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const {
    handleSubmit,
  } = useForm({
    defaultValues: {
      id: "",
    },
  });
  const auth = useAuth();
  async function inscreverAluno() {
    await api
      .patch(`/vaga/${params.id}/addAluno/${auth.userInfo?.aluno?.id}`)
      .then(() => {
        toast.success("Você se increveu na vaga!", {position: "bottom-center", hideProgressBar: true});
        queryClient.invalidateQueries([`vaga-${params.id}`]);
        queryClient.invalidateQueries("vagas");
      });
  }
  async function desinscreverAluno() {
    await api
      .patch(`/vaga/${params.id}/removeAluno/${auth.userInfo?.aluno?.id}`)
      .then(() => {
        toast.info("Você se desinscreveu da vaga!", {position: "bottom-center", hideProgressBar: true});
        queryClient.invalidateQueries([`vaga-${params.id}`]);
        queryClient.invalidateQueries("vagas");
      });
  }

  let date;
  let dateFormatted;
  const [isCandidatoSubscribed, setIsCandidatoSubscribed] = useState(false);
  useEffect(() => {
    if (auth.userInfo?.id && data?.alunos.includes(auth.userInfo?.id)) {
      setIsCandidatoSubscribed(true) ;
    }else{
      setIsCandidatoSubscribed(false);
    }
    
  }, [auth.userInfo?.id, data?.alunos]);
  if (data) {
    date = new Date(data.dataCriacao);
    dateFormatted = new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
  } else if (!isFetching) {
    return <Error404 />;
  }

  return (
    <>
      {/* <div className="tree-links"></div> */}
      <VagaPageStyle>
        <div className="vaga-page-header-container content">
          <div className="vaga-page-header ">
            <div className="empresa-info">
              {!data && isFetching ? (
                <>
                  <Skeleton variant="circle" width="60px" height="60px" />
                </>
              ) : (
                <>
                  <ProfilePic />
                </>
              )}
            </div>
            {!data && isFetching ? (
              <>
                <Skeleton variant="text" width="300px" height="43px" />
                <Skeleton variant="text" width="150px" height="25px" />
              </>
            ) : (
              <>
                <h2>{data?.titulo}</h2>
                <Link to={`../profile/${data?.empresa?.id}`}>
                  {data?.empresa?.dadosPessoa.nome}
                </Link>
              </>
            )}
            <div className="subscribe">
              <div
                className={
                  "vaga-status " + (data?.status === "ATIVO" ? "enabled" : "")
                }
              >
                {data?.status === "ATIVO" ? "ATIVO" : "INATIVO"}
              </div>
              {auth.userInfo?.aluno?.dadosPessoa && (
                <form
                  action=""
                  onSubmit={handleSubmit(
                    isCandidatoSubscribed ? desinscreverAluno : inscreverAluno
                  )}
                >
                  
                  <Button
                    type="submit"
                    ref={subscribeBtnRef}
                    className={`less-radius ${isCandidatoSubscribed ? "red" : ""}`}
                    {...( (data?.status === "INATIVO" || data?.cursoAlvo.localeCompare(auth.userInfo?.aluno?.curso, undefined, { sensitivity: 'accent' }) ) && {
                      disabled: true,
                      title: (data?.status === "INATIVO") ? "A vaga não aceita novas inscrições" : "Voce não está no curso alvo para esta vaga",
                      onTouchEnd: () => toast.error(subscribeBtnRef.current?.title, {position: "bottom-center", hideProgressBar: true, toastId: "subscribe-btn-disabled"})
                    })}
                  >
                    <span>
                      {isCandidatoSubscribed
                        ? "Desinscrever-se"
                        : "Inscrever-se"}
                    </span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
        <TabsMenu sticky size="medium" isOntop className="tabs">
          <TabsMenuItem to="" title="Detalhes" end />
          <TabsMenuItem
            to="candidatos"
            title="Candidatos"
            highlighted={data ? data?.alunos.length + "" : ""}
          />
        </TabsMenu>
        <div className="content">
          <div className="vaga-page-info">
            <PillList style={{ marginTop: 10 }}>
              <PillItem>
                <i className="fas fa-calendar-day"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="130px" height="25px" />
                ) : (
                  <span>{dateFormatted}</span>
                )}
              </PillItem>
              <PillItem>
                <i className="fas fa-map-marker-alt"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="150px" height="25px" />
                ) : (
                  <span>{data?.localizacao}</span>
                )}
              </PillItem>
              <PillItem>
                <i className="fas fa-book-open"></i>
                {!data && isFetching ? (
                  <Skeleton variant="text" width="150px" height="25px" />
                ) : (
                  <span>{data?.cursoAlvo}</span>
                )}
              </PillItem>
            </PillList>
          </div>
          <div className="vaga-navigation">
            {!data && isFetching ? (
              <Skeleton
                variant="square"
                width="100%"
                height="300px"
                style={{ marginTop: "20px" }}
              />
            ) : (
              <Outlet context={{data}} />
            )}
          </div>
        </div>
      </VagaPageStyle>
    </>
  );
}
type ContextType = {
  data: vaga | null;
}
export function useVaga() {
  return useOutletContext<ContextType>();
}
