import { useLocation } from "react-router-dom";
import { Error404Style } from "./style";

export function Error404() {
  return (
    <Error404Style>
      <div className="container">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <span>:(</span>
      </div>

    </Error404Style>
  );
}
