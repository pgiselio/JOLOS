import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../../../../../components/loadingPage";
import { api } from "../../../../../services/api";

export default function DownloadCurriculoPage() {
  const [curriculo, setCurriculo] = useState<any>();
  let params = useParams();
  useEffect(() => {
    async function getCurriculo() {
      const response = await api
        .get(`/curriculo/download/${params.id}`, { responseType: 'blob'})
        .catch((error) =>
          error.response.status === 401 || error.response.status === 403
            ? (window.location.href = "/logout")
            : error
        );
      setCurriculo(response.data);

    }
    getCurriculo();
  }, []);

  if (!curriculo) {
    return <LoadingPage />;
  }
  const url = URL.createObjectURL(curriculo);
  return (
    <object
      data={url}
      type="application/pdf"
      width="100%"
      height="100%"
    >
    </object>
  );
}
