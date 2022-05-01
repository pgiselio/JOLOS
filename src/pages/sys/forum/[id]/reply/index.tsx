import { useParams } from "react-router-dom";

export default function NewAnswerForm() {
  let params = useParams();

    return(
        <h1>Escrever nova resposta para ID: {params.id}</h1>
    )
}