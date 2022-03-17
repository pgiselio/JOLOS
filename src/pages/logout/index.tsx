import CircularProgress from "react-cssfx-loading/lib/CircularProgress";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { Api } from "../../services/api";
import { StyledAccess } from "../../styles/LoginSignupStyle";

export function LogoutPage() {
  const auth = useAuth();

  if (!auth.email) {
    return (
      <Navigate
        to="/entrar"
        replace
      />
    );
  }
  auth.logout();
  Api.post('saida');
  
  return (
    <StyledAccess>
      <div
        className="access-container"
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          color: "#413e4a",
        }}
      >
        <CircularProgress
          color="var(--accent-color)"
          height="60px"
          width="60px"
          duration="1.5s"
        />
        <h2>Saindo...</h2>
      </div>
    </StyledAccess>
  );
}
