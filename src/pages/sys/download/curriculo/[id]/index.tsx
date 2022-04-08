import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../../services/api";

export default function DownloadCurriculoPage() {
  const [curriculo, setCurriculo] = useState<any>();
  let params = useParams();
  useEffect(() => {
    async function getCurriculo() {
      const response = await api
        .get(`/usuario/email/${""}`)
        .catch((error) =>
          error.response.status === 401 || error.response.status === 403
            ? (window.location.href = "/logout")
            : error
        );
      setCurriculo(response?.data);
    }
    getCurriculo();
  }, []);
}
