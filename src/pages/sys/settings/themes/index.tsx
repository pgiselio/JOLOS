import { Button } from "../../../../components/button";
import { useAppOptions } from "../../../../hooks/useAppOptions";
import { Container } from "./styles";

export function SettingThemesPage() {
  const AppOptions = useAppOptions();
  const toggleTheme = (themeName: string) => {
    window.localStorage.setItem("theme", themeName);
    AppOptions.setTheme(themeName);
  };
  return (
    <Container>
      <div className="theme-option">
        <div className="title">Padrão (claro)</div>
        <div className="preview">
          <Button onClick={() => toggleTheme("light")}>Aplicar</Button>
        </div>
      </div>
      <div className="theme-option">
        <div className="title">Azul da meia-noite (escuro)</div>
        <div className="preview">
          <Button onClick={() => toggleTheme("midnightBlue")}>Aplicar</Button>
        </div>
      </div>
      <div className="theme-option">
        <div className="title">Escuro</div>
        <div className="preview">
          <Button onClick={() => toggleTheme("dark")}>Aplicar</Button>
        </div>
      </div>
    </Container>
  );
}
