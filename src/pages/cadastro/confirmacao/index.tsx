import { Link } from "react-router-dom";
import { CadastroConcluidoStyle } from "./styles";

export default function CadastroConcluidoPage() {
  return (
    <CadastroConcluidoStyle>
      <div className="content">
        <div className="circle">
          <i className="fas fa-check"></i>
        </div>
        <h2>Cadastro concluído</h2>
        <span className="message">
          Agora é só fazer login e começar a usar. Ahh, e não se esqueça de dar
          um "toque" no seu perfil viu? Isso vai te ajudar muito com as
          empresas.
        </span>
        <span className="message">
          <strong>;)</strong>
        </span>
      </div>
      <div className="bottom-actions">
        <div className="flex-btn-next"></div>
        <div className="flex-btn-login">
          <Link
            to="/entrar"
            className="btn-login"
            title="Já tem uma conta? Faça Login!"
          >
            Entrar com sua conta <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </CadastroConcluidoStyle>
  );
}
