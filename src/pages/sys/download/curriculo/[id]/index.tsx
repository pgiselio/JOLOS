import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgressFluent from "../../../../../components/circular-progress-fluent";
import { LoadingPage } from "../../../../../components/loadingPage";
import { api } from "../../../../../services/api";

export default function DownloadCurriculoPage() {
  const [curriculo, setCurriculo] = useState<any>();
  const [hasError, setHasError] = useState<any>();
  let params = useParams();
  useEffect(() => {
    const getCurriculo = async () => {
      const response = await api
        .get(`/curriculo/download/${params.id}`, { responseType: "blob" })
        .catch((error) =>
          error.response.status === 401 || error.response.status === 403
            ? (window.location.href = "/logout")
            : (setHasError(error), error)
        );
      setCurriculo(response.data);
    };
    getCurriculo();
  }, []);

  if (!curriculo && !hasError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          gap: "10px"
        }}
      >
        <CircularProgressFluent height={"40px"} width={"40px"} />
        <span>Carregando informações do currículo</span>
      </div>
    );
  }
  if (hasError) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          gap: "10px"
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          gap: "10px"
        }}>
          <i style={{fontSize: 30, color: "var(--text-b)"}} className="fas fa-info-circle"></i>
          <span>Currículo não encontrado</span>
        </div>
        <span style={{fontSize: 13}}>{hasError.message}</span>
        
      </div>
    );
  } else {
    const url = URL.createObjectURL(curriculo);
    return (
      <object
        data={url}
        type="application/pdf"
        width="100%"
        height="100%"
      ></object>
    );
  }
}
