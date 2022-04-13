import { Link, Outlet, useParams } from "react-router-dom";
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
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import { queryClient } from "../../../../services/queryClient";
import { useEffect, useState } from "react";

export default function VagaPage() {
  let params = useParams();

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
  const user = useUser();
  async function inscreverAluno() {
    await api
      .patch(`/vaga/${params.id}/addAluno/${user.aluno?.id}`)
      .then(() => {
        toast.success("Você se increveu na vaga!", {position: "bottom-center", hideProgressBar: true});
        queryClient.invalidateQueries([`vaga-${params.id}`]);
        queryClient.invalidateQueries("vagas");
      });
  }
  async function desinscreverAluno() {
    await api
      .patch(`/vaga/${params.id}/removeAluno/${user.aluno?.id}`)
      .then(() => {
        toast.info("Você se desincreveu da vaga!", {position: "bottom-center", hideProgressBar: true});
        queryClient.invalidateQueries([`vaga-${params.id}`]);
        queryClient.invalidateQueries("vagas");
      });
  }

  let date;
  let dateFormatted;
  const [isCandidatoSubscribed, setIsCandidatoSubscribed] = useState(false);
  useEffect(() => {
    if (user.id && data?.alunos.includes(user.id)) {
      setIsCandidatoSubscribed(true) ;
    }else{
      setIsCandidatoSubscribed(false);
    }
  }, [user.id, data?.alunos]);
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
              {user.aluno?.dadosPessoa && (
                <form
                  action=""
                  onSubmit={handleSubmit(
                    isCandidatoSubscribed ? desinscreverAluno : inscreverAluno
                  )}
                >
                  <Button
                    type="submit"
                    className={`less-radius ${isCandidatoSubscribed ? "red" : ""}`}
                    {...(data?.status === "INATIVO" && {
                      disabled: true,
                      title: "A vaga não aceita novas inscrições",
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
            highlighted={data && !isFetching ? data?.alunos.length + "" : ""}
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
              <Outlet context={data} />
            )}
          </div>
        </div>
      </VagaPageStyle>
    </>
  );
}
