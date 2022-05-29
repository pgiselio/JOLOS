import { Button } from "../../../../components/button";
import { Container } from "./styles";

export function SettingThemesPage() {
  return (
    <Container>
      <div className="theme-option">
        <div className="title">Padrão(Claro)</div>
          <div className="preview">
            <Button>Aplicar</Button>
          </div>
        
      </div>
      <div className="theme-option">
        <div className="title">Escuro</div>
          <div className="preview">
            <Button>Aplicar</Button>
          </div>
        
      </div>
      <div className="theme-option">
      <div className="title">Azul da meia-noite</div>
          <div className="preview">
            <Button>Aplicar</Button>
          </div>
      </div>
    </Container>
  );
}
